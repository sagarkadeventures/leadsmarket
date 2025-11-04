// models/Lead.js
import mongoose from 'mongoose';
import klaviyoService from '../services/klaviyoService.js';

const leadSchema = new mongoose.Schema({
  // Personal Information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  
  // Date of Birth
  dobMonth: { type: Number, required: true },
  dobDay: { type: Number, required: true },
  dobYear: { type: Number, required: true },
  
  // Address
  address1: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  monthsAtAddress: { type: Number, required: true },
  residenceType: { type: String, required: true }, // Own/Rent
  
  // Financial
  requestedAmount: { type: Number, required: true },
  ssn: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  incomeType: { type: String, required: true },
  
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
  klaviyoProfileId: String,
  klaviyoSyncStatus: {
    type: String,
    enum: ['pending', 'synced', 'failed'],
    default: 'pending'
  },
  klaviyoSyncedAt: Date,
  klaviyoSyncError: String,
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware: Update the updatedAt field on save
leadSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware: Sync to Klaviyo after saving
leadSchema.post('save', async function(doc) {
  try {
    console.log('🔄 Post-save hook triggered for lead:', doc.email);
    
    // Only sync if not already synced or if data has changed
    if (doc.klaviyoSyncStatus !== 'synced' || doc.isModified()) {
      console.log('📤 Syncing lead to Klaviyo...');
      
      const result = await klaviyoService.syncLeadToKlaviyo({
        email: doc.email,
        phone: doc.phone,
        firstName: doc.firstName,
        lastName: doc.lastName,
        address1: doc.address1,
        city: doc.city,
        state: doc.state,
        zipCode: doc.zipCode,
        residenceType: doc.residenceType,
        monthsAtAddress: doc.monthsAtAddress,
        requestedAmount: doc.requestedAmount,
        monthlyIncome: doc.monthlyIncome,
        incomeType: doc.incomeType,
        employerName: doc.employerName,
        monthsEmployed: doc.monthsEmployed,
        payFrequency: doc.payFrequency,
        bankName: doc.bankName,
        bankAccountType: doc.bankAccountType,
        monthsAtBank: doc.monthsAtBank,
        loanPurpose: doc.loanPurpose,
        creditRating: doc.creditRating,
        bestTimeToCall: doc.bestTimeToCall,
        dobMonth: doc.dobMonth,
        dobDay: doc.dobDay,
        dobYear: doc.dobYear,
        trackingId: doc.trackingId,
        clientIP: doc.clientIP,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      });

      if (result.success) {
        // Update the document with Klaviyo sync status
        await mongoose.model('Lead').updateOne(
          { _id: doc._id },
          {
            $set: {
              klaviyoProfileId: result.profileId,
              klaviyoSyncStatus: 'synced',
              klaviyoSyncedAt: new Date(),
              klaviyoSyncError: null
            }
          }
        );
        console.log('✅ Lead synced to Klaviyo successfully');
      } else {
        // Update with error status
        await mongoose.model('Lead').updateOne(
          { _id: doc._id },
          {
            $set: {
              klaviyoSyncStatus: 'failed',
              klaviyoSyncError: result.error
            }
          }
        );
        console.error('❌ Failed to sync lead to Klaviyo:', result.error);
      }
    }
  } catch (error) {
    console.error('❌ Error in Klaviyo sync hook:', error.message);
    // Don't throw error to prevent lead save from failing
  }
});

// Middleware: Sync to Klaviyo after update
leadSchema.post('findOneAndUpdate', async function(doc) {
  if (doc) {
    try {
      console.log('🔄 Post-update hook triggered for lead:', doc.email);
      
      const result = await klaviyoService.syncLeadToKlaviyo({
        email: doc.email,
        phone: doc.phone,
        firstName: doc.firstName,
        lastName: doc.lastName,
        address1: doc.address1,
        city: doc.city,
        state: doc.state,
        zipCode: doc.zipCode,
        residenceType: doc.residenceType,
        monthsAtAddress: doc.monthsAtAddress,
        requestedAmount: doc.requestedAmount,
        monthlyIncome: doc.monthlyIncome,
        incomeType: doc.incomeType,
        employerName: doc.employerName,
        monthsEmployed: doc.monthsEmployed,
        payFrequency: doc.payFrequency,
        bankName: doc.bankName,
        bankAccountType: doc.bankAccountType,
        monthsAtBank: doc.monthsAtBank,
        loanPurpose: doc.loanPurpose,
        creditRating: doc.creditRating,
        bestTimeToCall: doc.bestTimeToCall,
        dobMonth: doc.dobMonth,
        dobDay: doc.dobDay,
        dobYear: doc.dobYear,
        trackingId: doc.trackingId,
        clientIP: doc.clientIP,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      });

      if (result.success) {
        await mongoose.model('Lead').updateOne(
          { _id: doc._id },
          {
            $set: {
              klaviyoProfileId: result.profileId,
              klaviyoSyncStatus: 'synced',
              klaviyoSyncedAt: new Date(),
              klaviyoSyncError: null
            }
          }
        );
        console.log('✅ Lead update synced to Klaviyo successfully');
      } else {
        await mongoose.model('Lead').updateOne(
          { _id: doc._id },
          {
            $set: {
              klaviyoSyncStatus: 'failed',
              klaviyoSyncError: result.error
            }
          }
        );
        console.error('❌ Failed to sync lead update to Klaviyo:', result.error);
      }
    } catch (error) {
      console.error('❌ Error in Klaviyo update sync hook:', error.message);
    }
  }
});

// Static method: Manual sync for existing leads
leadSchema.statics.syncToKlaviyo = async function(leadId) {
  try {
    const lead = await this.findById(leadId);
    if (!lead) {
      throw new Error('Lead not found');
    }

    const result = await klaviyoService.syncLeadToKlaviyo({
      email: lead.email,
      phone: lead.phone,
      firstName: lead.firstName,
      lastName: lead.lastName,
      address1: lead.address1,
      city: lead.city,
      state: lead.state,
      zipCode: lead.zipCode,
      residenceType: lead.residenceType,
      monthsAtAddress: lead.monthsAtAddress,
      requestedAmount: lead.requestedAmount,
      monthlyIncome: lead.monthlyIncome,
      incomeType: lead.incomeType,
      employerName: lead.employerName,
      monthsEmployed: lead.monthsEmployed,
      payFrequency: lead.payFrequency,
      bankName: lead.bankName,
      bankAccountType: lead.bankAccountType,
      monthsAtBank: lead.monthsAtBank,
      loanPurpose: lead.loanPurpose,
      creditRating: lead.creditRating,
      bestTimeToCall: lead.bestTimeToCall,
      dobMonth: lead.dobMonth,
      dobDay: lead.dobDay,
      dobYear: lead.dobYear,
      trackingId: lead.trackingId,
      clientIP: lead.clientIP,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt
    });

    if (result.success) {
      lead.klaviyoProfileId = result.profileId;
      lead.klaviyoSyncStatus = 'synced';
      lead.klaviyoSyncedAt = new Date();
      lead.klaviyoSyncError = null;
      await lead.save();
    }

    return result;
  } catch (error) {
    console.error('Error in manual Klaviyo sync:', error);
    throw error;
  }
};

// Static method: Bulk sync all unsynced leads
leadSchema.statics.syncAllToKlaviyo = async function() {
  try {
    const unsyncedLeads = await this.find({
      $or: [
        { klaviyoSyncStatus: 'pending' },
        { klaviyoSyncStatus: 'failed' },
        { klaviyoSyncStatus: { $exists: false } }
      ]
    });

    console.log(`Found ${unsyncedLeads.length} leads to sync`);

    const leadsData = unsyncedLeads.map(lead => ({
      _id: lead._id,
      email: lead.email,
      phone: lead.phone,
      firstName: lead.firstName,
      lastName: lead.lastName,
      address1: lead.address1,
      city: lead.city,
      state: lead.state,
      zipCode: lead.zipCode,
      residenceType: lead.residenceType,
      monthsAtAddress: lead.monthsAtAddress,
      requestedAmount: lead.requestedAmount,
      monthlyIncome: lead.monthlyIncome,
      incomeType: lead.incomeType,
      employerName: lead.employerName,
      monthsEmployed: lead.monthsEmployed,
      payFrequency: lead.payFrequency,
      bankName: lead.bankName,
      bankAccountType: lead.bankAccountType,
      monthsAtBank: lead.monthsAtBank,
      loanPurpose: lead.loanPurpose,
      creditRating: lead.creditRating,
      bestTimeToCall: lead.bestTimeToCall,
      dobMonth: lead.dobMonth,
      dobDay: lead.dobDay,
      dobYear: lead.dobYear,
      trackingId: lead.trackingId,
      clientIP: lead.clientIP,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt
    }));

    const results = await klaviyoService.bulkSyncLeads(leadsData);

    // Update sync status for all leads
    for (const leadData of leadsData) {
      await this.updateOne(
        { _id: leadData._id },
        {
          $set: {
            klaviyoSyncStatus: 'synced',
            klaviyoSyncedAt: new Date()
          }
        }
      );
    }

    return results;
  } catch (error) {
    console.error('Error in bulk Klaviyo sync:', error);
    throw error;
  }
};

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);