import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    subject:{type:String, required: true, unique: true},
    description:{type:String, required: true, unique: true},
    status:{type:String, required: true, unique: true} ,
    student: { type: mongoose.Schema.Types.ObjectID, ref: "Student" ,required: true},

});

const Request = mongoose.model('Request', RequestSchema);
export default Request;
