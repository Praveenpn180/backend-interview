const mongoose = require('mongoose');

const { Schema, Types, model } = mongoose;

const CountrySchema = new Schema(
    {  
        countryName: {type:String}
    }
)
const StateSchema = new Schema(
    {  
        stateName: {type:String},
        country: {type:Types.ObjectId ,ref:"Country"}
    }
)
const CitySchema = new Schema(
    {  
        cityName: {type:String},
        state: {type: Types.ObjectId , ref :"State"},
        country: {type:Types.ObjectId ,ref:"Country"}
    }
)
const ZipcodeSchema = new Schema(
    {  
        zipCode: {type:String},
        city: {type:Types.ObjectId , ref:"city"},
        state: {type: Types.ObjectId , ref :"State"},
        country: {type:Types.ObjectId ,ref:"Country"}
    }
)


const CountryModel = model(CountrySchema, "Country")
const StateModel = model(StateSchema, "State")
const CityModel = model(CitySchema, "City")
const ZipcodeModel = model(ZipcodeSchema, "Zipcode")

module.exports =  {CityModel,CountryModel,StateModel,ZipcodeModel}

