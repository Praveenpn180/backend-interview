// ** Models
const { AlertModel, MonitoringAlertSeverityModel } = require('../models');

// ** Helpers
const logger = require('../helpers/logger');

class AlertService {
  constructor() {
    logger.info('AlertService');
  }

  async getAlertCountViaAlerts() {
    // TODO: We need to group by 'type.severity' instead of 'type'
    const alertCount = await AlertModel.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'LookupMaster',
          localField: '_id',
          foreignField: '_id',
          as: 'monitoringAlert',
        },
      },
      {
        $unwind: { path: '$monitoringAlert' },
      },
      {
        $lookup: {
          from: 'LookupMaster',
          localField: 'monitoringAlert.severity',
          foreignField: '_id',
          as: 'monitoringAlertSeverity',
        },
      },
      {
        $unwind: { path: '$monitoringAlertSeverity' },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          label: '$monitoringAlertSeverity.label',
        },
      },
    ]);

    return alertCount;
  }

  async getAlertCountViaLookup() {
    // TODO: We need to aggregate via 'type.severity' instead of 'type'
    const alertCount = await MonitoringAlertSeverityModel.aggregate([
      {
        $lookup: {
          from: 'LookupMaster',
          localField: '_id',
          foreignField: 'severity',
          as: 'monitoringAlert',
        },
      },
      {
        $unwind: { path: '$monitoringAlert' },
      },
      {
        $lookup: {
          from: 'AlertMaster',
          localField: 'monitoringAlert._id',
          foreignField: 'type',
          as: 'alertDetails',
        },
      },
      {
        $group: {
          _id: '$label',
          count: { $sum: { $size: '$alertDetails' } },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          label: '$_id',
        },
      },
    ]);

    return alertCount;
  }
}

module.exports = AlertService;
