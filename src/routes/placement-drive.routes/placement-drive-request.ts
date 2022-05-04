import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import logger from '../../config/logger';
import PlacementDriveRequestStatus from '../../enums/placement-drive-request-status';
import SuccessMessages from '../../enums/success';
import PlacementDriveRequestUpdate from '../../models/types/placement-drive.types/placement-drive-request-update.type';
import PlacementDriveRequest from '../../models/types/placement-drive.types/placment-drive-request.type';
import PlacementDriveRequestService from '../../services/placement-drive.services/placement-drive-request.service';
import ResponseAdapter from '../../utils/response-adapter';

const router = Router();
const placementDriveRequestService = new PlacementDriveRequestService();
const responseAdapter = new ResponseAdapter();

router.post(
  '',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const placementDriveRequest: PlacementDriveRequest = req.body;
    const response = placementDriveRequestService.createPlacementDriveRequest(placementDriveRequest);
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_REQUEST, response));
  }),
);

router.put(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const status: PlacementDriveRequestStatus =
      PlacementDriveRequestStatus[String(req.query.status) as keyof typeof PlacementDriveRequestStatus];
    const id = mongoose.Types.ObjectId(req.params.id);
    const { rejectionFeedback, verified } = req.body;
    const placementDriveRequestUpdate: PlacementDriveRequestUpdate = {
      status,
      rejectionFeedback,
      id,
      verified,
    };
    logger.info(placementDriveRequestUpdate);
    const result = await placementDriveRequestService.updatePlacementDriveRequest(placementDriveRequestUpdate);
    res.send(responseAdapter.sendSuccessResponse('Success', result));
  }),
);

router.get(
  '/status',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const status: PlacementDriveRequestStatus =
      PlacementDriveRequestStatus[String(req.query.status) as keyof typeof PlacementDriveRequestStatus];
    const response = await placementDriveRequestService.placementDriveRequestsByStatus(status);
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_REQUEST_OPEN, response));
  }),
);

module.exports = router;
