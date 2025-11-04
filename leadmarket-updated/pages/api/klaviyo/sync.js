// pages/api/klaviyo/sync.js
import connectDB from '../../../lib/db';
import Lead from '../../../models/Lead';
import klaviyoService from '../../../services/klaviyoService';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      const { action, leadId, leadIds } = req.body;

      switch (action) {
        case 'sync_single':
          // Sync a single lead
          if (!leadId) {
            return res.status(400).json({
              success: false,
              message: 'Lead ID is required'
            });
          }

          const result = await Lead.syncToKlaviyo(leadId);
          
          return res.status(200).json({
            success: true,
            message: 'Lead synced successfully',
            data: result
          });

        case 'sync_multiple':
          // Sync multiple specific leads
          if (!leadIds || !Array.isArray(leadIds)) {
            return res.status(400).json({
              success: false,
              message: 'Lead IDs array is required'
            });
          }

          const results = [];
          for (const id of leadIds) {
            try {
              const syncResult = await Lead.syncToKlaviyo(id);
              results.push({
                leadId: id,
                success: syncResult.success,
                profileId: syncResult.profileId
              });
            } catch (error) {
              results.push({
                leadId: id,
                success: false,
                error: error.message
              });
            }
          }

          return res.status(200).json({
            success: true,
            message: 'Batch sync completed',
            data: results
          });

        case 'sync_all':
          // Sync all unsynced leads
          const bulkResult = await Lead.syncAllToKlaviyo();
          
          return res.status(200).json({
            success: true,
            message: 'Bulk sync completed',
            data: bulkResult
          });

        case 'track_event':
          // Track a custom event
          const { email, eventName, properties } = req.body;
          
          if (!email || !eventName) {
            return res.status(400).json({
              success: false,
              message: 'Email and event name are required'
            });
          }

          const tracked = await klaviyoService.trackEvent(email, eventName, properties || {});
          
          return res.status(200).json({
            success: tracked,
            message: tracked ? 'Event tracked successfully' : 'Failed to track event'
          });

        default:
          return res.status(400).json({
            success: false,
            message: 'Invalid action'
          });
      }

    } catch (error) {
      console.error('Klaviyo sync API error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  } else if (req.method === 'GET') {
    // Get sync status
    try {
      const stats = await Lead.aggregate([
        {
          $group: {
            _id: '$klaviyoSyncStatus',
            count: { $sum: 1 }
          }
        }
      ]);

      const statusMap = {
        pending: 0,
        synced: 0,
        failed: 0
      };

      stats.forEach(stat => {
        if (stat._id) {
          statusMap[stat._id] = stat.count;
        } else {
          statusMap.pending += stat.count;
        }
      });

      return res.status(200).json({
        success: true,
        data: statusMap
      });

    } catch (error) {
      console.error('Error getting sync status:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
}