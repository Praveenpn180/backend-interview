// ** Models
const { BusinessModel, UserModel } = require('../models');

// ** Helpers
const logger = require('../helpers/logger');

class BusinessService {
  constructor() {
    logger.info('BusinessService');
  }

  async getBusinessListViaBusinesses() {

    const businesses =await BusinessModel.aggregate([
      {
        '$lookup': {
          'from': 'UserMaster', 
          'localField': '_id', 
          'foreignField': 'businessId', 
          'as': 'result'
        }
      }, {
        '$project': {
          'businessName': 1, 
          'userCount': {
            '$size': '$result'
          }, 
          '_id': 0
        }
      }
    ])
    return businesses;
  }

  async getBusinessListViaUsers() {

    const businesses = await UserModel.aggregate([
      {
        '$group': {
          '_id': '$businessId', 
          'userCount': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'BusinessMaster', 
          'localField': '_id', 
          'foreignField': '_id', 
          'as': 'result'
        }
      }, {
        '$unwind': {
          'path': '$result'
        }
      }, {
        '$project': {
          'userCount': 1, 
          '_id': 0, 
          'businessName': '$result.businessName'
        }
      }
    ])
    return businesses;
  }
}

module.exports = BusinessService;
