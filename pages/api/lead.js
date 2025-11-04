// pages/api/lead.js
import connectDB from '../../config/db';
import Lead from '../../models/Lead';
import SoldLead from '../../models/SoldLead';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const formData = req.body;

    // 1. Save lead to database
    const lead = new Lead({
      firstName: formData.fName,
      lastName: formData.lName,
      email: formData.email,
      phone: formData.phone,
      dobMonth: formData.bMonth,
      dobDay: formData.bDay,
      dobYear: formData.bYear,
      address1: formData.address1,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zip,
      monthsAtAddress: formData.lengthAtAddress,
      residenceType: formData.rentOwn === 'own' ? 'Own' : 'Rent',
      requestedAmount: formData.amount,
      ssn: formData.ssn,
      monthlyIncome: formData.monthlyNetIncome,
      incomeType: mapIncomeType(formData.incomeSource),
      employerName: formData.employerName,
      monthsEmployed: formData.monthsEmployed,
      payFrequency: formData.payFrequency,
      nextPayDate: formData.nextPayDate,
      directDeposit: formData.directDeposit,
      bankName: formData.bankName,
      bankABA: formData.bankABA,
      bankAccountNumber: formData.bankAccountNumber,
      bankAccountType: formData.bankAccountType,
      debitCard: formData.debitCard,
      monthsAtBank: formData.monthsAtBank,
      driversLicense: formData.driversLicense,
      driversLicenseState: formData.driversLicenseState,
      bestTimeToCall: formData.callTime,
      loanPurpose: mapLoanPurpose(formData.loan_reason),
      creditRating: mapCreditRating(formData.credit_type),
      ownHome: formData.rentOwn === 'own',
      ownCar: formData.ownCar,
      activeMilitary: formData.activeMilitary,
      clientIP: formData.ip_address,
      clientUserAgent: formData.user_agent,
      trackingId: formData.atrk,
      note: formData.note
    });

    await lead.save();

    // 2. Prepare LeadsMarket API payload
    const leadsMarketPayload = {
      CampaignID: process.env.LEADSMARKET_CAMPAIGN_ID || "331246",
      CampaignKey: process.env.LEADSMARKET_CAMPAIGN_KEY || "b52b889f-0112-4fd0-a679-1bbc6fd5b361",
      LeadtypeId: 19,
      Responsetype: "JSON",
      
      // Personal
      FirstName: formData.fName,
      LastName: formData.lName,
      Email: formData.email,
      PhoneHome: formData.phone, // 10 digits as string
      
      // DOB - MM/DD/YYYY format
      DOB: `${String(formData.bMonth).padStart(2, '0')}/${String(formData.bDay).padStart(2, '0')}/${formData.bYear}`,
      
      // Address
      Address1: formData.address1,
      City: formData.city,
      State: formData.state,
      ZipCode: formData.zip, // 5 digits as string
      MonthsAtAddress: parseInt(formData.lengthAtAddress),
      ResidenceType: formData.rentOwn === 'own' ? 'Own' : 'Rent',
      
      // Financial
      RequestedAmount: parseInt(formData.amount),
      SSN: formData.ssn, // 9 digits as string
      MonthlyIncome: parseInt(formData.monthlyNetIncome),
      IncomeType: mapIncomeTypeAPI(formData.incomeSource), // Fixed mapping
      
      // Employment
      EmployerName: formData.employerName || "Self",
      MonthsEmployed: parseInt(formData.monthsEmployed) || 12,
      PayFrequency: formData.payFrequency || "Biweekly",
      PayDate1: formData.nextPayDate || getNextFriday(),
      DirectDeposit: formData.directDeposit ? "true" : "false",
      
      // Banking
      BankName: formData.bankName || "Bank",
      BankABA: formData.bankABA || "123456789",
      BankAccountNumber: formData.bankAccountNumber || "1234567890",
      BankAccountType: formData.bankAccountType || "Checking",
      DebitCard: formData.debitCard ? "true" : "false",
      MonthsAtBank: parseInt(formData.monthsAtBank) || 12,
      
      // Drivers License
      DriversLicense: formData.driversLicense || "DL123456",
      DriversLicenseState: formData.driversLicenseState || formData.state,
      
      // Additional
      BestTimeToCall: mapCallTimeAPI(formData.callTime),
      LoanPurpose: mapLoanPurposeAPI(formData.loan_reason),
      Credit: mapCreditRatingAPI(formData.credit_type),
      OwnHome: formData.rentOwn === 'own' ? "true" : "false",
      OwnCar: formData.ownCar ? "true" : "false",
      ActiveMilitary: formData.activeMilitary ? "true" : "false",
      AcceptedTerms: "true",
      
      // Tracking
      ClientIP: formData.ip_address || "0.0.0.0",
      ClientUserAgent: formData.user_agent || "Mozilla/5.0",
      ClientURL: process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com",
      
      // Pricing
      MinimumPrice: 0,
      MaxResponseTime: 120
    };

    console.log('📤 Submitting to LeadsMarket...');
    console.log('Payload:', JSON.stringify(leadsMarketPayload, null, 2));
    
    // 3. Submit to LeadsMarket API
    const response = await axios.post(
      'https://api.leadsmarket.com/post/data.aspx',
      leadsMarketPayload,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000 // 120 seconds
      }
    );

    const apiResponse = response.data;
    console.log('✅ LeadsMarket Response:', apiResponse);

    // 4. Parse errors if they exist
    let parsedErrors = [];
    if (apiResponse.Errors) {
      if (Array.isArray(apiResponse.Errors)) {
        parsedErrors = apiResponse.Errors.map(err => ({
          field: err.Field || '',
          value: err.Value || '',
          description: err.Description || ''
        }));
      } else if (apiResponse.Errors.Error) {
        const errors = Array.isArray(apiResponse.Errors.Error) 
          ? apiResponse.Errors.Error 
          : [apiResponse.Errors.Error];
        parsedErrors = errors.map(err => ({
          field: err.Field || '',
          value: err.Value || '',
          description: err.Description || ''
        }));
      }
    }

    // 5. Parse messages if they exist
    let parsedMessages = [];
    if (apiResponse.Messages) {
      if (Array.isArray(apiResponse.Messages)) {
        parsedMessages = apiResponse.Messages;
      } else if (apiResponse.Messages.Message) {
        parsedMessages = Array.isArray(apiResponse.Messages.Message) 
          ? apiResponse.Messages.Message 
          : [apiResponse.Messages.Message];
      }
    }

    // 6. Save LeadsMarket response
    const soldLead = new SoldLead({
      leadId: lead._id,
      result: String(apiResponse.Result), // Convert to string: "1", "2", "4"
      campaignId: apiResponse.CampaignID,
      leadsMarketLeadId: apiResponse.LeadID,
      price: apiResponse.Price ? parseFloat(apiResponse.Price) : 0,
      redirectUrl: apiResponse.RedirectURL,
      errors: parsedErrors,
      messages: parsedMessages,
      rawResponse: apiResponse
    });

    await soldLead.save();
    console.log('✅ Saved to SoldLead collection');

    // 7. Return appropriate response based on result
    const result = String(apiResponse.Result);
    
    // Result = "1" or "Accepted" = Success
    if (result === '1' || result.toLowerCase() === 'accepted') {
      return res.status(200).json({
        status: 'sold',
        redirect_url: apiResponse.RedirectURL,
        price: apiResponse.Price,
        leadId: apiResponse.LeadID,
        message: 'Lead accepted successfully'
      });
    }
    
    // Result = "2" or "Rejected" = Rejected
    if (result === '2' || result.toLowerCase() === 'rejected') {
      return res.status(200).json({
        status: 'rejected',
        messages: parsedMessages,
        message: 'Unable to match with a lender at this time'
      });
    }
    
    // Result = "Duplicate"
    if (result.toLowerCase() === 'duplicate') {
      return res.status(200).json({
        status: 'duplicate',
        messages: parsedMessages,
        message: 'Duplicate lead detected'
      });
    }
    
    // Result = "4" or "Errors" = Validation errors
    if (result === '4' || result.toLowerCase() === 'errors' || parsedErrors.length > 0) {
      return res.status(400).json({
        status: 'validation_error',
        errors: parsedErrors,
        messages: parsedMessages,
        message: 'Please correct the highlighted fields'
      });
    }

    // Unknown result
    return res.status(500).json({
      status: 'error',
      message: 'Unexpected response from LeadsMarket',
      result: apiResponse.Result
    });

  } catch (error) {
    console.error('❌ API Error:', error);
    
    // Handle axios errors
    if (error.response) {
      return res.status(500).json({
        status: 'error',
        message: 'LeadsMarket API error',
        details: error.response.data
      });
    }
    
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
}

