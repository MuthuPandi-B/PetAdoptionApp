import mongoose from "mongoose";
 const petSchema = new mongoose.Schema({
    petName: {
        type: String,
        required: true
    },
    petBreed:{
        type: String,
        required: true
    },
    petAge: {
        type: Number,
        required: true
    },
    petSize: {
        type: String,
        required: true  
    },
    petColour: {
        type: String,
        required: true
    },
    petGender: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    petLocation:{
        type: String,
        required: true
    },
    petMedicalhistory: {
        type: String,
        required: true
    },  
    createdAt: {
        type: Date,
        default: Date.now
    }
 })
 export default mongoose.model("Pet", petSchema);