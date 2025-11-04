// models/SoldLead.js
import mongoose from 'mongoose';

const soldLeadSchema = new mongoose.Schema({
  leadId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lead', 
    required: true 
  },
  
  // LeadsMarket Response - Result can be "1", "2", "4" or string values
  result: { 
    type: String, 
    required: true
    // Removed enum to allow any value (1, 2, 4, Accepted, Rejected, Duplicate, Errors)
  },
  
  campaignId: String,
  leadsMarketLeadId: String,
  price: Number,
  redirectUrl: String,
  
  // Error details (if any)
  errors: [{
    field: String,
    value: String,
    description: String
  }],
  
  messages: [String],
  
  // Raw response
  rawResponse: mongoose.Schema.Types.Mixed,
  
  // Metadata
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.SoldLead || mongoose.model('SoldLead', soldLeadSchema);