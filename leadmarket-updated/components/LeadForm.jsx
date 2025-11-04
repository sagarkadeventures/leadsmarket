// components/EnhancedLeadForm.jsx
import { useState, useEffect } from "react";
import {
  US_STATES,
  MONTHS,
  generateDays,
  generateYears,
  formatPhoneNumber,
  formatSSN,
  formatZipCode,
  formatCurrency,
  getUserIP,
  generateTrackingId,
  isValidEmail,
  isValidPhone,
  isValidSSN,
  isValidZip,
  isValidAge,
} from "../utils/formHelpers";
import { TextInput, SelectInput, RadioGroup } from "./FormInput";
import { ProcessingOverlay } from "./LoadingStates";
import { Confetti, Fireworks, SuccessCard } from "./SuccessAnimations";

function EnhancedLeadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fName: "",
    lName: "",
    email: "",
    phone: "",

    // Date of Birth
    bMonth: "",
    bDay: "",
    bYear: "",

    // Address Information
    address1: "",
    city: "",
    state: "",
    zip: "",
    lengthAtAddress: "",
    rentOwn: "",

    // Financial Information
    amount: "",
    ssn: "",
    incomeSource: "",
    monthlyNetIncome: "",

    // Employment Information (NEW)
    employerName: "",
    monthsEmployed: "",
    payFrequency: "",
    nextPayDate: "",
    directDeposit: "",

    // Banking Information (NEW)
    bankName: "",
    bankABA: "",
    bankAccountNumber: "",
    bankAccountType: "",
    debitCard: "",
    monthsAtBank: "",

    // Drivers License (NEW)
    driversLicense: "",
    driversLicenseState: "",

    // Additional Information
    callTime: "",
    loan_reason: "",
    credit_type: "",
    ownCar: "", // Must be filled
    activeMilitary: "", // Must be filled

    // Tracking
    note: "",
    atrk: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const trackingId = generateTrackingId();
    setFormData((prev) => ({
      ...prev,
      atrk: trackingId,
      note: "web-form-v2-leadsmarket",
    }));
  }, []);

  const calculateProgress = () => {
    const totalSteps = 5; // Increased to 5 steps
    return Math.round((currentStep / totalSteps) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    switch (name) {
      case "phone":
        formattedValue = formatPhoneNumber(value);
        break;
      case "ssn":
        formattedValue = formatSSN(value);
        break;
      case "zip":
        formattedValue = formatZipCode(value);
        break;
      case "amount":
      case "monthlyNetIncome":
        formattedValue = formatCurrency(value);
        break;
      case "bankABA":
        formattedValue = value.replace(/\D/g, "").slice(0, 9);
        break;
      case "bankAccountNumber":
        formattedValue = value.replace(/\D/g, "").slice(0, 17);
        break;
      case "fName":
      case "lName":
      case "city":
      case "employerName":
      case "bankName":
        formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
        break;
      default:
        formattedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Personal Information
      if (!formData.fName?.trim()) newErrors.fName = "First name is required";
      if (!formData.lName?.trim()) newErrors.lName = "Last name is required";
      if (!formData.email?.trim()) {
        newErrors.email = "Email is required";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone?.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = "Invalid phone number. Please use a real US number (not 555-xxxx test numbers)";
      }

      if (!formData.bMonth) newErrors.bMonth = "Month required";
      if (!formData.bDay) newErrors.bDay = "Day required";
      if (!formData.bYear) newErrors.bYear = "Year required";

      if (formData.bMonth && formData.bDay && formData.bYear) {
        if (!isValidAge(formData.bMonth, formData.bDay, formData.bYear)) {
          newErrors.bYear = "Must be 18 years or older";
        }
      }
    }

    if (step === 2) {
      // Address Information
      if (!formData.address1?.trim()) newErrors.address1 = "Address is required";
      if (!formData.city?.trim()) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zip) {
        newErrors.zip = "ZIP code is required";
      } else if (!isValidZip(formData.zip)) {
        newErrors.zip = "Invalid US ZIP code";
      }
      if (!formData.lengthAtAddress) newErrors.lengthAtAddress = "Required";
      if (!formData.rentOwn) newErrors.rentOwn = "Required";
    }

    if (step === 3) {
      // Financial & Employment
      if (!formData.amount) {
        newErrors.amount = "Loan amount is required";
      } else {
        const amt = parseInt(formData.amount.replace(/,/g, ""));
        if (isNaN(amt) || amt < 100 || amt > 50000) {
          newErrors.amount = "Amount must be between $100 - $50,000";
        }
      }

      if (!formData.ssn) {
        newErrors.ssn = "SSN is required";
      } else if (!isValidSSN(formData.ssn)) {
        newErrors.ssn = "Invalid SSN format";
      }

      if (!formData.incomeSource) newErrors.incomeSource = "Income source required";

      if (!formData.monthlyNetIncome) {
        newErrors.monthlyNetIncome = "Monthly income required";
      } else {
        const income = parseInt(formData.monthlyNetIncome.replace(/,/g, ""));
        if (isNaN(income) || income < 750) {
          newErrors.monthlyNetIncome = "Minimum income is $750/month";
        }
      }

      // Employment validation
      if (formData.incomeSource === 'employment' || formData.incomeSource === 'selfemployment') {
        if (!formData.employerName?.trim()) newErrors.employerName = "Employer name required";
        if (!formData.monthsEmployed) newErrors.monthsEmployed = "Required";
        if (!formData.payFrequency) newErrors.payFrequency = "Required";
        if (!formData.nextPayDate) newErrors.nextPayDate = "Required";
      }
      
      if (!formData.directDeposit) newErrors.directDeposit = "Required";
    }

    if (step === 4) {
      // Banking Information
      if (!formData.bankName?.trim()) newErrors.bankName = "Bank name required";
      if (!formData.bankABA) {
        newErrors.bankABA = "Routing number required";
      } else if (formData.bankABA.length !== 9) {
        newErrors.bankABA = "Routing number must be 9 digits";
      }
      if (!formData.bankAccountNumber) {
        newErrors.bankAccountNumber = "Account number required";
      } else if (formData.bankAccountNumber.length < 4) {
        newErrors.bankAccountNumber = "Account number must be at least 4 digits";
      }
      if (!formData.bankAccountType) newErrors.bankAccountType = "Account type required";
      if (!formData.debitCard) newErrors.debitCard = "Required";
      if (!formData.monthsAtBank) newErrors.monthsAtBank = "Required";

      // Drivers License
      if (!formData.driversLicense?.trim()) newErrors.driversLicense = "License number required";
      if (!formData.driversLicenseState) newErrors.driversLicenseState = "License state required";
    }

    if (step === 5) {
      // Additional Information
      if (!formData.callTime) {
        newErrors.callTime = "Call time preference required";
      }
      if (!formData.ownCar) {
        newErrors.ownCar = "Please select if you own a car";
      }
      if (!formData.activeMilitary) {
        newErrors.activeMilitary = "Please select military status";
      }
    }

    console.log("Validation for step", step, "errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setTimeout(() => {
        const firstError = document.querySelector(".border-red-500");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(5)) {
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      const ipAddress = await getUserIP();
      const userAgent = navigator.userAgent;

      const submitData = {
        fName: formData.fName,
        lName: formData.lName,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ""),
        bMonth: parseInt(formData.bMonth),
        bDay: parseInt(formData.bDay),
        bYear: parseInt(formData.bYear),
        address1: formData.address1,
        city: formData.city,
        state: formData.state,
        zip: formData.zip.replace(/\D/g, ""),
        lengthAtAddress: parseInt(formData.lengthAtAddress),
        rentOwn: formData.rentOwn,
        amount: parseInt(formData.amount.replace(/,/g, "")),
        ssn: formData.ssn.replace(/\D/g, ""),
        incomeSource: formData.incomeSource,
        monthlyNetIncome: parseInt(formData.monthlyNetIncome.replace(/,/g, "")),
        employerName: formData.employerName,
        monthsEmployed: parseInt(formData.monthsEmployed) || 0,
        payFrequency: formData.payFrequency,
        nextPayDate: formData.nextPayDate,
        directDeposit: formData.directDeposit === 'yes',
        bankName: formData.bankName,
        bankABA: formData.bankABA,
        bankAccountNumber: formData.bankAccountNumber,
        bankAccountType: formData.bankAccountType,
        debitCard: formData.debitCard === 'yes',
        monthsAtBank: parseInt(formData.monthsAtBank),
        driversLicense: formData.driversLicense,
        driversLicenseState: formData.driversLicenseState,
        callTime: formData.callTime,
        loan_reason: formData.loan_reason,
        credit_type: formData.credit_type,
        ownCar: formData.ownCar === 'yes',
        activeMilitary: formData.activeMilitary === 'yes',
        note: formData.note,
        atrk: formData.atrk,
        ip_address: ipAddress,
        user_agent: userAgent,
      };

      const response = await fetch('/api/lead', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.status === 'validation_error' || result.status === 'error') {
        if (result.errors && Array.isArray(result.errors)) {
          const newErrors = {};
          result.errors.forEach(err => {
            if (err.Field === 'PhoneHome' || err.Field === 'phone') {
              newErrors.phone = err.Description || 'Invalid US phone number';
            } else if (err.Field === 'ZipCode' || err.Field === 'zip') {
              newErrors.zip = err.Description || 'Invalid US ZIP code';
            } else if (err.Field === 'SSN' || err.Field === 'ssn') {
              newErrors.ssn = err.Description || 'Invalid SSN';
            } else {
              const fieldName = err.Field.toLowerCase();
              newErrors[fieldName] = err.Description;
            }
          });
          
          setErrors(newErrors);
          setLoading(false);
          
          setTimeout(() => {
            const firstError = document.querySelector(".border-red-500");
            if (firstError) {
              firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }, 100);
          
          return;
        }
        
        setSubmitStatus("error");
        setLoading(false);
        return;
      }

      if (result.status === "sold") {
        setSubmitStatus("success");
        setRedirectUrl(result.redirect_url);

        if (result.redirect_url) {
          setTimeout(() => {
            window.location.href = result.redirect_url;
          }, 3000);
        }
      } else if (result.status === "rejected") {
        setSubmitStatus("rejected");
      } else if (result.status === "duplicate") {
        setSubmitStatus("duplicate");
      } else {
        setSubmitStatus("error");
      }

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Render loading/status states (same as before)
  if (loading) {
    return (
      <ProcessingOverlay
        message="Processing Your Application"
        steps={[
          { label: "Validating information", status: "completed" },
          { label: "Matching with lenders", status: "active" },
          { label: "Finalizing", status: "pending" },
        ]}
      />
    );
  }

  if (submitStatus === "success") {
    return (
      <>
        <Confetti active={true} duration={6000} />
        <Fireworks active={true} duration={4000} />
        <div className="min-h-screen flex items-center justify-center p-4">
          <SuccessCard
            title="Congratulations! 🎉"
            message="Your application has been successfully matched with a lender!"
            redirectUrl={redirectUrl}
            countdown={3}
          />
        </div>
      </>
    );
  }

  if (submitStatus === "rejected") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center animate-scaleIn">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Match Found</h2>
        <p className="text-gray-600 mb-6">Unfortunately, we couldn't match you with a lender at this time.</p>
        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Try Again
        </button>
      </div>
    );
  }

  if (submitStatus === "duplicate") {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center animate-scaleIn">
        <div className="mb-6">
          <svg className="mx-auto h-16 w-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Duplicate Application</h2>
        <p className="text-gray-600 mb-6">We've already processed your application. Please check your email for the status.</p>
        <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Go Back
        </button>
      </div>
    );
  }

  if (submitStatus === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center animate-shake">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">There was an error processing your application. Please try again.</p>
          <button onClick={() => setSubmitStatus(null)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto min-h-screen py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-1xl md:text-2xl  font-bold text-gray-900">APPLY FOR A LOAN</h2>
          <span className="text-sm font-medium text-gray-600">Step {currentStep} of 5</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-4 text-xs">
          <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-400"}>Personal</span>
          <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-400"}>Address</span>
          <span className={currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-400"}>Financial</span>
          <span className={currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-400"}>Banking</span>
          <span className={currentStep >= 5 ? "text-blue-600 font-medium" : "text-gray-400"}>Final</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: PERSONAL INFORMATION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput label="First Name" name="fName" value={formData.fName} onChange={handleChange} error={errors.fName} placeholder="John" required maxLength={50} />
              <TextInput label="Last Name" name="lName" value={formData.lName} onChange={handleChange} error={errors.lName} placeholder="Doe" required maxLength={50} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john.doe@example.com" required />
              <TextInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                placeholder="(212) 456-7890"
                required
                maxLength={14}
              />
            </div>

            <div>
             <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              Date of Birth 
              <span className="text-red-500 ml-1">*</span>
            </label>
              {/* <p className="text-xs text-gray-500 mb-3">You must be 18 years or older to apply</p> */}
              <div className="grid grid-cols-3 gap-4">
                <SelectInput label="" name="bMonth" value={formData.bMonth} onChange={handleChange} error={errors.bMonth} options={MONTHS} required hideAsterisk={true}/>
                <SelectInput label="" name="bDay" value={formData.bDay} onChange={handleChange} error={errors.bDay} options={generateDays()} required hideAsterisk={true} />
                <SelectInput label="" name="bYear" value={formData.bYear} onChange={handleChange} error={errors.bYear} options={generateYears()} required hideAsterisk={true}/>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: ADDRESS INFORMATION */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Address Information</h3>

            <TextInput label="Street Address" name="address1" value={formData.address1} onChange={handleChange} error={errors.address1} placeholder="123 Main Street" required maxLength={100} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TextInput label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} placeholder="New York" required maxLength={80} />
              <SelectInput label="State" name="state" value={formData.state} onChange={handleChange} error={errors.state} options={US_STATES} required />
              <TextInput label="ZIP Code" name="zip" type="tel" value={formData.zip} onChange={handleChange} error={errors.zip} placeholder="12345" required maxLength={5} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Years at Current Address"
                name="lengthAtAddress"
                value={formData.lengthAtAddress}
                onChange={handleChange}
                error={errors.lengthAtAddress}
                options={[
                  { value: "", label: "Select years" },
                  { value: "0", label: "Less than 1 year" },
                  { value: "1", label: "1 year" },
                  { value: "2", label: "2 years" },
                  { value: "3", label: "3 years" },
                  { value: "4", label: "4 years" },
                  { value: "5", label: "5 years" },
                  { value: "6", label: "6 years" },
                  { value: "7", label: "7 years" },
                  { value: "8", label: "8 years" },
                  { value: "9", label: "9 years" },
                  { value: "10", label: "10+ years" },
                ]}
                required
              />
              <RadioGroup
                label="Do you Rent or Own?"
                name="rentOwn"
                value={formData.rentOwn}
                onChange={handleChange}
                error={errors.rentOwn}
                options={[
                  { value: "rent", label: "Rent" },
                  { value: "own", label: "Own" },
                ]}
                required
              />
            </div>
          </div>
        )}

        {/* STEP 3: FINANCIAL & EMPLOYMENT */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Financial & Employment Information</h3>

            <div>
              <TextInput label="Requested Loan Amount" name="amount" type="tel" value={formData.amount} onChange={handleChange} error={errors.amount} placeholder="1,000" required />
              <p className="mt-2 text-xs text-gray-500">Amount must be between $100 and $50,000</p>
            </div>

            <div>
              <TextInput label="Social Security Number" name="ssn" type="tel" value={formData.ssn} onChange={handleChange} error={errors.ssn} placeholder="123-45-6789" required maxLength={11} />
              <p className="mt-2 text-xs text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your SSN is encrypted and secure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Income Source"
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleChange}
                error={errors.incomeSource}
                options={[
                  { value: "", label: "Select income source" },
                  { value: "employment", label: "Employment" },
                  { value: "selfemployment", label: "Self-Employment" },
                  { value: "benefits", label: "Benefits/Social Security" },
                ]}
                required
              />
              <TextInput label="Monthly Net Income" name="monthlyNetIncome" type="tel" value={formData.monthlyNetIncome} onChange={handleChange} error={errors.monthlyNetIncome} placeholder="2,500" required />
            </div>

            {/* Employment fields - show only if employed */}
            {(formData.incomeSource === 'employment' || formData.incomeSource === 'selfemployment') && (
              <>
                <TextInput label="Employer Name" name="employerName" value={formData.employerName} onChange={handleChange} error={errors.employerName} placeholder="ABC Company" required maxLength={50} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    label="Months Employed"
                    name="monthsEmployed"
                    value={formData.monthsEmployed}
                    onChange={handleChange}
                    error={errors.monthsEmployed}
                    options={[
                      { value: "", label: "Select months" },
                      { value: "1", label: "1-3 months" },
                      { value: "6", label: "4-6 months" },
                      { value: "12", label: "7-12 months" },
                      { value: "24", label: "1-2 years" },
                      { value: "36", label: "2-3 years" },
                      { value: "60", label: "3-5 years" },
                      { value: "120", label: "5+ years" },
                    ]}
                    required
                  />

                  <SelectInput
                    label="Pay Frequency"
                    name="payFrequency"
                    value={formData.payFrequency}
                    onChange={handleChange}
                    error={errors.payFrequency}
                    options={[
                      { value: "", label: "Select frequency" },
                      { value: "Weekly", label: "Weekly" },
                      { value: "Biweekly", label: "Bi-weekly (Every 2 weeks)" },
                      { value: "Twicemonthly", label: "Twice Monthly (1st & 15th)" },
                      { value: "Monthly", label: "Monthly" },
                    ]}
                    required
                  />
                </div>

                <TextInput label="Next Pay Date" name="nextPayDate" type="date" value={formData.nextPayDate} onChange={handleChange} error={errors.nextPayDate} required />
              </>
            )}

            <RadioGroup
              label="Direct Deposit"
              name="directDeposit"
              value={formData.directDeposit}
              onChange={handleChange}
              error={errors.directDeposit}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />
          </div>
        )}

        {/* STEP 4: BANKING & DRIVERS LICENSE */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Banking & Identity Information</h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Why do we need this?</strong> Banking information is required to transfer funds and verify your identity.
              </p>
            </div>

            <TextInput label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} error={errors.bankName} placeholder="Bank of America" required maxLength={50} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TextInput label="Bank Routing Number (ABA)" name="bankABA" type="tel" value={formData.bankABA} onChange={handleChange} error={errors.bankABA} placeholder="123456789" required maxLength={9} />
                <p className="mt-1 text-xs text-gray-500">9-digit routing number on your check</p>
              </div>

              <div>
                <TextInput label="Account Number" name="bankAccountNumber" type="tel" value={formData.bankAccountNumber} onChange={handleChange} error={errors.bankAccountNumber} placeholder="1234567890" required />
                <p className="mt-1 text-xs text-gray-500">Account number on your check</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Account Type"
                name="bankAccountType"
                value={formData.bankAccountType}
                onChange={handleChange}
                error={errors.bankAccountType}
                options={[
                  { value: "", label: "Select type" },
                  { value: "Checking", label: "Checking" },
                  { value: "Savings", label: "Savings" },
                ]}
                required
              />

              <SelectInput
                label="Months at Bank"
                name="monthsAtBank"
                value={formData.monthsAtBank}
                onChange={handleChange}
                error={errors.monthsAtBank}
                options={[
                  { value: "", label: "Select months" },
                  { value: "1", label: "Less than 3 months" },
                  { value: "6", label: "3-6 months" },
                  { value: "12", label: "6-12 months" },
                  { value: "24", label: "1-2 years" },
                  { value: "36", label: "2+ years" },
                ]}
                required
              />
            </div>

            <RadioGroup
              label="Do you have a Debit Card?"
              name="debitCard"
              value={formData.debitCard}
              onChange={handleChange}
              error={errors.debitCard}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />

            <div className="border-t pt-6 mt-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Driver's License Information</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput label="Driver's License Number" name="driversLicense" value={formData.driversLicense} onChange={handleChange} error={errors.driversLicense} placeholder="D1234567" required maxLength={20} />

                <SelectInput label="License State" name="driversLicenseState" value={formData.driversLicenseState} onChange={handleChange} error={errors.driversLicenseState} options={US_STATES} required />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: ADDITIONAL INFORMATION */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Additional Information</h3>

            <RadioGroup
              label="Best Time to Call"
              name="callTime"
              value={formData.callTime}
              onChange={handleChange}
              error={errors.callTime}
              options={[
                { value: "anytime", label: "Anytime" },
                { value: "morning", label: "Morning (8am-12pm)" },
                { value: "afternoon", label: "Afternoon (12pm-5pm)" },
                { value: "evening", label: "Evening (5pm-9pm)" },
              ]}
              required
            />

            <SelectInput
              label="Reason for Loan (Optional)"
              name="loan_reason"
              value={formData.loan_reason}
              onChange={handleChange}
              options={[
                { value: "", label: "Select reason" },
                { value: "debt_consolidation", label: "Debt Consolidation" },
                { value: "credit_card", label: "Credit Card" },
                { value: "home_improvement", label: "Home Improvement" },
                { value: "student_loan", label: "Student Loan Consolidation" },
                { value: "major_purchase", label: "Major Purchase" },
                { value: "auto_repair", label: "Car/Auto Repair" },
                { value: "green_loan", label: "Green Loan" },
                { value: "business", label: "Business" },
                { value: "vacation", label: "Vacation" },
                { value: "wedding", label: "Wedding" },
                { value: "relocation", label: "Relocation" },
                { value: "medical", label: "Medical Expenses" },
                { value: "household", label: "Household Expenses" },
                { value: "emergency", label: "Emergency" },
                { value: "other", label: "Other" },
              ]}
            />

            <SelectInput
              label="Credit Rating (Optional)"
              name="credit_type"
              value={formData.credit_type}
              onChange={handleChange}
              options={[
                { value: "", label: "Select credit rating" },
                { value: "excellent", label: "Excellent (720+)" },
                { value: "verygood", label: "Very Good (690-719)" },
                { value: "good", label: "Good (660-689)" },
                { value: "fair", label: "Fair (620-659)" },
                { value: "poor", label: "Poor (580-619)" },
                { value: "verypoor", label: "Very Poor (below 580)" },
              ]}
            />

            <RadioGroup
              label="Do you own a car?"
              name="ownCar"
              value={formData.ownCar}
              onChange={handleChange}
              error={errors.ownCar}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />

            <RadioGroup
              label="Are you active military?"
              name="activeMilitary"
              value={formData.activeMilitary}
              onChange={handleChange}
              error={errors.activeMilitary}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              required
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>Almost done!</strong> By clicking Submit, you agree to our terms and authorize lenders to contact you regarding your loan request.
              </p>
            </div>
          </div>
        )}  

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-2 pt-4">
          {currentStep > 1 ? (
            <button type="button" onClick={handleBack} className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer">
              ← Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 5 ? (
            <button 
              type="button" 
              onClick={handleNext} 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Next →
            </button>
          ) : (
            <button 
              type="submit" 
              disabled={loading} 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer disabled:hover:bg-gray-400 text-sm md:text-base"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 text-center">
          🔒 Your information is encrypted and secure. By submitting this form, you consent to be contacted by lenders regarding your loan request and agree to our terms of service.
        </p>
      </div>
    </div>
    </div>
  );
}

export default EnhancedLeadForm;