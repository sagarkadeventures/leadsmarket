import axios from 'axios';

const LEADSMARKET_API_URL = 'https://api.leadsmarket.com/post/data.aspx';
const CAMPAIGN_ID = '331246';
const CAMPAIGN_KEY = 'b52b889f-0112-4fd0-a679-1bbc6fd5b361';

export async function postToLeadsMarket(leadData, minimumPrice = 80) {
  try {
    const payload = {
      // Required Campaign Info
      campaignid: CAMPAIGN_ID,
      campaignKey: CAMPAIGN_KEY,
      leadtypeid: "19",
      responsetype: "json",
      
      // Pricing & Response
      MinimumPrice: minimumPrice,
      MaxResponseTime: 120,
      ResponseAsync: "0",
      
      // Required Personal Info
      FirstName: leadData.fName,
      LastName: leadData.lName,
      Email: leadData.email,
      PhoneHome: leadData.phone,
      SSN: leadData.ssn,
      DOB: `${leadData.bMonth}/${leadData.bDay}/${leadData.bYear}`,
      
      // Required Address
      Address1: leadData.address1,
      City: leadData.city,
      State: leadData.state,
      ZipCode: leadData.zip,
      MonthsAtAddress: leadData.lengthAtAddress * 12,
      
      // Required Financial
      RequestedAmount: leadData.amount,
      FlexibleAmount: "true",
      MonthlyIncome: leadData.monthlyNetIncome,
      IncomeType: leadData.incomeSource === 'employment' ? 'EMPLOYMENT' : 'BENEFITS',
      
      // Optional Fields (send if available)
      Credit: mapCreditType(leadData.credit_type),
      LoanPurpose: mapLoanPurpose(leadData.loan_reason),
      BestTimeToCall: mapCallTime(leadData.callTime),
      OwnHome: leadData.rentOwn === 'own' ? "true" : "false",
      
      // Tracking
      clientIP: leadData.ip_address || "",
      clientUserAgent: leadData.user_agent || "",
      clientUrl: "https://yourdomain.com",
      SourceSubID: leadData.atrk || "",
      
      // Optional - Leave empty if not collected
      PhoneWork: "",
      EmployerName: "",
      MonthsEmployed: "",
      PayFrequency: "",
      PayDate1: "",
      DirectDeposit: "",
      MonthsAtBank: "",
      BankAccountNumber: "",
      BankName: "",
      BankABA: "",
      BankAccountType: "",
      OwnCar: "",
      ActiveMilitary: "",
      DriversLicense: "",
      DriversLicenseState: "",
      TCPAConsentText: "By submitting this form, I agree to the Terms of Use and Privacy Policy and consent to be contacted by lenders."
    };

    console.log('📤 Posting to LeadsMarket:', payload);

    const response = await axios.post(LEADSMARKET_API_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 130000
    });

    console.log('📥 LeadsMarket Response:', response.data);

    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error('❌ LeadsMarket Error:', error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

function mapCreditType(credit) {
  if (!credit) return "Unsure";
  
  const mapping = {
    'excellent': 'Excellent',
    'good': 'Good',
    'fair': 'Fair',
    'poor': 'Poor',
    'verypoor': 'Verypoor'
  };
  return mapping[credit] || 'Unsure';
}

function mapLoanPurpose(purpose) {
  if (!purpose) return "";
  
  const mapping = {
    'debt_consolidation': 'Debtconsolidation',
    'home_improvement': 'Homeimprovement',
    'auto_repair': 'Car',
    'medical': 'Medical',
    'emergency': 'Emergency',
    'vacation': 'Vacation',
    'business': 'Business',
    'other': 'Other'
  };
  return mapping[purpose] || 'Other';
}

function mapCallTime(time) {
  if (!time) return "Anytime";
  
  const mapping = {
    'anytime': 'Anytime',
    'morning': 'Morning',
    'afternoon': 'Afternoon',
    'evening': 'Evening'
  };
  return mapping[time] || 'Anytime';
}