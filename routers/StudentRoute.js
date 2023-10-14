import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Student from '../models/StudentModel.js';
import { generateToken,isAuth} from '../utils.js';
import data from '../data.js'


const StudentRouter = express.Router();

StudentRouter.get('/seed',async (req, res) => {
  const createdStudents = await Student.insertMany(data.students);
  res.send({createdStudents})
}
);



StudentRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findOne({ email: req.body.email });
    if (student) {
      if (bcrypt.compareSync(req.body.password, student.password)) {
        res.send({
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          token: generateToken(student),
          class: student.class,
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

StudentRouter.post(
  "/register",
   // isAuth, 
  expressAsyncHandler(async (req, res) => {
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      class:req.body.class,
    });
    
    const createdStudent = await student.save();
    res.send({
      _id: createdStudent._id,
      firstName: createdStudent.firstName,
      lastName: createdStudent.lastName,
      email: createdStudent.email,
      password: createdStudent.password,
      class: createdStudent.class,
      token: generateToken(createdStudent),
    });
  })
);

StudentRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send({ message: "student Not Found" });
    }
  })
);

StudentRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const search=req.query.search||"";
    const skip =pageSize * (page - 1)
    if (search===""){
      const students = (await Student.find()
        .skip(skip)
        .limit(pageSize));;
         const count = await Student .count();
         const pages= Math.ceil(count/ pageSize);
         res.send({ page, pages ,pageSize,students})
    }else{
       const students = (await Student.find()
       ).filter(student => student.firstName.toLowerCase().includes(search.toLowerCase())); 
       
         res.send({students})

  }}
));



StudentRouter.delete(
  "/:id",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
      await Student.deleteOne({ _id: student._id }); // Delete the document
      res.send({ message: "Student Deleted", student: student });
    } else {
      res.status(404).send({ message: "Student Not Found" });
    }
  })
);




StudentRouter.put(
  '/:id',
 // isAuth,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
      student.firstName = req.body.firstName || student.firstName;
      student.lastName = req.body.lastName || student.lastName;
      student.email = req.body.email || student.email;
      student.class=req.body.class || student.class;
      const updatedStudent = await student.save();
      res.send({ message: 'student Updated', student: updatedStudent });
    } else {
      res.status(404).send({ message: 'student Not Found' });
    }
  })
);

StudentRouter.put(
  '/profile',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const student = await Student.findById(req.student._id);
    if (student) {
      student.firstName = req.body.firstName || student.firstName;
      student.lastName = req.body.lastName || student.lastName;
      student.email = req.body.email || student.email;
      student.class=req.body.class || student.class;
      if (req.body.password) {
        student.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedStudent = await student.save();
      res.send({
        _id: updatedStudent._id,
        firstName: updatedStudent.firstName,
        lastName: updatedStudent.lastName,
        email: updatedStudent.email,
        class: updatedStudent.class,
        token: generateToken(updatedStudent),
      });
    }
  })
);

export default StudentRouter;