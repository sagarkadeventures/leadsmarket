module.exports = [
"[project]/utils/validators.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// USA Phone validation
// USA Phone validation - Enhanced to match LeadsMarket requirements
__turbopack_context__.s([
    "isValidSSN",
    ()=>isValidSSN,
    "isValidUSPhone",
    ()=>isValidUSPhone,
    "isValidUSZip",
    ()=>isValidUSZip
]);
function isValidUSPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
        return false;
    }
    const areaCode = cleaned.substring(0, 3);
    const exchange = cleaned.substring(3, 6);
    const lineNumber = cleaned.substring(6, 10);
    // Area code (NPA) validation
    // - Cannot start with 0 or 1
    // - Cannot be N11 (like 211, 311, 411, 511, 611, 711, 811, 911)
    if (areaCode[0] === '0' || areaCode[0] === '1') {
        return false;
    }
    if (areaCode[1] === '1' && areaCode[2] === '1') {
        return false;
    }
    // Exchange (NXX) validation
    // - Cannot start with 0 or 1
    // - Cannot be 555 (reserved for directory assistance and fictional use)
    if (exchange[0] === '0' || exchange[0] === '1') {
        return false;
    }
    if (exchange === '555') {
        return false;
    }
    // Block common test/invalid patterns
    const invalidPatterns = [
        /^(\d)\1{9}$/,
        /^1234567890$/,
        /^0000000000$/,
        /^0{10}$/
    ];
    for (const pattern of invalidPatterns){
        if (pattern.test(cleaned)) {
            return false;
        }
    }
    return true;
}
function isValidUSZip(zip) {
    const cleaned = zip.replace(/\D/g, '');
    if (cleaned.length !== 5) {
        return false;
    }
    const zipNum = parseInt(cleaned, 10);
    // Invalid patterns
    if (zipNum === 0 || zipNum === 99999) {
        return false;
    }
    // Define valid ZIP code ranges by state prefix
    const validRanges = [
        // Northeast
        {
            min: 501,
            max: 544
        },
        {
            min: 6001,
            max: 6928
        },
        {
            min: 7001,
            max: 8989
        },
        {
            min: 10001,
            max: 14975
        },
        {
            min: 15001,
            max: 19640
        },
        // Southeast
        {
            min: 20001,
            max: 20599
        },
        {
            min: 20601,
            max: 21930
        },
        {
            min: 22001,
            max: 24658
        },
        {
            min: 25001,
            max: 26886
        },
        {
            min: 27006,
            max: 28909
        },
        {
            min: 29001,
            max: 29948
        },
        {
            min: 30002,
            max: 31999
        },
        {
            min: 32004,
            max: 34997
        },
        {
            min: 35004,
            max: 36925
        },
        {
            min: 37010,
            max: 38589
        },
        {
            min: 38601,
            max: 39776
        },
        {
            min: 40003,
            max: 42788
        },
        // Midwest
        {
            min: 43001,
            max: 45999
        },
        {
            min: 46001,
            max: 47997
        },
        {
            min: 48001,
            max: 49971
        },
        {
            min: 50001,
            max: 52809
        },
        {
            min: 53001,
            max: 54990
        },
        {
            min: 55001,
            max: 56763
        },
        {
            min: 57001,
            max: 57799
        },
        {
            min: 58001,
            max: 58856
        },
        {
            min: 59001,
            max: 59937
        },
        {
            min: 60001,
            max: 62999
        },
        {
            min: 63001,
            max: 65899
        },
        {
            min: 66002,
            max: 67954
        },
        {
            min: 68001,
            max: 69367
        },
        // Southwest
        {
            min: 70001,
            max: 71497
        },
        {
            min: 71601,
            max: 72959
        },
        {
            min: 73001,
            max: 74966
        },
        {
            min: 75001,
            max: 79999
        },
        {
            min: 85001,
            max: 86556
        },
        {
            min: 87001,
            max: 88441
        },
        // West
        {
            min: 80001,
            max: 81658
        },
        {
            min: 82001,
            max: 83128
        },
        {
            min: 83201,
            max: 83877
        },
        {
            min: 84001,
            max: 84791
        },
        {
            min: 88901,
            max: 89883
        },
        {
            min: 90001,
            max: 96162
        },
        {
            min: 96701,
            max: 96898
        },
        {
            min: 97001,
            max: 97920
        },
        {
            min: 98001,
            max: 99403
        },
        {
            min: 99501,
            max: 99950
        }
    ];
    // Check if ZIP falls within any valid range
    const isValid = validRanges.some((range)=>zipNum >= range.min && zipNum <= range.max);
    return isValid;
}
function isValidSSN(ssn) {
    const cleaned = ssn.replace(/\D/g, '');
    if (cleaned.length !== 9) {
        return false;
    }
    const invalid = [
        '000000000',
        '111111111',
        '222222222',
        '333333333',
        '444444444',
        '555555555',
        '666666666',
        '777777777',
        '888888888',
        '999999999',
        '123456789'
    ];
    if (invalid.includes(cleaned)) {
        return false;
    }
    const area = parseInt(cleaned.substring(0, 3), 10);
    if (area === 0 || area === 666 || area >= 900) {
        return false;
    }
    return true;
}
}),
"[project]/utils/formHelpers.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MONTHS",
    ()=>MONTHS,
    "US_STATES",
    ()=>US_STATES,
    "formatCurrency",
    ()=>formatCurrency,
    "formatPhoneNumber",
    ()=>formatPhoneNumber,
    "formatSSN",
    ()=>formatSSN,
    "formatZipCode",
    ()=>formatZipCode,
    "generateDays",
    ()=>generateDays,
    "generateTrackingId",
    ()=>generateTrackingId,
    "generateYears",
    ()=>generateYears,
    "getUserIP",
    ()=>getUserIP,
    "isValidAge",
    ()=>isValidAge,
    "isValidEmail",
    ()=>isValidEmail,
    "isValidPhone",
    ()=>isValidPhone,
    "isValidSSN",
    ()=>isValidSSN,
    "isValidZip",
    ()=>isValidZip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$validators$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/validators.js [ssr] (ecmascript)");
