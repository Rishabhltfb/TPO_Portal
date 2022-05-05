import { Request, Response, Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import logger from '../../config/logger';
import SuccessMessages from '../../enums/success';
import PlacementDrive from '../../models/types/placement-drive.types/placement-drive.type';
import PlacementDriveService from '../../services/placement-drive.services/placement-drive.service';
import ResponseAdapter from '../../utils/response-adapter';

const router = Router();
const placementDriveService = new PlacementDriveService();
const responseAdapter = new ResponseAdapter();

// @route   GET api/v1/placement-drive/placementDriveById/:id
// @desc    GET Placement Drive by id
// TODO: @access    Private (All users)
router.get(
  '/placementDriveById/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const placementDrive = await placementDriveService.getPlacementDriveById(id);
    if (!placementDrive) {
      res.status(404).send(responseAdapter.sendErrorResponse('Not placement drive found', 404));
    } else {
      res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_FOUND, placementDrive));
    }
  }),
);

// @route   GET api/v1/placement-drive/
// @desc    GET All Placement Drives which are visible(true)
// TODO: @access    Private (To be used by students)
router.get(
  '',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const placementDrives = await placementDriveService.getAllVisiblePlacementDrives();
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVES_FOUND, placementDrives));
  }),
);

// @route   GET api/v1/placement-drive/allPlacementDrives
// @desc    GET All Placement Drives
// TODO: @access    Private (For tpo)
router.get(
  '/allPlacementDrives',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const placementDrives = await placementDriveService.getAllPlacementDrives();
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVES_FOUND, placementDrives));
  }),
);

// @route   POST api/v1/placement-drive/
// @desc    Create Placement Drive
// TODO: @access    Private (Only TPO)
router.post(
  '',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const placementDrive: PlacementDrive = req.body;
    const response = await placementDriveService.createPlacementDrive(placementDrive);
    logger.info(response);
    res.status(200).send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_CREATED, response));
  }),
);

// @route   DELETE api/v1/placement-drive/:id
// @desc    DELETE Placement Drive by id
// TODO: @access    Private (Only TPO)
router.delete(
  '/:id',
  expressAsyncHandler(async (req: Request, res: Response) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    const placementDrive = await placementDriveService.getPlacementDriveById(id);
    if (!placementDrive) {
      res.status(404).send(responseAdapter.sendErrorResponse('No placement drive found', 404));
    } else {
      await placementDriveService.deletePlacementDrive(id);
      res
        .status(200)
        .send(responseAdapter.sendSuccessResponse(SuccessMessages.PLACEMENT_DRIVE_DELETED, placementDrive));
    }
  }),
);

module.exports = router;
