// services/klaviyoService.js
import axios from 'axios';

class KlaviyoService {
  constructor() {
    this.privateKey = process.env.KLAVIYO_PRIVATE_KEY || 'pk_54e1768b846d819e1eaafee5d8c6ae169e';
    this.listId = process.env.KLAVIYO_LIST_ID || 'WgUpfq';
    this.baseUrl = 'https://a.klaviyo.com/api';
    this.revision = '2025-10-15';
  }

  /**
   * Create or update a profile in Klaviyo
   * @param {Object} leadData - The lead data from your database
   * @returns {Promise<string>} - Profile ID
   */
  async createOrUpdateProfile(leadData) {
    try {
      const profilePayload = {
        data: {
          type: 'profile',
          attributes: {
            email: leadData.email,
            phone_number: leadData.phone,
            first_name: leadData.firstName,
            last_name: leadData.lastName,
            properties: {
              // Address Information
              Address: leadData.address1,
              City: leadData.city,
              State: leadData.state,
              ZipCode: leadData.zipCode,
              ResidenceType: leadData.residenceType,
              MonthsAtAddress: leadData.monthsAtAddress,
              
              // Financial Information
              RequestedAmount: leadData.requestedAmount,
              MonthlyIncome: leadData.monthlyIncome,
              IncomeType: leadData.incomeType,
              
              // Employment Information
              EmployerName: leadData.employerName || '',
              MonthsEmployed: leadData.monthsEmployed || 0,
              PayFrequency: leadData.payFrequency || '',
              
              // Banking Information
              BankName: leadData.bankName || '',
              BankAccountType: leadData.bankAccountType || '',
              MonthsAtBank: leadData.monthsAtBank || 0,
              
              // Additional Information
              LoanPurpose: leadData.loanPurpose || '',
              CreditRating: leadData.creditRating || '',
              BestTimeToCall: leadData.bestTimeToCall || '',
              
              // Date of Birth
              DOB: `${leadData.dobMonth}/${leadData.dobDay}/${leadData.dobYear}`,
              
              // Metadata
              Source: 'LeadsMarket Form',
              TrackingId: leadData.trackingId,
              ClientIP: leadData.clientIP,
              CreatedAt: leadData.createdAt || new Date().toISOString(),
              UpdatedAt: leadData.updatedAt || new Date().toISOString()
            }
          }
        }
      };

      console.log('📤 Creating/Updating Klaviyo profile for:', leadData.email);

      const response = await axios.post(
        `${this.baseUrl}/profile-import/`,
        profilePayload,
        {
          headers: {
            'Authorization': `Klaviyo-API-Key ${this.privateKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'revision': this.revision
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        const profileId = response.data.data.id;
        console.log('✅ Profile created/updated successfully. Profile ID:', profileId);
        return profileId;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ Error creating/updating Klaviyo profile:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Add a profile to a specific list
   * @param {string} profileId - The Klaviyo profile ID
   * @returns {Promise<boolean>}
   */
  async addProfileToList(profileId) {
    try {
      const listPayload = {
        data: [
          {
            type: 'profile',
            id: profileId
          }
        ]
      };

      console.log('📤 Adding profile to list:', this.listId);

      const response = await axios.post(
        `${this.baseUrl}/lists/${this.listId}/relationships/profiles`,
        listPayload,
        {
          headers: {
            'Authorization': `Klaviyo-API-Key ${this.privateKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'revision': this.revision
          }
        }
      );

      if (response.status === 204) {
        console.log('✅ Profile added to list successfully');
        return true;
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ Error adding profile to list:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Sync lead to Klaviyo (create profile and add to list)
   * @param {Object} leadData - The lead data from your database
   * @returns {Promise<Object>} - Result object
   */
  async syncLeadToKlaviyo(leadData) {
    try {
      console.log('🚀 Starting Klaviyo sync for lead:', leadData.email);

      // Step 1: Create or update the profile
      const profileId = await this.createOrUpdateProfile(leadData);

      // Step 2: Add the profile to the list
      await this.addProfileToList(profileId);

      console.log('✅ Lead successfully synced to Klaviyo');

      return {
        success: true,
        profileId: profileId,
        message: 'Lead synced to Klaviyo successfully'
      };

    } catch (error) {
      console.error('❌ Klaviyo sync failed:', error.message);
      
      return {
        success: false,
        error: error.message,
        message: 'Failed to sync lead to Klaviyo'
      };
    }
  }

  /**
   * Bulk sync multiple leads to Klaviyo
   * @param {Array} leads - Array of lead data objects
   * @returns {Promise<Object>} - Summary of results
   */
  async bulkSyncLeads(leads) {
    const results = {
      total: leads.length,
      successful: 0,
      failed: 0,
      errors: []
    };

    console.log(`🚀 Starting bulk sync of ${leads.length} leads...`);

    for (const lead of leads) {
      try {
        await this.syncLeadToKlaviyo(lead);
        results.successful++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          email: lead.email,
          error: error.message
        });
      }

      // Add a small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`✅ Bulk sync complete. Success: ${results.successful}, Failed: ${results.failed}`);

    return results;
  }

  /**
   * Track a custom event for a profile
   * @param {string} email - Profile email
   * @param {string} eventName - Event name
   * @param {Object} properties - Event properties
   * @returns {Promise<boolean>}
   */
  async trackEvent(email, eventName, properties = {}) {
    try {
      const eventPayload = {
        data: {
          type: 'event',
          attributes: {
            profile: {
              email: email
            },
            metric: {
              name: eventName
            },
            properties: properties,
            time: new Date().toISOString()
          }
        }
      };

      const response = await axios.post(
        `${this.baseUrl}/events/`,
        eventPayload,
        {
          headers: {
            'Authorization': `Klaviyo-API-Key ${this.privateKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'revision': this.revision
          }
        }
      );

      if (response.status === 202) {
        console.log(`✅ Event "${eventName}" tracked for ${email}`);
        return true;
      }

      return false;

    } catch (error) {
      console.error('❌ Error tracking event:', error.response?.data || error.message);
      return false;
    }
  }
}

export default new KlaviyoService();