;
const US_STATES = [
    {
        value: "",
        label: "Select State"
    },
    {
        value: "AL",
        label: "Alabama"
    },
    {
        value: "AK",
        label: "Alaska"
    },
    {
        value: "AZ",
        label: "Arizona"
    },
    {
        value: "AR",
        label: "Arkansas"
    },
    {
        value: "CA",
        label: "California"
    },
    {
        value: "CO",
        label: "Colorado"
    },
    {
        value: "CT",
        label: "Connecticut"
    },
    {
        value: "DE",
        label: "Delaware"
    },
    {
        value: "FL",
        label: "Florida"
    },
    {
        value: "GA",
        label: "Georgia"
    },
    {
        value: "HI",
        label: "Hawaii"
    },
    {
        value: "ID",
        label: "Idaho"
    },
    {
        value: "IL",
        label: "Illinois"
    },
    {
        value: "IN",
        label: "Indiana"
    },
    {
        value: "IA",
        label: "Iowa"
    },
    {
        value: "KS",
        label: "Kansas"
    },
    {
        value: "KY",
        label: "Kentucky"
    },
    {
        value: "LA",
        label: "Louisiana"
    },
    {
        value: "ME",
        label: "Maine"
    },
    {
        value: "MD",
        label: "Maryland"
    },
    {
        value: "MA",
        label: "Massachusetts"
    },
    {
        value: "MI",
        label: "Michigan"
    },
    {
        value: "MN",
        label: "Minnesota"
    },
    {
        value: "MS",
        label: "Mississippi"
    },
    {
        value: "MO",
        label: "Missouri"
    },
    {
        value: "MT",
        label: "Montana"
    },
    {
        value: "NE",
        label: "Nebraska"
    },
    {
        value: "NV",
        label: "Nevada"
    },
    {
        value: "NH",
        label: "New Hampshire"
    },
    {
        value: "NJ",
        label: "New Jersey"
    },
    {
        value: "NM",
        label: "New Mexico"
    },
    {
        value: "NY",
        label: "New York"
    },
    {
        value: "NC",
        label: "North Carolina"
    },
    {
        value: "ND",
        label: "North Dakota"
    },
    {
        value: "OH",
        label: "Ohio"
    },
    {
        value: "OK",
        label: "Oklahoma"
    },
    {
        value: "OR",
        label: "Oregon"
    },
    {
        value: "PA",
        label: "Pennsylvania"
    },
    {
        value: "RI",
        label: "Rhode Island"
    },
    {
        value: "SC",
        label: "South Carolina"
    },
    {
        value: "SD",
        label: "South Dakota"
    },
    {
        value: "TN",
        label: "Tennessee"
    },
    {
        value: "TX",
        label: "Texas"
    },
    {
        value: "UT",
        label: "Utah"
    },
    {
        value: "VT",
        label: "Vermont"
    },
    {
        value: "VA",
        label: "Virginia"
    },
    {
        value: "WA",
        label: "Washington"
    },
    {
        value: "WV",
        label: "West Virginia"
    },
    {
        value: "WI",
        label: "Wisconsin"
    },
    {
        value: "WY",
        label: "Wyoming"
    }
];
const MONTHS = [
    {
        value: "",
        label: "Month"
    },
    {
        value: "1",
        label: "January"
    },
    {
        value: "2",
        label: "February"
    },
    {
        value: "3",
        label: "March"
    },
    {
        value: "4",
        label: "April"
    },
    {
        value: "5",
        label: "May"
    },
    {
        value: "6",
        label: "June"
    },
    {
        value: "7",
        label: "July"
    },
    {
        value: "8",
        label: "August"
    },
    {
        value: "9",
        label: "September"
    },
    {
        value: "10",
        label: "October"
    },
    {
        value: "11",
        label: "November"
    },
    {
        value: "12",
        label: "December"
    }
];
const generateDays = ()=>{
    const days = [
        {
            value: "",
            label: "Day"
        }
    ];
    for(let i = 1; i <= 31; i++){
        days.push({
            value: i.toString(),
            label: i.toString()
        });
    }
    return days;
};
const generateYears = ()=>{
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 100;
    const maxYear = currentYear - 18;
    const years = [
        {
            value: "",
            label: "Year"
        }
    ];
    for(let year = maxYear; year >= minYear; year--){
        years.push({
            value: year.toString(),
            label: year.toString()
        });
    }
    return years;
};
const formatPhoneNumber = (value)=>{
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    let formatted = "";
    if (match[1]) formatted = `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
};
const formatSSN = (value)=>{
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (!match) return value;
    let formatted = match[1];
    if (match[2]) formatted += `-${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
};
const formatZipCode = (value)=>{
    return value.replace(/\D/g, "").slice(0, 5);
};
const formatCurrency = (value)=>{
    const cleaned = value.replace(/\D/g, "");
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const getUserIP = async ()=>{
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error getting IP:", error);
        return "0.0.0.0"; // Fallback
    }
};
const generateTrackingId = ()=>{
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
const isValidEmail = (email)=>{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
function isValidPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$validators$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidUSPhone"])(cleaned);
}
function isValidSSN(ssn) {
    const cleaned = ssn.replace(/\D/g, '');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$validators$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidSSN"])(cleaned);
}
function isValidZip(zip) {
    const cleaned = zip.replace(/\D/g, '');
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$validators$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidUSZip"])(cleaned);
}
const isValidAge = (month, day, year)=>{
    if (!month || !day || !year) return false;
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        return age - 1 >= 18;
    }
    return age >= 18;
};
}),
"[project]/components/Tooltip.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HelpText",
    ()=>HelpText,
    "InfoTooltip",
    ()=>InfoTooltip,
    "Tooltip",
    ()=>Tooltip
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function Tooltip({ children, content, position = "top" }) {
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const positions = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2"
    };
    const arrowPositions = {
        top: "top-full left-1/2 -translate-x-1/2 -mt-1",
        bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1",
        left: "left-full top-1/2 -translate-y-1/2 -ml-1",
        right: "right-full top-1/2 -translate-y-1/2 -mr-1"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "relative inline-block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                onMouseEnter: ()=>setShow(true),
                onMouseLeave: ()=>setShow(false),
                onClick: ()=>setShow(!show),
                children: children
            }, void 0, false, {
                fileName: "[project]/components/Tooltip.jsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `absolute ${positions[position]} z-50 animate-fadeIn`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs",
                        children: content
                    }, void 0, false, {
                        fileName: "[project]/components/Tooltip.jsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `absolute ${arrowPositions[position]} w-2 h-2 bg-gray-900 transform rotate-45`
                    }, void 0, false, {
                        fileName: "[project]/components/Tooltip.jsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Tooltip.jsx",
                lineNumber: 36,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Tooltip.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
function InfoTooltip({ content, position = "top" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Tooltip, {
        content: content,
        position: position,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
            type: "button",
            className: "inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/Tooltip.jsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Tooltip.jsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Tooltip.jsx",
            lineNumber: 56,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Tooltip.jsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
function HelpText({ children, className = "", id }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
        id: id,
        className: `text-xs text-gray-500 mt-2 flex items-start ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-gray-400",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/Tooltip.jsx",
                    lineNumber: 87,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Tooltip.jsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/Tooltip.jsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Tooltip.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Accessibility.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccessibleAlert",
    ()=>AccessibleAlert,
    "AccessibleModal",
    ()=>AccessibleModal,
    "AccessibleProgress",
    ()=>AccessibleProgress,
    "FocusTrap",
    ()=>FocusTrap,
    "IconButton",
    ()=>IconButton,
    "LiveRegion",
    ()=>LiveRegion,
    "ScreenReaderOnly",
    ()=>ScreenReaderOnly,
    "SkipToContent",
    ()=>SkipToContent,
    "useKeyboardNavigation",
    ()=>useKeyboardNavigation
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function SkipToContent() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
        href: "#main-content",
        className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg",
        children: "Skip to main content"
    }, void 0, false, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
function ScreenReaderOnly({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
        className: "sr-only",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 26,
        columnNumber: 10
    }, this);
}
function IconButton({ icon, label, onClick, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        "aria-label": label,
        className: `p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`,
        children: [
            icon,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ScreenReaderOnly, {
                children: label
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function AccessibleModal({ isOpen, onClose, title, children }) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isOpen) {
            // Trap focus in modal
            const modal = document.getElementById("accessible-modal");
            const focusableElements = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements && focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                const handleTab = (e)=>{
                    if (e.key === "Tab") {
                        if (e.shiftKey) {
                            if (document.activeElement === firstElement) {
                                lastElement.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                firstElement.focus();
                                e.preventDefault();
                            }
                        }
                    }
                    if (e.key === "Escape") {
                        onClose();
                    }
                };
                document.addEventListener("keydown", handleTab);
                firstElement?.focus();
                return ()=>document.removeEventListener("keydown", handleTab);
            }
        }
    }, [
        isOpen,
        onClose
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        id: "accessible-modal",
        className: "fixed inset-0 z-50 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black bg-opacity-50",
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        id: "modal-title",
                        className: "text-xl font-bold text-gray-900 mb-4",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        "aria-label": "Close modal",
                        className: "absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            className: "w-6 h-6",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12"
                            }, void 0, false, {
                                fileName: "[project]/components/Accessibility.jsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Accessibility.jsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
function AccessibleProgress({ value, max = 100, label }) {
    const percentage = value / max * 100;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-sm font-medium text-gray-700 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        id: "progress-label",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        "aria-live": "polite",
                        children: [
                            Math.round(percentage),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                role: "progressbar",
                "aria-valuenow": value,
                "aria-valuemin": 0,
                "aria-valuemax": max,
                "aria-labelledby": "progress-label",
                className: "w-full bg-gray-200 rounded-full h-3 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-blue-600 h-full rounded-full transition-all duration-500",
                    style: {
                        width: `${percentage}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/components/Accessibility.jsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 145,
        columnNumber: 5
    }, this);
}
function AccessibleAlert({ type = "info", title, message, onClose }) {
    const types = {
        info: {
            role: "status",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/Accessibility.jsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 175,
                columnNumber: 9
            }, this),
            color: "bg-blue-50 text-blue-800 border-blue-200"
        },
        success: {
            role: "status",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/Accessibility.jsx",
                    lineNumber: 189,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 188,
                columnNumber: 9
            }, this),
            color: "bg-green-50 text-green-800 border-green-200"
        },
        warning: {
            role: "alert",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/Accessibility.jsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 201,
                columnNumber: 9
            }, this),
            color: "bg-yellow-50 text-yellow-800 border-yellow-200"
        },
        error: {
            role: "alert",
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/Accessibility.jsx",
                    lineNumber: 215,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 214,
                columnNumber: 9
            }, this),
            color: "bg-red-50 text-red-800 border-red-200"
        }
    };
    const config = types[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        role: config.role,
        "aria-live": type === "error" || type === "warning" ? "assertive" : "polite",
        className: `p-4 rounded-lg border ${config.color} flex items-start`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0",
                children: config.icon
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 236,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "ml-3 flex-1",
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "font-medium",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 238,
                        columnNumber: 19
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 239,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: onClose,
                "aria-label": "Dismiss alert",
                className: "ml-4 flex-shrink-0 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    className: "w-4 h-4",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/components/Accessibility.jsx",
                        lineNumber: 248,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/Accessibility.jsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Accessibility.jsx",
                lineNumber: 242,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
function LiveRegion({ children, priority = "polite" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        role: "status",
        "aria-live": priority,
        "aria-atomic": "true",
        className: "sr-only",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Accessibility.jsx",
        lineNumber: 265,
        columnNumber: 5
    }, this);
}
function useKeyboardNavigation(refs, options = {}) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            const currentIndex = refs.findIndex((ref)=>ref.current === document.activeElement);
            if (e.key === "ArrowDown" || e.key === "Tab" && !e.shiftKey) {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % refs.length;
                refs[nextIndex]?.current?.focus();
            }
            if (e.key === "ArrowUp" || e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? refs.length - 1 : currentIndex - 1;
                refs[prevIndex]?.current?.focus();
            }
            if (options.onEscape && e.key === "Escape") {
                options.onEscape();
            }
            if (options.onEnter && e.key === "Enter") {
                options.onEnter();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return ()=>document.removeEventListener("keydown", handleKeyDown);
    }, [
        refs,
        options
    ]);
}
function FocusTrap({ children, active = true }) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!active) return;
        const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const handleTab = (e)=>{
            if (e.key === "Tab") {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };
        document.addEventListener("keydown", handleTab);
        return ()=>document.removeEventListener("keydown", handleTab);
    }, [
        active
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/components/FormInput.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RadioGroup",
    ()=>RadioGroup,
    "SelectInput",
    ()=>SelectInput,
    "TextInput",
    ()=>TextInput
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Tooltip.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Accessibility$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Accessibility.jsx [ssr] (ecmascript)");
;
;
;
function TextInput({ label, name, value, onChange, error, placeholder, required = false, type = "text", maxLength, disabled = false, icon, tooltip, helpText, showCharCount = false, success = false, autoComplete }) {
    const charCount = value?.length || 0;
    const isNearLimit = maxLength && charCount > maxLength * 0.8;
    const inputId = `input-${name}`;
    const errorId = `error-${name}`;
    const helpId = `help-${name}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        htmlFor: inputId,
                        className: "flex items-center text-sm font-semibold text-gray-700",
                        children: [
                            label,
                            required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-red-500 ml-1",
                                        "aria-label": "required",
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormInput.jsx",
                                        lineNumber: 41,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Accessibility$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["ScreenReaderOnly"], {
                                        children: "(required)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/FormInput.jsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "ml-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["InfoTooltip"], {
                                    content: tooltip
                                }, void 0, false, {
                                    fileName: "[project]/components/FormInput.jsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    showCharCount && maxLength && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: `text-xs ${isNearLimit ? "text-orange-600 font-medium" : "text-gray-500"}`,
                        "aria-live": "polite",
                        "aria-atomic": "true",
                        children: [
                            charCount,
                            "/",
                            maxLength
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-400",
                        "aria-hidden": "true",
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                        type: type,
                        id: inputId,
                        name: name,
                        value: value,
                        onChange: onChange,
                        placeholder: placeholder,
                        maxLength: maxLength,
                        disabled: disabled,
                        autoComplete: autoComplete,
                        "aria-invalid": error ? "true" : "false",
                        "aria-describedby": `${error ? errorId : ""} ${helpText ? helpId : ""}`.trim() || undefined,
                        "aria-required": required,
                        className: `w-full ${icon ? "pl-12" : "pl-4"} pr-12 py-3.5 text-base border-2 rounded-xl transition-all duration-200 font-medium
            ${error ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100 focus:border-red-500" : success ? "border-green-400 bg-green-50 focus:ring-4 focus:ring-green-100 focus:border-green-500" : "border-gray-300 bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500"} 
            ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}
            text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:placeholder:text-gray-500`
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    (success || error) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute right-4 top-1/2 -translate-y-1/2",
                        "aria-hidden": "true",
                        children: [
                            success && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-green-500",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/components/FormInput.jsx",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                className: "w-6 h-6 text-red-500",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/components/FormInput.jsx",
                                    lineNumber: 131,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            helpText && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["HelpText"], {
                id: helpId,
                children: helpText
            }, void 0, false, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 142,
                columnNumber: 30
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                id: errorId,
                className: "mt-2 text-sm text-red-600 flex items-center animate-shake font-medium",
                role: "alert",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 mr-1.5 flex-shrink-0",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        "aria-hidden": "true",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 156,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 145,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormInput.jsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
function SelectInput({ label, name, value, onChange, error, options, required = false, disabled = false, tooltip, helpText, success = false, hideAsterisk = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                htmlFor: name,
                className: "flex items-center text-sm font-semibold text-gray-700 mb-2",
                children: [
                    label,
                    " ",
                    required && !hideAsterisk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-red-500 ml-1 test",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 192,
                        columnNumber: 48
                    }, this),
                    tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "ml-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["InfoTooltip"], {
                            content: tooltip
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                        id: name,
                        name: name,
                        value: value,
                        onChange: onChange,
                        disabled: disabled,
                        className: `w-full px-4 py-3.5 pr-12 text-base border-2 rounded-xl transition-all duration-200 appearance-none font-medium
          ${error ? "border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100 focus:border-red-500" : success ? "border-green-400 bg-green-50 focus:ring-4 focus:ring-green-100 focus:border-green-500" : "border-gray-300 bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-500"} 
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "cursor-pointer"}
          ${!value ? "text-gray-400" : "text-gray-900"}`,
                        children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                value: option.value,
                                children: option.label
                            }, option.value, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            className: `w-5 h-5 transition-colors ${error ? "text-red-400" : success && value ? "text-green-500" : "text-gray-400"}`,
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 232,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this),
                    success && value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute right-12 top-1/2 -translate-y-1/2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            className: "w-5 h-5 text-green-500",
                            fill: "currentColor",
                            viewBox: "0 0 20 20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                clipRule: "evenodd"
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 254,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            helpText && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["HelpText"], {
                children: helpText
            }, void 0, false, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 269,
                columnNumber: 30
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-red-600 flex items-center animate-shake font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 mr-1.5 flex-shrink-0",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 278,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 272,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormInput.jsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
function RadioGroup({ label, name, value, onChange, error, options, required = false, tooltip, helpText }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                className: "flex items-center text-sm font-semibold text-gray-700 mb-3",
                children: [
                    label,
                    " ",
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-red-500 ml-1",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 308,
                        columnNumber: 30
                    }, this),
                    tooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "ml-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["InfoTooltip"], {
                            content: tooltip
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 310,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        className: `relative flex items-center justify-center px-5 py-4 border-2 rounded-xl cursor-pointer transition-all duration-200 
            ${value === option.value ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md ring-2 ring-blue-200" : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 hover:shadow-sm"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "radio",
                                name: name,
                                value: option.value,
                                checked: value === option.value,
                                onChange: onChange,
                                className: "sr-only"
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 327,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: `text-base font-semibold transition-colors ${value === option.value ? "text-blue-700" : "text-gray-700"}`,
                                children: option.label
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this),
                            value === option.value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                className: "absolute top-3 right-3 w-5 h-5 text-blue-600",
                                fill: "currentColor",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                    fillRule: "evenodd",
                                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                                    clipRule: "evenodd"
                                }, void 0, false, {
                                    fileName: "[project]/components/FormInput.jsx",
                                    lineNumber: 348,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/FormInput.jsx",
                                lineNumber: 343,
                                columnNumber: 15
                            }, this)
                        ]
                    }, option.value, true, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 316,
                columnNumber: 7
            }, this),
            helpText && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Tooltip$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["HelpText"], {
                className: "mt-2",
                children: helpText
            }, void 0, false, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 359,
                columnNumber: 30
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-red-600 flex items-center animate-shake font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4 mr-1.5 flex-shrink-0",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/components/FormInput.jsx",
                            lineNumber: 368,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FormInput.jsx",
                        lineNumber: 363,
                        columnNumber: 11
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/FormInput.jsx",
                lineNumber: 362,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FormInput.jsx",
        lineNumber: 306,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/LoadingStates.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// =============================================
