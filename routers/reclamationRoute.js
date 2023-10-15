import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Reclamation from '../models/reclamationModel.js';
import {isAuth} from '../utils.js';
import data from '../data.js'

const ReclamationRouter = express.Router();

ReclamationRouter.get('/seed',async (req, res) => {
  const createdReclamations = await Reclamation.insertMany(data.reclamations);
  res.send({createdReclamations})
}
);


ReclamationRouter.post(
  "/add",
 // isAuth,
  expressAsyncHandler(async (req, res) => {
    const reclamation = new Reclamation({
        subject: req.body. subject,
        description: req.body.description,
        status :req.body.status,
        student:req.body.student,
    });
    const createReclamation = await reclamation.save();
    res.send({
      _id: createReclamation._id,
      subject:createReclamation.subject,
      description: createReclamation.description,
      status :createReclamation.status,
      student:createReclamation.student,
      
    });
  })
);

ReclamationRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const reclamation = await Reclamation.findById(req.params.id);
    if (reclamation) {
      res.send(reclamation);
    } else {
      res.status(404).send({ message: "Reclamation Not Found" });
    }
  })
);

ReclamationRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const reclamation = await Reclamation.find();
    res.send({ reclamation });
  })
);

ReclamationRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const reclamation = await Reclamation.findById(req.params.id);
    if (reclamation) {
      await reclamation.deleteOne({ _id: reclamation._id }); // Provide filter condition as an object
      res.send({ message: "Reclamation Deleted" });
    } else {
      res.status(404).send({ message: "Reclamation Not Found" });
    }
  })
);





ReclamationRouter.put(
  '/:id',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const reclamation = await Reclamation.findById(req.params.id);
    if (reclamation) {
      reclamation.name = req.body.name || reclamation.name;
      reclamation.subject = req.body.subject || reclamation.subject;
      reclamation.description = req.body.description || reclamation.description;
      reclamation.status = req.body.status || reclamation.status;
      reclamation.student = req.body.student || reclamation.student;
      const updatedReclamation = await reclamation.save();
      res.send({ message: 'Reclamation Updated', reclamation: updatedReclamation });
    } else {
      res.status(404).send({ message: 'Reclamation Not Found' });
    }
  })
);


export default ReclamationRouter;