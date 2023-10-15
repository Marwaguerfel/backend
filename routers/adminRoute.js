import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import { generateToken,isAuth} from '../utils.js';
import data from '../data.js'


const AdminRouter = express.Router();

AdminRouter.get('/seed',async (req, res) => {
  const createdAdmins = await Admin.insertMany(data.admins);
  res.send({createdAdmins})
}
);



AdminRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      if (bcrypt.compareSync(req.body.password, admin.password)) {
        res.send({
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          token: generateToken(admin),
          grade: admin.grade,
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

AdminRouter.post(
  "/register",
   // isAuth, 
  expressAsyncHandler(async (req, res) => {
    const admin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      grade:req.body.grade,
    });
    
    const createdAdmin = await admin.save();
    res.send({
      _id: createdAdmin._id,
      firstName: createdAdmin.firstName,
      lastName: createdAdmin.lastName,
      email: createdAdmin.email,
      password: createdAdmin.password,
      grade: createdAdmin.grade,
      token: generateToken(createdAdmin),
    });
  })
);

AdminRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      res.send(admin);
    } else {
      res.status(404).send({ message: "admin Not Found" });
    }
  })
);

AdminRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const search=req.query.search||"";
    const skip =pageSize * (page - 1)
    if (search===""){
      const admins = (await Admin.find()
        .skip(skip)
        .limit(pageSize));;
         const count = await Admin .count();
         const pages= Math.ceil(count/ pageSize);
         res.send({ page, pages ,pageSize,admins})
    }else{
       const admins = (await Admin.find()
       ).filter(admin => admin.firstName.toLowerCase().includes(search.toLowerCase())); 
       
         res.send({admins})

  }}
));



AdminRouter.delete(
  "/:id",
  // isAuth,
  expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      await Admin.deleteOne({ _id: admin._id }); // Delete the document
      res.send({ message: "Admin Deleted", admin: admin });
    } else {
      res.status(404).send({ message: "Admin Not Found" });
    }
  })
);




AdminRouter.put(
  '/:id',
 // isAuth,
  expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    if (admin) {
      admin.firstName = req.body.firstName || admin.firstName;
      admin.lastName = req.body.lastName || admin.lastName;
      admin.email = req.body.email || admin.email;
      admin.grade=req.body.grade || admin.grade;
      const updatedAdmin = await admin.save();
      res.send({ message: 'admin Updated', admin: updatedAdmin });
    } else {
      res.status(404).send({ message: 'admin Not Found' });
    }
  })
);

AdminRouter.put(
  '/profile',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);
    if (admin) {
      admin.firstName = req.body.firstName || admin.firstName;
      admin.lastName = req.body.lastName || admin.lastName;
      admin.email = req.body.email || admin.email;
      admin.grade=req.body.grade || admin.grade;
      if (req.body.password) {
        admin.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedAdmin = await admin.save();
      res.send({
        _id: updatedAdmin._id,
        firstName: updatedAdmin.firstName,
        lastName: updatedAdmin.lastName,
        email: updatedAdmin.email,
        grade: updatedAdmin.grade,
        token: generateToken(updatedAdmin),
      });
    }
  })
);

export default AdminRouter;