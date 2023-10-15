import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Request from '../models/requestModel.js';
import {isAuth} from '../utils.js';
import data from '../data.js'

const RequestRouter = express.Router();

RequestRouter.get('/seed',async (req, res) => {
  const createdRequests = await Request.insertMany(data.requests);
  res.send({createdRequests})
}
);


RequestRouter.post(
  "/add",
 // isAuth,
  expressAsyncHandler(async (req, res) => {
    const request = new Request({
       subject: req.body. subject,
      description: req.body.description,
      status :req.body.status,
      student:req.body.student,
    });
    const createRequest = await request.save();
    res.send({
      _id: createRequest._id,
      subject:createRequest.subject,
      description: createRequest.description,
      status :createRequest.status,
      student:createRequest.student,
      
    });
  })
);

RequestRouter.get(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id);
    if (request) {
      res.send(request);
    } else {
      res.status(404).send({ message: "Request Not Found" });
    }
  })
);

RequestRouter.get(
  "/",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const request = await Request.find();
    res.send({ request });
  })
);

RequestRouter.delete(
  "/:id",
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id);
    if (request) {
      await Request.deleteOne({ _id: request._id }); // Provide filter condition as an object
      res.send({ message: "Request Deleted" });
    } else {
      res.status(404).send({ message: "Request Not Found" });
    }
  })
);





RequestRouter.put(
  '/:id',
  //isAuth,
  expressAsyncHandler(async (req, res) => {
    const request = await Request.findById(req.params.id);
    if (request) {
      request.name = req.body.name || request.name;
      request.subject = req.body.subject || request.subject;
      request.description = req.body.description || request.description;
      request.status = req.body.status || request.status;
      request.student = req.body.student || request.student;
      const updatedRequest = await request.save();
      res.send({ message: 'Request Updated', request: updatedRequest });
    } else {
      res.status(404).send({ message: 'Request Not Found' });
    }
  })
);


export default RequestRouter;