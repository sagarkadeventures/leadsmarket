module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/config/db.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead_system';
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectDB;
}),
"[project]/models/Lead.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// models/Lead.js
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const leadSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    // Date of Birth
    dobMonth: {
        type: Number,
        required: true
    },
    dobDay: {
        type: Number,
        required: true
    },
    dobYear: {
        type: Number,
        required: true
    },
    // Address
    address1: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    monthsAtAddress: {
        type: Number,
        required: true
    },
    residenceType: {
        type: String,
        required: true
    },
    // Financial
    requestedAmount: {
        type: Number,
        required: true
    },
    ssn: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    incomeType: {
        type: String,
        required: true
    },
    // Employment
    employerName: String,
    monthsEmployed: Number,
    payFrequency: String,
    nextPayDate: Date,
    directDeposit: Boolean,
    // Banking
    bankName: String,
    bankABA: String,
    bankAccountNumber: String,
    bankAccountType: String,
    debitCard: Boolean,
    monthsAtBank: Number,
    // Drivers License
    driversLicense: String,
    driversLicenseState: String,
    // Additional
    bestTimeToCall: String,
    loanPurpose: String,
    creditRating: String,
    ownHome: Boolean,
    ownCar: Boolean,
    activeMilitary: Boolean,
    // Tracking
    clientIP: String,
    clientUserAgent: String,
    trackingId: String,
    note: String,
    // Klaviyo Integration
    klaviyo_status: {
        type: Number,
        default: 0
    },
    // Metadata
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Lead || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Lead', leadSchema);
}),
"[project]/models/SoldLead.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// models/SoldLead.js
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const soldLeadSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    leadId: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
    },
    // LeadsMarket Response - Result can be "1", "2", "4" or string values
    result: {
        type: String,
        required: true
    },
    campaignId: String,
    leadsMarketLeadId: String,
    price: Number,
    redirectUrl: String,
    // Error details (if any)
    errors: [
        {
            field: String,
            value: String,
            description: String
        }
    ],
    messages: [
        String
    ],
    // Raw response
    rawResponse: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.Mixed,
    // Metadata
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.SoldLead || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('SoldLead', soldLeadSchema);
}),
"[externals]/axios [external] (axios, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("axios");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/pages/api/lead.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/api/lead.js
__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/db.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Lead$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Lead.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$SoldLead$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/SoldLead.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/axios [external] (axios, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$db$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"])();
        const formData = req.body;
        // 1. Save lead to database
        const lead = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Lead$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"]({
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
            PhoneHome: formData.phone,
            // DOB - MM/DD/YYYY format
            DOB: `${String(formData.bMonth).padStart(2, '0')}/${String(formData.bDay).padStart(2, '0')}/${formData.bYear}`,
            // Address
            Address1: formData.address1,
            City: formData.city,
            State: formData.state,
            ZipCode: formData.zip,
            MonthsAtAddress: parseInt(formData.lengthAtAddress),
            ResidenceType: formData.rentOwn === 'own' ? 'Own' : 'Rent',
            // Financial
            RequestedAmount: parseInt(formData.amount),
            SSN: formData.ssn,
            MonthlyIncome: parseInt(formData.monthlyNetIncome),
            IncomeType: mapIncomeTypeAPI(formData.incomeSource),
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
        const response = await __TURBOPACK__imported__module__$5b$externals$5d2f$axios__$5b$external$5d$__$28$axios$2c$__esm_import$29$__["default"].post('https://api.leadsmarket.com/post/data.aspx', leadsMarketPayload, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 120000 // 120 seconds
        });
        const apiResponse = response.data;
        console.log('✅ LeadsMarket Response:', apiResponse);
        // 4. Parse errors if they exist
        let parsedErrors = [];
        if (apiResponse.Errors) {
            if (Array.isArray(apiResponse.Errors)) {
                parsedErrors = apiResponse.Errors.map((err)=>({
                        field: err.Field || '',
                        value: err.Value || '',
                        description: err.Description || ''
                    }));
            } else if (apiResponse.Errors.Error) {
                const errors = Array.isArray(apiResponse.Errors.Error) ? apiResponse.Errors.Error : [
                    apiResponse.Errors.Error
                ];
                parsedErrors = errors.map((err)=>({
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
                parsedMessages = Array.isArray(apiResponse.Messages.Message) ? apiResponse.Messages.Message : [
                    apiResponse.Messages.Message
                ];
            }
        }
        // 6. Save LeadsMarket response
        const soldLead = new __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$SoldLead$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"]({
            leadId: lead._id,
            result: String(apiResponse.Result),
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
        'selfemployment': 'Employment',
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
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__306dc3bc._.js.map