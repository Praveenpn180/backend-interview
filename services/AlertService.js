// ** Models
const { AlertModel, MonitoringAlertSeverityModel } = require('../models');

// ** Helpers
const logger = require('../helpers/logger');

class AlertService {
  constructor() {
    logger.info('AlertService');
  }

  async getAlertCountViaAlerts() {

    const alertCount = await AlertModel.aggregate([
      {
        '$group': {
          '_id': '$type', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'LookupMaster', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'result'
        }
      }, {
        '$unwind': {
          'path': '$result'
        }
      }, {
        '$lookup': {
          'from': 'LookupMaster', 
          'localField': 'result.severity', 
          'foreignField': '_id', 
          'as': 'result2'
        }
      }, {
        '$unwind': {
          'path': '$result2'
        }
      }, {
        '$project': {
          'count': 1, 
          'label': '$result2.label', 
          '_id': 0
        }
      }
    ])
    return alertCount;
  }

  async getAlertCountViaLookup() {
    const alertCount = await MonitoringAlertSeverityModel.aggregate([
      {
        '$lookup': {
          'from': 'LookupMaster', 
          'localField': '_id', 
          'foreignField': 'severity', 
          'as': 'monitoringAlert'
        }
      }, {
        '$unwind': {
          'path': '$monitoringAlert', 
          'preserveNullAndEmptyArrays': false
        }
      }, {
        '$lookup': {
          'from': 'AlertMaster', 
          'localField': 'monitoringAlert._id', 
          'foreignField': 'type', 
          'as': 'alertDetails'
        }
      }, {
        '$group': {
          '_id': '$label', 
          'count': {
            '$sum': {
              '$size': '$alertDetails'
            }
          }
        }
      }, {
        '$project': {
          'label': '$_id', 
          '_id': 0, 
          'count': 1
        }
      }
    ])
    return alertCount;
  }
}

module.exports = AlertService;
