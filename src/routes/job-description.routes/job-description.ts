import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import SuccessMessages from '../../enums/success';
import JobDescriptionUpdate from '../../models/types/job-description.types/job-description-update.type';
import JobDescription from '../../models/types/job-description.types/job-description.type';
import Thread from '../../models/types/thread.types/thread.type';
import JobDescriptionService from '../../services/job-description.services/job-description.service';
import ResponseAdapter from '../../utils/response-adapter';

const router = Router();
const jobDescriptionService = new JobDescriptionService();
const responseAdapter = new ResponseAdapter();

router.post(
  '',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const jobDescription: JobDescription = req.body;
    const response = await jobDescriptionService.createJobDescription(jobDescription);
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_REQUEST, response));
  }),
);

router.post(
  '/thread',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const thread: Thread = req.body;
    const response = await jobDescriptionService.createThread(thread);
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_REQUEST, response));
  }),
);

router.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const jobDescriptionUpdate: JobDescriptionUpdate = req.body;
    jobDescriptionUpdate._id = id;
    const result = await jobDescriptionService.updateJobDescription(jobDescriptionUpdate);
    res.send(responseAdapter.sendSuccessResponse('Success', result));
  }),
);

module.exports = router;