// Loading States & Skeleton Components
// =============================================
/**
 * Spinner - Simple loading spinner
 */ __turbopack_context__.s([
    "DotsLoading",
    ()=>DotsLoading,
    "LoadingBar",
    ()=>LoadingBar,
    "LoadingButton",
    ()=>LoadingButton,
    "ProcessingOverlay",
    ()=>ProcessingOverlay,
    "ProgressRing",
    ()=>ProgressRing,
    "Skeleton",
    ()=>Skeleton,
    "SkeletonFormField",
    ()=>SkeletonFormField,
    "SkeletonText",
    ()=>SkeletonText,
    "Spinner",
    ()=>Spinner
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Spinner({ size = "md", color = "blue" }) {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
        xl: "h-16 w-16"
    };
    const colors = {
        blue: "border-blue-600",
        white: "border-white",
        gray: "border-gray-600"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full animate-spin`
    }, void 0, false, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function LoadingButton({ loading, children, onClick, disabled, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: loading || disabled,
        className: `relative ${className} ${loading || disabled ? "opacity-70 cursor-not-allowed" : ""}`,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Spinner, {
                    size: "sm",
                    color: "white"
                }, void 0, false, {
                    fileName: "[project]/components/LoadingStates.jsx",
                    lineNumber: 49,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 48,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: loading ? "opacity-0" : "",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
function Skeleton({ className = "", animate = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `bg-gray-200 rounded ${animate ? "animate-pulse" : ""} ${className}`
    }, void 0, false, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
function SkeletonText({ lines = 3, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `space-y-3 ${className}`,
        children: [
            ...Array(lines)
        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Skeleton, {
                className: `h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`
            }, i, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 77,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
function SkeletonFormField() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Skeleton, {
                className: "h-4 w-24"
            }, void 0, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Skeleton, {
                className: "h-10 w-full"
            }, void 0, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 91,
        columnNumber: 5
    }, this);
}
function ProcessingOverlay({ message = "Processing...", steps = [] }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Spinner, {
                        size: "xl",
                        color: "blue"
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                        className: "mt-6 text-xl font-semibold text-gray-900",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    steps.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mt-6 w-full space-y-3",
                        children: steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex items-center text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `w-6 h-6 rounded-full flex items-center justify-center mr-3 ${step.status === "completed" ? "bg-green-500" : step.status === "active" ? "bg-blue-500" : "bg-gray-300"}`,
                                        children: step.status === "completed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            className: "w-4 h-4 text-white",
                                            fill: "currentColor",
                                            viewBox: "0 0 20 20",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LoadingStates.jsx",
                                                lineNumber: 134,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/LoadingStates.jsx",
                                            lineNumber: 129,
                                            columnNumber: 23
                                        }, this) : step.status === "active" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "w-3 h-3 bg-white rounded-full animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/components/LoadingStates.jsx",
                                            lineNumber: 141,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-white text-xs",
                                            children: index + 1
                                        }, void 0, false, {
                                            fileName: "[project]/components/LoadingStates.jsx",
                                            lineNumber: 143,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/LoadingStates.jsx",
                                        lineNumber: 119,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: `${step.status === "completed" ? "text-green-600" : step.status === "active" ? "text-blue-600 font-medium" : "text-gray-500"}`,
                                        children: step.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/LoadingStates.jsx",
                                        lineNumber: 146,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/components/LoadingStates.jsx",
                                lineNumber: 118,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm text-gray-500 text-center",
                        children: "Please don't close this window"
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 105,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LoadingStates.jsx",
            lineNumber: 104,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
function DotsLoading({ color = "blue" }) {
    const dotColor = {
        blue: "bg-blue-600",
        gray: "bg-gray-600",
        white: "bg-white"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex space-x-2",
        children: [
            0,
            1,
            2
        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `w-2 h-2 ${dotColor[color]} rounded-full animate-bounce`,
                style: {
                    animationDelay: `${i * 0.1}s`
                }
            }, i, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 185,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
function ProgressRing({ progress, size = 120, strokeWidth = 8 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - progress / 100 * circumference;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "relative inline-flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                className: "transform -rotate-90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        stroke: "currentColor",
                        strokeWidth: strokeWidth,
                        fill: "none",
                        className: "text-gray-200"
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                        cx: size / 2,
                        cy: size / 2,
                        r: radius,
                        stroke: "currentColor",
                        strokeWidth: strokeWidth,
                        fill: "none",
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        className: "text-blue-600 transition-all duration-500",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "absolute text-2xl font-bold text-gray-900",
                children: [
                    Math.round(progress),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 231,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
function LoadingBar({ progress, showPercentage = true, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: className,
        children: [
            showPercentage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex justify-between text-sm font-medium text-gray-700 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        children: "Progress"
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        children: [
                            Math.round(progress),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 249,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "w-full bg-gray-200 rounded-full h-3 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden",
                    style: {
                        width: `${progress}%`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"
                    }, void 0, false, {
                        fileName: "[project]/components/LoadingStates.jsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LoadingStates.jsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/LoadingStates.jsx",
                lineNumber: 254,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/LoadingStates.jsx",
        lineNumber: 247,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/SuccessAnimations.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedCheckmark",
    ()=>AnimatedCheckmark,
    "Confetti",
    ()=>Confetti,
    "Fireworks",
    ()=>Fireworks,
    "SuccessBadge",
    ()=>SuccessBadge,
    "SuccessCard",
    ()=>SuccessCard,
    "SuccessPage",
    ()=>SuccessPage,
    "SuccessToast",
    ()=>SuccessToast
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function Confetti({ active = true, duration = 5000 }) {
    const [particles, setParticles] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!active) return;
        // Generate confetti particles
        const newParticles = Array.from({
            length: 100
        }, (_, i)=>({
                id: i,
                x: Math.random() * 100,
                y: -10,
                rotation: Math.random() * 360,
                color: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6"
                ][Math.floor(Math.random() * 5)],
                size: Math.random() * 10 + 5,
                delay: Math.random() * 1000,
                duration: Math.random() * 3000 + 2000
            }));
        setParticles(newParticles);
        // Clear confetti after duration
        const timer = setTimeout(()=>{
            setParticles([]);
        }, duration);
        return ()=>clearTimeout(timer);
    }, [
        active,
        duration
    ]);
    if (!active || particles.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 pointer-events-none z-50 overflow-hidden",
        children: particles.map((particle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute animate-confetti-fall",
                style: {
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.color,
                    transform: `rotate(${particle.rotation}deg)`,
                    animationDelay: `${particle.delay}ms`,
                    animationDuration: `${particle.duration}ms`
                }
            }, particle.id, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 46,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/SuccessAnimations.jsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
function AnimatedCheckmark({ size = 80, color = "green" }) {
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setShow(true);
    }, []);
    const colors = {
        green: "text-green-500",
        blue: "text-blue-500"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `relative ${show ? "animate-scaleIn" : "opacity-0"}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: `rounded-full ${colors[color]} bg-opacity-10 flex items-center justify-center`,
            style: {
                width: size,
                height: size
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: colors[color],
                width: size * 0.6,
                height: size * 0.6,
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    className: "animate-checkmark",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 3,
                    d: "M5 13l4 4L19 7"
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 96,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 88,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/SuccessAnimations.jsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SuccessAnimations.jsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
function SuccessCard({ title = "Success!", message, redirectUrl, countdown = 3, onClose }) {
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(countdown);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!redirectUrl || countdown <= 0) return;
        const timer = setInterval(()=>{
            setTimeLeft((prev)=>{
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = redirectUrl;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return ()=>clearInterval(timer);
    }, [
        redirectUrl,
        countdown
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8 text-center animate-scaleIn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex justify-center mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AnimatedCheckmark, {
                    size: 100,
                    color: "green"
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold text-gray-900 mb-4 animate-fadeIn",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-lg text-gray-600 mb-6 animate-fadeIn",
                style: {
                    animationDelay: "0.2s"
                },
                children: message
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            redirectUrl && timeLeft > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "animate-fadeIn",
                style: {
                    animationDelay: "0.4s"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center space-x-3 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "animate-spin h-5 w-5 border-3 border-blue-500 border-t-transparent rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/components/SuccessAnimations.jsx",
                            lineNumber: 162,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: "text-sm text-gray-500",
                            children: [
                                "Redirecting in ",
                                timeLeft,
                                " second",
                                timeLeft !== 1 ? "s" : "",
                                "..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/SuccessAnimations.jsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 160,
                columnNumber: 9
            }, this),
            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "mt-4 text-sm text-gray-500 hover:text-gray-700 underline",
                children: "Close"
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 172,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/SuccessAnimations.jsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
function SuccessToast({ message, duration = 3000, onClose }) {
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            setShow(false);
            if (onClose) {
                setTimeout(onClose, 300);
            }
        }, duration);
        return ()=>clearTimeout(timer);
    }, [
        duration,
        onClose
    ]);
    if (!show) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed top-4 right-4 z-50 animate-slideInRight",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6",
                    fill: "currentColor",
                    viewBox: "0 0 20 20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                        fillRule: "evenodd",
                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                        clipRule: "evenodd"
                    }, void 0, false, {
                        fileName: "[project]/components/SuccessAnimations.jsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 206,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "font-medium",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>{
                        setShow(false);
                        if (onClose) setTimeout(onClose, 300);
                    },
                    className: "ml-4 hover:bg-green-600 rounded p-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                        className: "w-4 h-4",
                        fill: "currentColor",
                        viewBox: "0 0 20 20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            fillRule: "evenodd",
                            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                            clipRule: "evenodd"
                        }, void 0, false, {
                            fileName: "[project]/components/SuccessAnimations.jsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/SuccessAnimations.jsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/SuccessAnimations.jsx",
            lineNumber: 204,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SuccessAnimations.jsx",
        lineNumber: 203,
        columnNumber: 5
    }, this);
}
function Fireworks({ active = true, duration = 3000 }) {
    const [bursts, setBursts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!active) return;
        const createBurst = ()=>{
            const burst = {
                id: Date.now(),
                x: Math.random() * 80 + 10,
                y: Math.random() * 50 + 10,
                color: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6"
                ][Math.floor(Math.random() * 5)]
            };
            setBursts((prev)=>[
                    ...prev,
                    burst
                ]);
            setTimeout(()=>{
                setBursts((prev)=>prev.filter((b)=>b.id !== burst.id));
            }, 1000);
        };
        const interval = setInterval(createBurst, 500);
        const timer = setTimeout(()=>{
            clearInterval(interval);
            setBursts([]);
        }, duration);
        return ()=>{
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [
        active,
        duration
    ]);
    if (!active) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 pointer-events-none z-40 overflow-hidden",
        children: bursts.map((burst)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "absolute",
                style: {
                    left: `${burst.x}%`,
                    top: `${burst.y}%`
                },
                children: Array.from({
                    length: 12
                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "absolute w-2 h-2 rounded-full animate-firework",
                        style: {
                            backgroundColor: burst.color,
                            transform: `rotate(${i * 30}deg) translateY(-40px)`,
                            animationDelay: `${i * 0.05}s`
                        }
                    }, i, false, {
                        fileName: "[project]/components/SuccessAnimations.jsx",
                        lineNumber: 287,
                        columnNumber: 13
                    }, this))
            }, burst.id, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 281,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/SuccessAnimations.jsx",
        lineNumber: 279,
        columnNumber: 5
    }, this);
}
function SuccessBadge({ text = "Success", pulse = true }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium ${pulse ? "animate-pulse" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                className: "w-5 h-5 mr-2",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                    fillRule: "evenodd",
                    d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
                    clipRule: "evenodd"
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 314,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            text
        ]
    }, void 0, true, {
        fileName: "[project]/components/SuccessAnimations.jsx",
        lineNumber: 308,
        columnNumber: 5
    }, this);
}
function SuccessPage({ title = "Congratulations! 🎉", message, price, vendor, redirectUrl, countdown = 5 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Confetti, {
                active: true,
                duration: 5000
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 339,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Fireworks, {
                active: true,
                duration: 3000
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 342,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "min-h-screen flex items-center justify-center p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SuccessCard, {
                    title: title,
                    message: message,
                    redirectUrl: redirectUrl,
                    countdown: countdown
                }, void 0, false, {
                    fileName: "[project]/components/SuccessAnimations.jsx",
                    lineNumber: 346,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SuccessAnimations.jsx",
                lineNumber: 345,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/LeadForm.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// components/EnhancedLeadForm.jsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/formHelpers.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FormInput.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadingStates$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LoadingStates.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuccessAnimations$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SuccessAnimations.jsx [ssr] (ecmascript)");
;
;
;
;
;
;
function EnhancedLeadForm() {
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(1);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
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
        ownCar: "",
        activeMilitary: "",
        // Tracking
        note: "",
        atrk: ""
    });
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [submitStatus, setSubmitStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [redirectUrl, setRedirectUrl] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const trackingId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["generateTrackingId"])();
        setFormData((prev)=>({
                ...prev,
                atrk: trackingId,
                note: "web-form-v2-leadsmarket"
            }));
    }, []);
    const calculateProgress = ()=>{
        const totalSteps = 5; // Increased to 5 steps
        return Math.round(currentStep / totalSteps * 100);
    };
    const handleChange = (e)=>{
        const { name, value } = e.target;
        let formattedValue = value;
        switch(name){
            case "phone":
                formattedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["formatPhoneNumber"])(value);
                break;
            case "ssn":
                formattedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["formatSSN"])(value);
                break;
            case "zip":
                formattedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["formatZipCode"])(value);
                break;
            case "amount":
            case "monthlyNetIncome":
                formattedValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(value);
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
        setFormData((prev)=>({
                ...prev,
                [name]: formattedValue
            }));
        if (errors[name]) {
            setErrors((prev)=>{
                const newErrors = {
                    ...prev
                };
                delete newErrors[name];
                return newErrors;
            });
        }
    };
    const validateStep = (step)=>{
        const newErrors = {};
        if (step === 1) {
            // Personal Information
            if (!formData.fName?.trim()) newErrors.fName = "First name is required";
            if (!formData.lName?.trim()) newErrors.lName = "Last name is required";
            if (!formData.email?.trim()) {
                newErrors.email = "Email is required";
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidEmail"])(formData.email)) {
                newErrors.email = "Invalid email format";
            }
            if (!formData.phone?.trim()) {
                newErrors.phone = "Phone number is required";
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidPhone"])(formData.phone)) {
                newErrors.phone = "Invalid phone number. Please use a real US number (not 555-xxxx test numbers)";
            }
            if (!formData.bMonth) newErrors.bMonth = "Month required";
            if (!formData.bDay) newErrors.bDay = "Day required";
            if (!formData.bYear) newErrors.bYear = "Year required";
            if (formData.bMonth && formData.bDay && formData.bYear) {
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidAge"])(formData.bMonth, formData.bDay, formData.bYear)) {
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
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidZip"])(formData.zip)) {
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
            } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isValidSSN"])(formData.ssn)) {
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
    const handleNext = ()=>{
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            setTimeout(()=>{
                const firstError = document.querySelector(".border-red-500");
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }
            }, 100);
        }
    };
    const handleBack = ()=>{
        setCurrentStep(currentStep - 1);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validateStep(5)) {
            return;
        }
        setLoading(true);
        setSubmitStatus(null);
        try {
            const ipAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["getUserIP"])();
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
                user_agent: userAgent
            };
            const response = await fetch('/api/lead', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submitData)
            });
            const result = await response.json();
            if (result.status === 'validation_error' || result.status === 'error') {
                if (result.errors && Array.isArray(result.errors)) {
                    const newErrors = {};
                    result.errors.forEach((err)=>{
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
                    setTimeout(()=>{
                        const firstError = document.querySelector(".border-red-500");
                        if (firstError) {
                            firstError.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });
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
                    setTimeout(()=>{
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
        } finally{
            setLoading(false);
        }
    };
    // Render loading/status states (same as before)
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LoadingStates$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["ProcessingOverlay"], {
            message: "Processing Your Application",
            steps: [
                {
                    label: "Validating information",
                    status: "completed"
                },
                {
                    label: "Matching with lenders",
                    status: "active"
                },
                {
                    label: "Finalizing",
                    status: "pending"
                }
            ]
        }, void 0, false, {
            fileName: "[project]/components/LeadForm.jsx",
            lineNumber: 420,
            columnNumber: 7
        }, this);
    }
    if (submitStatus === "success") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuccessAnimations$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Confetti"], {
                    active: true,
                    duration: 6000
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 434,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuccessAnimations$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["Fireworks"], {
                    active: true,
                    duration: 4000
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 435,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "min-h-screen flex items-center justify-center p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SuccessAnimations$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SuccessCard"], {
                        title: "Congratulations! 🎉",
                        message: "Your application has been successfully matched with a lender!",
                        redirectUrl: redirectUrl,
                        countdown: 3
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 437,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 436,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    if (submitStatus === "rejected") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center animate-scaleIn",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                        className: "mx-auto h-16 w-16 text-yellow-500",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        }, void 0, false, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 453,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 452,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 451,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-gray-900 mb-4",
                    children: "No Match Found"
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 456,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-6",
                    children: "Unfortunately, we couldn't match you with a lender at this time."
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 457,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>window.location.reload(),
                    className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium",
                    children: "Try Again"
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 458,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/LeadForm.jsx",
            lineNumber: 450,
            columnNumber: 7
        }, this);
    }
    if (submitStatus === "duplicate") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center animate-scaleIn",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                        className: "mx-auto h-16 w-16 text-orange-500",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        }, void 0, false, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 470,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 469,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 468,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold text-gray-900 mb-4",
                    children: "Duplicate Application"
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 473,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: "text-gray-600 mb-6",
                    children: "We've already processed your application. Please check your email for the status."
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 474,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    onClick: ()=>window.location.reload(),
                    className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium",
                    children: "Go Back"
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 475,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/LeadForm.jsx",
            lineNumber: 467,
            columnNumber: 7
        }, this);
    }
    if (submitStatus === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center animate-shake",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                            className: "mx-auto h-16 w-16 text-red-500",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            }, void 0, false, {
                                fileName: "[project]/components/LeadForm.jsx",
                                lineNumber: 488,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 486,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-4",
                        children: "Oops! Something went wrong"
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 491,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "There was an error processing your application. Please try again."
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setSubmitStatus(null),
                        className: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium",
                        children: "Back to Form"
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 493,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/LeadForm.jsx",
                lineNumber: 485,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/LeadForm.jsx",
            lineNumber: 484,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto min-h-screen py-8 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-lg p-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    className: "text-1xl md:text-2xl  font-bold text-gray-900",
                                    children: "APPLY FOR A LOAN"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 507,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-medium text-gray-600",
                                    children: [
                                        "Step ",
                                        currentStep,
                                        " of 5"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 508,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 506,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "w-full bg-gray-200 rounded-full h-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500",
                                style: {
                                    width: `${calculateProgress()}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/LeadForm.jsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 511,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mt-4 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-400",
                                    children: "Personal"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 519,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-400",
                                    children: "Address"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 520,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-400",
                                    children: "Financial"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 521,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-400",
                                    children: "Banking"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 522,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: currentStep >= 5 ? "text-blue-600 font-medium" : "text-gray-400",
                                    children: "Final"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 523,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 518,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 505,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        currentStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-6 animate-fadeIn",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-gray-800 mb-6",
                                    children: "Personal Information"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 531,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "First Name",
                                            name: "fName",
                                            value: formData.fName,
                                            onChange: handleChange,
                                            error: errors.fName,
                                            placeholder: "John",
                                            required: true,
                                            maxLength: 50
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 534,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Last Name",
                                            name: "lName",
                                            value: formData.lName,
                                            onChange: handleChange,
                                            error: errors.lName,
                                            placeholder: "Doe",
                                            required: true,
                                            maxLength: 50
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 535,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 533,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Email Address",
                                            name: "email",
                                            type: "email",
                                            value: formData.email,
                                            onChange: handleChange,
                                            error: errors.email,
                                            placeholder: "john.doe@example.com",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 539,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Phone Number",
                                            name: "phone",
                                            type: "tel",
                                            value: formData.phone,
                                            onChange: handleChange,
                                            error: errors.phone,
                                            placeholder: "(212) 456-7890",
                                            required: true,
                                            maxLength: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 540,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 538,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                            className: "flex items-center text-sm font-semibold text-gray-700 mb-2",
                                            children: [
                                                "Date of Birth",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500 ml-1",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 556,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 554,
                                            columnNumber: 14
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-3 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                                    label: "",
                                                    name: "bMonth",
                                                    value: formData.bMonth,
                                                    onChange: handleChange,
                                                    error: errors.bMonth,
                                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["MONTHS"],
                                                    required: true,
                                                    hideAsterisk: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 560,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                                    label: "",
                                                    name: "bDay",
                                                    value: formData.bDay,
                                                    onChange: handleChange,
                                                    error: errors.bDay,
                                                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["generateDays"])(),
                                                    required: true,
                                                    hideAsterisk: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 561,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                                    label: "",
                                                    name: "bYear",
                                                    value: formData.bYear,
                                                    onChange: handleChange,
                                                    error: errors.bYear,
                                                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["generateYears"])(),
                                                    required: true,
                                                    hideAsterisk: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 562,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 559,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 553,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 530,
                            columnNumber: 11
                        }, this),
                        currentStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-6 animate-fadeIn",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-gray-800 mb-6",
                                    children: "Address Information"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 571,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                    label: "Street Address",
                                    name: "address1",
                                    value: formData.address1,
                                    onChange: handleChange,
                                    error: errors.address1,
                                    placeholder: "123 Main Street",
                                    required: true,
                                    maxLength: 100
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 573,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "City",
                                            name: "city",
                                            value: formData.city,
                                            onChange: handleChange,
                                            error: errors.city,
                                            placeholder: "New York",
                                            required: true,
                                            maxLength: 80
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 576,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                            label: "State",
                                            name: "state",
                                            value: formData.state,
                                            onChange: handleChange,
                                            error: errors.state,
                                            options: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["US_STATES"],
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 577,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "ZIP Code",
                                            name: "zip",
                                            type: "tel",
                                            value: formData.zip,
                                            onChange: handleChange,
                                            error: errors.zip,
                                            placeholder: "12345",
                                            required: true,
                                            maxLength: 5
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 578,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 575,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                            label: "Years at Current Address",
                                            name: "lengthAtAddress",
                                            value: formData.lengthAtAddress,
                                            onChange: handleChange,
                                            error: errors.lengthAtAddress,
                                            options: [
                                                {
                                                    value: "",
                                                    label: "Select years"
                                                },
                                                {
                                                    value: "0",
                                                    label: "Less than 1 year"
                                                },
                                                {
                                                    value: "1",
                                                    label: "1 year"
                                                },
                                                {
                                                    value: "2",
                                                    label: "2 years"
                                                },
                                                {
                                                    value: "3",
                                                    label: "3 years"
                                                },
                                                {
                                                    value: "4",
                                                    label: "4 years"
                                                },
                                                {
                                                    value: "5",
                                                    label: "5 years"
                                                },
                                                {
                                                    value: "6",
                                                    label: "6 years"
                                                },
                                                {
                                                    value: "7",
                                                    label: "7 years"
                                                },
                                                {
                                                    value: "8",
                                                    label: "8 years"
                                                },
                                                {
                                                    value: "9",
                                                    label: "9 years"
                                                },
                                                {
                                                    value: "10",
                                                    label: "10+ years"
                                                }
                                            ],
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 582,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                            label: "Do you Rent or Own?",
                                            name: "rentOwn",
                                            value: formData.rentOwn,
                                            onChange: handleChange,
                                            error: errors.rentOwn,
                                            options: [
                                                {
                                                    value: "rent",
                                                    label: "Rent"
                                                },
                                                {
                                                    value: "own",
                                                    label: "Own"
                                                }
                                            ],
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 604,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 570,
                            columnNumber: 11
                        }, this),
                        currentStep === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-6 animate-fadeIn",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-gray-800 mb-6",
                                    children: "Financial & Employment Information"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 623,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Requested Loan Amount",
                                            name: "amount",
                                            type: "tel",
                                            value: formData.amount,
                                            onChange: handleChange,
                                            error: errors.amount,
                                            placeholder: "1,000",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 626,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-gray-500",
                                            children: "Amount must be between $100 and $50,000"
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 627,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 625,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Social Security Number",
                                            name: "ssn",
                                            type: "tel",
                                            value: formData.ssn,
                                            onChange: handleChange,
                                            error: errors.ssn,
                                            placeholder: "123-45-6789",
                                            required: true,
                                            maxLength: 11
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 631,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-gray-500 flex items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4 mr-1",
                                                    fill: "currentColor",
                                                    viewBox: "0 0 20 20",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/LeadForm.jsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 633,
                                                    columnNumber: 17
                                                }, this),
                                                "Your SSN is encrypted and secure"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 632,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 630,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                            label: "Income Source",
                                            name: "incomeSource",
                                            value: formData.incomeSource,
                                            onChange: handleChange,
                                            error: errors.incomeSource,
                                            options: [
                                                {
                                                    value: "",
                                                    label: "Select income source"
                                                },
                                                {
                                                    value: "employment",
                                                    label: "Employment"
                                                },
                                                {
                                                    value: "selfemployment",
                                                    label: "Self-Employment"
                                                },
                                                {
                                                    value: "benefits",
                                                    label: "Benefits/Social Security"
                                                }
                                            ],
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Monthly Net Income",
                                            name: "monthlyNetIncome",
                                            type: "tel",
                                            value: formData.monthlyNetIncome,
                                            onChange: handleChange,
                                            error: errors.monthlyNetIncome,
                                            placeholder: "2,500",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 655,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 640,
                                    columnNumber: 13
                                }, this),
                                (formData.incomeSource === 'employment' || formData.incomeSource === 'selfemployment') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Employer Name",
                                            name: "employerName",
                                            value: formData.employerName,
                                            onChange: handleChange,
                                            error: errors.employerName,
                                            placeholder: "ABC Company",
                                            required: true,
                                            maxLength: 50
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 661,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                                    label: "Months Employed",
                                                    name: "monthsEmployed",
                                                    value: formData.monthsEmployed,
                                                    onChange: handleChange,
                                                    error: errors.monthsEmployed,
                                                    options: [
                                                        {
                                                            value: "",
                                                            label: "Select months"
                                                        },
                                                        {
                                                            value: "1",
                                                            label: "1-3 months"
                                                        },
                                                        {
                                                            value: "6",
                                                            label: "4-6 months"
                                                        },
                                                        {
                                                            value: "12",
                                                            label: "7-12 months"
                                                        },
                                                        {
                                                            value: "24",
                                                            label: "1-2 years"
                                                        },
                                                        {
                                                            value: "36",
                                                            label: "2-3 years"
                                                        },
                                                        {
                                                            value: "60",
                                                            label: "3-5 years"
                                                        },
                                                        {
                                                            value: "120",
                                                            label: "5+ years"
                                                        }
                                                    ],
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 664,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                                    label: "Pay Frequency",
                                                    name: "payFrequency",
                                                    value: formData.payFrequency,
                                                    onChange: handleChange,
                                                    error: errors.payFrequency,
                                                    options: [
                                                        {
                                                            value: "",
                                                            label: "Select frequency"
                                                        },
                                                        {
                                                            value: "Weekly",
                                                            label: "Weekly"
                                                        },
                                                        {
                                                            value: "Biweekly",
                                                            label: "Bi-weekly (Every 2 weeks)"
                                                        },
                                                        {
                                                            value: "Twicemonthly",
                                                            label: "Twice Monthly (1st & 15th)"
                                                        },
                                                        {
                                                            value: "Monthly",
                                                            label: "Monthly"
                                                        }
                                                    ],
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 683,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 663,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                            label: "Next Pay Date",
                                            name: "nextPayDate",
                                            type: "date",
                                            value: formData.nextPayDate,
                                            onChange: handleChange,
                                            error: errors.nextPayDate,
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 700,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    label: "Direct Deposit",
                                    name: "directDeposit",
                                    value: formData.directDeposit,
                                    onChange: handleChange,
                                    error: errors.directDeposit,
                                    options: [
                                        {
                                            value: "yes",
                                            label: "Yes"
                                        },
                                        {
                                            value: "no",
                                            label: "No"
                                        }
                                    ],
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 704,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 622,
                            columnNumber: 11
                        }, this),
                        currentStep === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-6 animate-fadeIn",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-gray-800 mb-6",
                                    children: "Banking & Identity Information"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 722,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Why do we need this?"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LeadForm.jsx",
                                                lineNumber: 726,
                                                columnNumber: 17
                                            }, this),
                                            " Banking information is required to transfer funds and verify your identity."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LeadForm.jsx",
                                        lineNumber: 725,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 724,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                    label: "Bank Name",
                                    name: "bankName",
                                    value: formData.bankName,
                                    onChange: handleChange,
                                    error: errors.bankName,
                                    placeholder: "Bank of America",
                                    required: true,
                                    maxLength: 50
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 730,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                                    label: "Bank Routing Number (ABA)",
                                                    name: "bankABA",
                                                    type: "tel",
                                                    value: formData.bankABA,
                                                    onChange: handleChange,
                                                    error: errors.bankABA,
                                                    placeholder: "123456789",
                                                    required: true,
                                                    maxLength: 9
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 734,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-gray-500",
                                                    children: "9-digit routing number on your check"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 735,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 733,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                                    label: "Account Number",
                                                    name: "bankAccountNumber",
                                                    type: "tel",
                                                    value: formData.bankAccountNumber,
                                                    onChange: handleChange,
                                                    error: errors.bankAccountNumber,
                                                    placeholder: "1234567890",
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 739,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-gray-500",
                                                    children: "Account number on your check"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 740,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 738,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 732,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                            label: "Account Type",
                                            name: "bankAccountType",
                                            value: formData.bankAccountType,
                                            onChange: handleChange,
                                            error: errors.bankAccountType,
                                            options: [
                                                {
                                                    value: "",
                                                    label: "Select type"
                                                },
                                                {
                                                    value: "Checking",
                                                    label: "Checking"
                                                },
                                                {
                                                    value: "Savings",
                                                    label: "Savings"
                                                }
                                            ],
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 745,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                            label: "Months at Bank",
                                            name: "monthsAtBank",
                                            value: formData.monthsAtBank,
                                            onChange: handleChange,
                                            error: errors.monthsAtBank,
                                            options: [
                                                {
                                                    value: "",
                                                    label: "Select months"
                                                },
                                                {
                                                    value: "1",
                                                    label: "Less than 3 months"
                                                },
                                                {
                                                    value: "6",
                                                    label: "3-6 months"
                                                },
                                                {
                                                    value: "12",
                                                    label: "6-12 months"
                                                },
                                                {
                                                    value: "24",
                                                    label: "1-2 years"
                                                },
                                                {
                                                    value: "36",
                                                    label: "2+ years"
                                                }
                                            ],
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 759,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 744,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    label: "Do you have a Debit Card?",
                                    name: "debitCard",
                                    value: formData.debitCard,
                                    onChange: handleChange,
                                    error: errors.debitCard,
                                    options: [
                                        {
                                            value: "yes",
                                            label: "Yes"
                                        },
                                        {
                                            value: "no",
                                            label: "No"
                                        }
                                    ],
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 777,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "border-t pt-6 mt-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                            className: "text-lg font-semibold text-gray-800 mb-4",
                                            children: "Driver's License Information"
                                        }, void 0, false, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 791,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["TextInput"], {
                                                    label: "Driver's License Number",
                                                    name: "driversLicense",
                                                    value: formData.driversLicense,
                                                    onChange: handleChange,
                                                    error: errors.driversLicense,
                                                    placeholder: "D1234567",
                                                    required: true,
                                                    maxLength: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 794,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                                    label: "License State",
                                                    name: "driversLicenseState",
                                                    value: formData.driversLicenseState,
                                                    onChange: handleChange,
                                                    error: errors.driversLicenseState,
                                                    options: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$formHelpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["US_STATES"],
                                                    required: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/LeadForm.jsx",
                                                    lineNumber: 796,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/LeadForm.jsx",
                                            lineNumber: 793,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 790,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 721,
                            columnNumber: 11
                        }, this),
                        currentStep === 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-6 animate-fadeIn",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold text-gray-800 mb-6",
                                    children: "Additional Information"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 805,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    label: "Best Time to Call",
                                    name: "callTime",
                                    value: formData.callTime,
                                    onChange: handleChange,
                                    error: errors.callTime,
                                    options: [
                                        {
                                            value: "anytime",
                                            label: "Anytime"
                                        },
                                        {
                                            value: "morning",
                                            label: "Morning (8am-12pm)"
                                        },
                                        {
                                            value: "afternoon",
                                            label: "Afternoon (12pm-5pm)"
                                        },
                                        {
                                            value: "evening",
                                            label: "Evening (5pm-9pm)"
                                        }
                                    ],
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 807,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                    label: "Reason for Loan (Optional)",
                                    name: "loan_reason",
                                    value: formData.loan_reason,
                                    onChange: handleChange,
                                    options: [
                                        {
                                            value: "",
                                            label: "Select reason"
                                        },
                                        {
                                            value: "debt_consolidation",
                                            label: "Debt Consolidation"
                                        },
                                        {
                                            value: "credit_card",
                                            label: "Credit Card"
                                        },
                                        {
                                            value: "home_improvement",
                                            label: "Home Improvement"
                                        },
                                        {
                                            value: "student_loan",
                                            label: "Student Loan Consolidation"
                                        },
                                        {
                                            value: "major_purchase",
                                            label: "Major Purchase"
                                        },
                                        {
                                            value: "auto_repair",
                                            label: "Car/Auto Repair"
                                        },
                                        {
                                            value: "green_loan",
                                            label: "Green Loan"
                                        },
                                        {
                                            value: "business",
                                            label: "Business"
                                        },
                                        {
                                            value: "vacation",
                                            label: "Vacation"
                                        },
                                        {
                                            value: "wedding",
                                            label: "Wedding"
                                        },
                                        {
                                            value: "relocation",
                                            label: "Relocation"
                                        },
                                        {
                                            value: "medical",
                                            label: "Medical Expenses"
                                        },
                                        {
                                            value: "household",
                                            label: "Household Expenses"
                                        },
                                        {
                                            value: "emergency",
                                            label: "Emergency"
                                        },
                                        {
                                            value: "other",
                                            label: "Other"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 822,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["SelectInput"], {
                                    label: "Credit Rating (Optional)",
                                    name: "credit_type",
                                    value: formData.credit_type,
                                    onChange: handleChange,
                                    options: [
                                        {
                                            value: "",
                                            label: "Select credit rating"
                                        },
                                        {
                                            value: "excellent",
                                            label: "Excellent (720+)"
                                        },
                                        {
                                            value: "verygood",
                                            label: "Very Good (690-719)"
                                        },
                                        {
                                            value: "good",
                                            label: "Good (660-689)"
                                        },
                                        {
                                            value: "fair",
                                            label: "Fair (620-659)"
                                        },
                                        {
                                            value: "poor",
                                            label: "Poor (580-619)"
                                        },
                                        {
                                            value: "verypoor",
                                            label: "Very Poor (below 580)"
                                        }
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 847,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    label: "Do you own a car?",
                                    name: "ownCar",
                                    value: formData.ownCar,
                                    onChange: handleChange,
                                    error: errors.ownCar,
                                    options: [
                                        {
                                            value: "yes",
                                            label: "Yes"
                                        },
                                        {
                                            value: "no",
                                            label: "No"
                                        }
                                    ],
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 863,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FormInput$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["RadioGroup"], {
                                    label: "Are you active military?",
                                    name: "activeMilitary",
                                    value: formData.activeMilitary,
                                    onChange: handleChange,
                                    error: errors.activeMilitary,
                                    options: [
                                        {
                                            value: "yes",
                                            label: "Yes"
                                        },
                                        {
                                            value: "no",
                                            label: "No"
                                        }
                                    ],
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 876,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-blue-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Almost done!"
                                            }, void 0, false, {
                                                fileName: "[project]/components/LeadForm.jsx",
                                                lineNumber: 891,
                                                columnNumber: 17
                                            }, this),
                                            " By clicking Submit, you agree to our terms and authorize lenders to contact you regarding your loan request."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/LeadForm.jsx",
                                        lineNumber: 890,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 889,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 804,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex justify-between mt-2 pt-4",
                            children: [
                                currentStep > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleBack,
                                    className: "px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer",
                                    children: "← Back"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 900,
                                    columnNumber: 13
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {}, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 904,
                                    columnNumber: 13
                                }, this),
                                currentStep < 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleNext,
                                    className: "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer",
                                    children: "Next →"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 908,
                                    columnNumber: 13
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    className: "px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer disabled:hover:bg-gray-400 text-sm md:text-base",
                                    children: loading ? "Submitting..." : "Submit Application"
                                }, void 0, false, {
                                    fileName: "[project]/components/LeadForm.jsx",
                                    lineNumber: 916,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/LeadForm.jsx",
                            lineNumber: 898,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 527,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 text-center",
                        children: "🔒 Your information is encrypted and secure. By submitting this form, you consent to be contacted by lenders regarding your loan request and agree to our terms of service."
                    }, void 0, false, {
                        fileName: "[project]/components/LeadForm.jsx",
                        lineNumber: 929,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/LeadForm.jsx",
                    lineNumber: 928,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/LeadForm.jsx",
            lineNumber: 503,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/LeadForm.jsx",
        lineNumber: 502,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = EnhancedLeadForm;
}),
"[project]/pages/form.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LeadForm$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/LeadForm.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
;
const Form = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$LeadForm$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/pages/form.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/pages/form.jsx",
        lineNumber: 6,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Form;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4242d6f2._.js.map