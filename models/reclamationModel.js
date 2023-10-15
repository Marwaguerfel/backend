import mongoose from 'mongoose';

const ReclamationSchema = new mongoose.Schema({
    subject:{type:String, required: true, },
    description:{type:String, required: true, },
    status:{type:String, required: true, } ,
    student: { type: mongoose.Schema.Types.ObjectID, ref: "Student" ,required: true},

});

const Reclamation = mongoose.model('Reclamation', ReclamationSchema);
export default Reclamation;
