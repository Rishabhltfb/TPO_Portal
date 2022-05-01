import { Mongoose, Types } from "mongoose";
import logger from "../../config/logger";
import PlacementDriveRequestDAO from "../../data/placement-drive.dao/placement-drive-request.dao";
import Errors from "../../enums/errors";
import GenericError from "../../models/dto/generic/generic-error";
import PlacementDriveRequest from "../../models/types/placement-drive.types/placment-drive-request.type";
import { GenericExceptionHandler } from "../../utils/error-handling";

const mongoose = new Mongoose();
export default class PlacementDriveRequestService {
    private placementDriveRequestDAO = new PlacementDriveRequestDAO();

    async createPlacementDriveRequest(
        placementDriveRequest: PlacementDriveRequest
    ): Promise<boolean> {
        try {
            if (
                !this.validateEmail(placementDriveRequest.companyEmail) ||
                placementDriveRequest.companyName.length < 3
            ) {
                throw new GenericError(Errors.INVALID_REQUEST_ERROR, 400);
            }

            return this.placementDriveRequestDAO.createPlacementDriveRequest(
                placementDriveRequest
            );
        } catch (err) {
            if (err instanceof mongoose.Error.CastError) {
                throw new GenericError(
                    Errors.PLACEMENT_REQUEST_NOT_FOUND_ERR,
                    404
                );
            } else {
                throw err;
            }
        }
    }

    async getAllUnapprovedPlacementDriveRequests(): Promise<
        Array<PlacementDriveRequest>
    > {
        return this.placementDriveRequestDAO.getAllUnapprovedPlacementDriveRequests();
    }

    validateEmail(email: string): boolean {
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validate: boolean = re.test(email.toLowerCase());
        logger.info(`Email Validation: ${validate} with email: ${email}`);
        return validate;
    }
}
