const mongoose = require('mongoose');

const { Schema, Types, model } = mongoose;

const OnBoardSchema = new Schema(
    {  sponsorBusiness:{type: Types.ObjectId , ref:"Business"},
        onBoardBusiness: [{type: Types.ObjectId , ref:"Business"}]
    }
)

const BusinessSchema = new Schema(
    
    {
    businessName:{type : String , ref:"BusinessOnBoard"}, 
   }

)
const BusinessModel = model(BusinessSchema, "Business")
const BusinessOnBoard = model(OnBoardSchema, "BusinessOnBoard")

module.exports =  {BusinessModel , BusinessOnBoard}

