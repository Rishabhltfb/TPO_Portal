import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SuccessMessages from '../../enums/success';
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

router.get(
  '/unapproved',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const response = placementDriveRequestService.getAllUnapprovedPlacementDriveRequests();
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_REQUEST_OPEN, response));
  }),
);

module.exports = router;
