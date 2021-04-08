const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    
   email:{type:String,required:true,unique:true},
   sheetId:{type:String,required:true,unique:true},
   refreshToken:{type:String,required:true}
   
},{timestamps:true})

const ManagerSchema = mongoose.model('SheetIdManager',managerSchema);
module.exports=ManagerSchema;