// ===================================
// FIXED Helper Functions for API
// ===================================

// Income Type - Only "Employment" or "Benefits" per API doc
function mapIncomeTypeAPI(type) {
  const mapping = {
    'employment': 'Employment',
    'selfemployment': 'Employment', // Map to Employment, not SelfEmployment
    'benefits': 'Benefits',
    'unemployed': 'Benefits'
  };
  return mapping[type] || 'Employment';
}

// Call Time - Exact case matching
function mapCallTimeAPI(time) {
  const mapping = {
    'anytime': 'Anytime',
    'morning': 'Morning',
    'afternoon': 'Afternoon',
    'evening': 'Evening'
  };
  return mapping[time] || 'Anytime';
}

// Loan Purpose - Exact values from API doc (no spaces, proper case)
function mapLoanPurposeAPI(purpose) {
  const mapping = {
    'debt_consolidation': 'Debtconsolidation',
    'credit_card': 'Creditcard',
    'home_improvement': 'Homeimprovement',
    'student_loan': 'Studentloanconsolidation',
    'major_purchase': 'Majorpurchase',
    'auto_repair': 'Car',
    'car': 'Car',
    'green_loan': 'Greenloan',
    'business': 'Business',
    'vacation': 'Vacation',
    'wedding': 'Wedding',
    'relocation': 'Relocation',
    'medical': 'Medical',
    'household': 'Household',
    'emergency': 'Other',
    'other': 'Other'
  };
  return mapping[purpose] || 'Other';
}

