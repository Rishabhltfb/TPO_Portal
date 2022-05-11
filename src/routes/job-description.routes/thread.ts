import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SuccessMessages from '../../enums/success';
import mongoose from 'mongoose';
import Thread from '../../models/types/thread.types/thread.type';
import JobDescriptionService from '../../services/job-description.services/job-description.service';
import ResponseAdapter from '../../utils/response-adapter';

const router = Router();
const jobDescriptionService = new JobDescriptionService();
const responseAdapter = new ResponseAdapter();

router.post(
  '',
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
    const { threadText } = req.body;
    const result = await jobDescriptionService.updateThread(id.toString(), threadText);
    res.send(responseAdapter.sendSuccessResponse('Success', result));
  }),
);

module.exports = router;
