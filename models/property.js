const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const propertySchema = new Schema({

    title:{
        type: String,
        required: [true, "Property title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Property description is required"],
        trim: true,
    },
    location: {
        type: String,
        required: [true, "Property location is required"],
        trim: true,
    },
    bedroom: {
        type: Number,
        required: [true, "Number of bedrooms is required"],
        min: [1, "At least one bedroom is required"],
    },
    livingRoom: {
        type: Number,
        required: [true, "Number of living rooms is required"],
        min: [1, "At least one living room is required"],
    },
    kitchen: {
        type: Number,
        required: [true, "Number of kitchens is required"],
        min: [1, "At least one kitchen is required"],
    },
    toilet: {
        type: Number,
        required: [true, "Number of toilets is required"],
        min: [1, "At least one toilet is required"],
    },
    price: {
        type: Number,
        required: [true, "Property price is required"],
        min: [0, "Price cannot be negative"],
    },  
    paymentPeriod: {
        type: String,
        enum: ["monthly", "yearly","weekly"],
        required: [true, "Payment period is required"],
    },
    images: [string], // Array of image URLs
    avaliablity : {
        type: String,
        enum: ["available", "rented"],
        default: "available",
    },
   landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Landlord is required"],
   }
}, { timestamps: true });





const PROPERTY = mongoose.model("property", propertySchema);
module.exports = PROPERTY;