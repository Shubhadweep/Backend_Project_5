const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        require:true
    }
},{
    timestamps: true,
    versionKey:false
})

const autherizationModel = new mongoose.model("UserData",authSchema);
module.exports = autherizationModel;