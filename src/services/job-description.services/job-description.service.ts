import { Mongoose, Types } from 'mongoose';
import JobDescriptionDao from '../../data/job-description.dao/job-description.dao';
import Errors from '../../enums/errors';
import GenericError from '../../models/dto/generic/generic-error';
import JobDescriptionUpdate from '../../models/types/job-description.types/job-description-update.type';
import JobDescription from '../../models/types/job-description.types/job-description.type';
import Thread from '../../models/types/thread.types/thread.type';
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

  async createThread(thread: Thread): Promise<Thread> {
    try {
      const data = await this.jobDescriptionDao.createThread(thread);
      let threadArr: Types.ObjectId[] = [];
      const jobDescription: JobDescription = await this.jobDescriptionDao.jobDescriptionById(
        thread.jobDescription.toString(),
      );
      if (jobDescription.threads) {
        threadArr = jobDescription.threads;
      }
      const jobDescriptionUpdate: JobDescriptionUpdate = {
        _id: thread.jobDescription,
      };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      threadArr.push(data._id!);
      jobDescriptionUpdate.threads = threadArr;
      this.updateJobDescription(jobDescriptionUpdate);
      return data;
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        throw new GenericError(err.message, 404);
      } else {
        throw err;
      }
    }
  }

  async updateJobDescription(jobDescriptionUpdate: JobDescriptionUpdate): Promise<boolean> {
    const res = await this.jobDescriptionDao.updateJobDescription(jobDescriptionUpdate);
    return res;
  }

  async updateThread(id: string, threadText: string): Promise<boolean> {
    if (threadText.length == 0) {
      throw new GenericError(Errors.INVALID_REQUEST_ERROR, 400);
    }
    const res = await this.jobDescriptionDao.updateThread(id, threadText);
    return res;
  }
}
