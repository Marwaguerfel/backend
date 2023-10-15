import mongoose from 'mongoose';

const CertifSchema = new mongoose.Schema({
    name:{type:String, required: true, },
    description:{type:String, required: true, },
    status:{type:String, required: true, } ,
    student: { type: mongoose.Schema.Types.ObjectID, ref: "Student" ,required: true},

});

const Certif = mongoose.model('Certif', CertifSchema);
export default Certif;
