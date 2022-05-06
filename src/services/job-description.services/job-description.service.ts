import { Mongoose } from 'mongoose';
import JobDescriptionDao from '../../data/job-description.dao/job-description.dao';
import Errors from '../../enums/errors';
import GenericError from '../../models/dto/generic/generic-error';
import JobDescriptionUpdate from '../../models/types/job-description.types/job-description-update.type';
import JobDescription from '../../models/types/job-description.types/job-description.type';
const mongoose = new Mongoose();

export default class JobDescriptionService {
  private jobDescriptionDao = new JobDescriptionDao();

  async createJobDescription(jobDescription: JobDescription): Promise<JobDescription> {
    try {
      return this.jobDescriptionDao.createJobDescription(jobDescription);
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new GenericError(Errors.PLACEMENT_REQUEST_NOT_FOUND_ERR, 404);
      } else {
        throw err;
      }
    }
  }

  async updateJobDescription(jobDescriptionUpdate: JobDescriptionUpdate): Promise<boolean> {
    const res = await this.jobDescriptionDao.updateJobDescription(jobDescriptionUpdate);
    return res;
  }
}
