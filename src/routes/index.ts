/* eslint-disable @typescript-eslint/no-var-requires */
import { Request, Response, Router } from 'express';
import ResponseMessages from '../enums/response-message';
import ResponseAdapter from '../utils/response-adapter';

const router = Router();
const responseAdapter = new ResponseAdapter();

// TESTING ENDPOINT
router.get('/test', (req: Request, res: Response) =>
  res.send(responseAdapter.sendSuccessResponse(ResponseMessages.SERVER_RUNNING + 'this is customized once more', null)),
);

// router.use("/auth", require("./auth.routes"));
router.use(require('./job-description.routes'));
router.use(require('./placement-drive.routes'));

export default router;
