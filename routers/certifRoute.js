import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Certif from '../models/certifModel.js';
import {isAuth} from '../utils.js';
import data from '../data.js'

const CertifRouter = express.Router();

CertifRouter.get('/seed',async (req, res) => {
  const createdCertifs = await Certif.insertMany(data.certifs);
  res.send({createdCertifs})
}
);


CertifRouter.post(
  "/add",
 // isAuth,
  expressAsyncHandler(async (req, res) => {
    const certif = new Certif({
        name: req.body. name,
        description: req.body.description,
        status :req.body.status,
        student:req.body.student,
    });
    const createCertif = await certif.save();
    res.send({
      _id: createCertif._id,
      name:createCertif.name,
      description: createCertif.description,
      status :createCertif.status,
      student:createCertif.student,
      
    });
  })
);

CertifRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const certif = await Certif.findById(req.params.id);
    if (certif) {
      res.send(certif);
    } else {
      res.status(404).send({ message: "certif Not Found" });
    }
  })
);

CertifRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const certif = await Certif.find();
    res.send({ certif });
  })
);

CertifRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const certif = await Certif.findById(req.params.id);
    if (certif) {
      await certif.deleteOne({ _id: certif._id }); // Provide filter condition as an object
      res.send({ message: "certif Deleted" });
    } else {
      res.status(404).send({ message: "certif Not Found" });
    }
  })
);





CertifRouter.put(
  '/:id',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const certif = await Certif.findById(req.params.id);
    if (certif) {
      certif.name = req.body.name || certif.name;
      certif.name = req.body.name || certif.name;
      certif.description = req.body.description || certif.description;
      certif.status = req.body.status || certif.status;
      certif.student = req.body.student || certif.student;
      const updatedcertif = await certif.save();
      res.send({ message: 'certif Updated', certif: updatedcertif });
    } else {
      res.status(404).send({ message: 'certif Not Found' });
    }
  })
);


export default CertifRouter;