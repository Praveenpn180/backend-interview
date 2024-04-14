// ** Models
const { BusinessModel, UserModel } = require('../models');

// ** Helpers
const logger = require('../helpers/logger');

class BusinessService {
  constructor() {
    logger.info('BusinessService');
  }

  async getBusinessListViaBusinesses() {
    const businesses = await BusinessModel.aggregate([
      {
        $lookup: {
          from: 'UserMaster',
          localField: '_id',
          foreignField: 'businessId',
          as: 'users',
        },
      },
      {
        $project: {
          _id: 0,
          businessName: 1,
          userCount: { $size: '$users' },
        },
      },
    ]);

    return businesses;
  }

  async getBusinessListViaUsers() {
    const businesses = await UserModel.aggregate([
      {
        $group: {
          _id: '$businessId',
          userCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'BusinessMaster',
          localField: '_id',
          foreignField: '_id',
          as: 'business',
        },
      },
      {
        $unwind: { path: '$business' },
      },
      {
        $project: {
          _id: 0,
          businessName: '$business.businessName',
          userCount: 1,
        },
      },
    ]);

    return businesses;
  }
}

module.exports = BusinessService;
