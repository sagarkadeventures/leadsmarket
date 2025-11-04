// USA Phone validation
// USA Phone validation - Enhanced to match LeadsMarket requirements
export function isValidUSPhone(phone) {
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
    /^(\d)\1{9}$/, // All same digits like 1111111111
    /^1234567890$/, // Sequential
    /^0000000000$/, // All zeros
    /^0{10}$/,
  ];
  
  for (const pattern of invalidPatterns) {
    if (pattern.test(cleaned)) {
      return false;
    }
  }
  
  return true;
}

// USA ZIP code validation with real ZIP ranges
export function isValidUSZip(zip) {
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
    { min: 501, max: 544 },      // NY
    { min: 6001, max: 6928 },    // CT, MA, ME, NH, NJ, RI, VT
    { min: 7001, max: 8989 },    // NJ, NY, PA
    { min: 10001, max: 14975 },  // NY
    { min: 15001, max: 19640 },  // PA
    
    // Southeast
    { min: 20001, max: 20599 },  // DC
    { min: 20601, max: 21930 },  // MD
    { min: 22001, max: 24658 },  // VA
    { min: 25001, max: 26886 },  // WV
    { min: 27006, max: 28909 },  // NC
    { min: 29001, max: 29948 },  // SC
    { min: 30002, max: 31999 },  // GA
    { min: 32004, max: 34997 },  // FL
    { min: 35004, max: 36925 },  // AL
    { min: 37010, max: 38589 },  // TN
    { min: 38601, max: 39776 },  // MS
    { min: 40003, max: 42788 },  // KY
    
    // Midwest
    { min: 43001, max: 45999 },  // OH
    { min: 46001, max: 47997 },  // IN
    { min: 48001, max: 49971 },  // MI
    { min: 50001, max: 52809 },  // IA
    { min: 53001, max: 54990 },  // WI
    { min: 55001, max: 56763 },  // MN
    { min: 57001, max: 57799 },  // SD
    { min: 58001, max: 58856 },  // ND
    { min: 59001, max: 59937 },  // MT
    { min: 60001, max: 62999 },  // IL
    { min: 63001, max: 65899 },  // MO
    { min: 66002, max: 67954 },  // KS
    { min: 68001, max: 69367 },  // NE
    
    // Southwest
    { min: 70001, max: 71497 },  // LA
    { min: 71601, max: 72959 },  // AR
    { min: 73001, max: 74966 },  // OK
    { min: 75001, max: 79999 },  // TX
    { min: 85001, max: 86556 },  // AZ
    { min: 87001, max: 88441 },  // NM
    
    // West
    { min: 80001, max: 81658 },  // CO
    { min: 82001, max: 83128 },  // WY
    { min: 83201, max: 83877 },  // ID
    { min: 84001, max: 84791 },  // UT
    { min: 88901, max: 89883 },  // NV
    { min: 90001, max: 96162 },  // CA
    { min: 96701, max: 96898 },  // HI
    { min: 97001, max: 97920 },  // OR
    { min: 98001, max: 99403 },  // WA
    { min: 99501, max: 99950 },  // AK
  ];
  
  // Check if ZIP falls within any valid range
  const isValid = validRanges.some(range => 
    zipNum >= range.min && zipNum <= range.max
  );
  
  return isValid;
}

// SSN validation
export function isValidSSN(ssn) {
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