// Credit Rating - Exact values from API doc
function mapCreditRatingAPI(rating) {
  const mapping = {
    'excellent': 'Excellent',
    'verygood': 'Verygood',
    'good': 'Good',
    'fair': 'Fair',
    'poor': 'Poor',
    'verypoor': 'Verypoor'
  };
  return mapping[rating] || 'Unsure';
}

// Helper functions for database (more readable)
function mapIncomeType(type) {
  const mapping = {
    'employment': 'Employment',
    'selfemployment': 'Self-Employment',
    'benefits': 'Benefits',
    'unemployed': 'Unemployed'
  };
  return mapping[type] || 'Employment';
}

function mapCallTime(time) {
  const mapping = {
    'anytime': 'Anytime',
    'morning': 'Morning',
    'afternoon': 'Afternoon',
    'evening': 'Evening'
  };
  return mapping[time] || 'Anytime';
}

function mapLoanPurpose(purpose) {
  const mapping = {
    'debt_consolidation': 'Debt Consolidation',
    'home_improvement': 'Home Improvement',
    'auto_repair': 'Auto Repair',
    'medical': 'Medical',
    'emergency': 'Emergency',
    'vacation': 'Vacation',
    'business': 'Business',
    'other': 'Other'
  };
  return mapping[purpose] || 'Other';
}

function mapCreditRating(rating) {
  const mapping = {
    'excellent': 'Excellent',
    'good': 'Good',
    'fair': 'Fair',
    'poor': 'Poor',
    'verypoor': 'Very Poor'
  };
  return mapping[rating] || 'Unsure';
}

function getNextFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  
  return `${String(nextFriday.getMonth() + 1).padStart(2, '0')}/${String(nextFriday.getDate()).padStart(2, '0')}/${nextFriday.getFullYear()}`;
}