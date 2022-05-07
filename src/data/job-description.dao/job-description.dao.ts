import { Mongoose } from 'mongoose';
import logger from '../../config/logger';
import CourseBranch from '../../enums/branch';
import JobType from '../../enums/job-type';
import JobDescriptionModel from '../../models/schema/job-description.schema/job-description.schema';
import ThreadModel from '../../models/schema/thread.schema/thread.schema';
import JobDescriptionUpdate from '../../models/types/job-description.types/job-description-update.type';
import JobDescription from '../../models/types/job-description.types/job-description.type';
import Thread from '../../models/types/thread.types/thread.type';
import LooseObject from '../../models/types/universal.type';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mongoose = new Mongoose();
export default class JobDescriptionDao {
  async createJobDescription(jobDescription: JobDescription): Promise<JobDescription> {
    const jobDescriptionDao = new JobDescriptionModel(jobDescription);
    const data: JobDescription = await jobDescriptionDao.save();
    return data;
  }

  async jobDescriptionById(id: string): Promise<JobDescription> {
    const data: JobDescription = await JobDescriptionModel.findById(id);
    return data;
  }

  async createThread(thread: Thread): Promise<Thread> {
    const threadDao = new ThreadModel(thread);
    const data: Thread = await threadDao.save();
    return data;
  }

  async updateJobDescription(jobDescriptionUpdate: JobDescriptionUpdate): Promise<boolean> {
    const updateObj: LooseObject = {};
    if (jobDescriptionUpdate.applicationLink) {
      updateObj.applicationLink = jobDescriptionUpdate.applicationLink;
    }
    if (jobDescriptionUpdate.attachments) {
      updateObj.attachments = jobDescriptionUpdate.attachments;
    }
    if (jobDescriptionUpdate.branch) {
      updateObj.branch = CourseBranch[jobDescriptionUpdate.branch];
    }
    if (jobDescriptionUpdate.compensation) {
      updateObj.compensation = jobDescriptionUpdate.compensation;
    }
    if (jobDescriptionUpdate.deadline) {
      updateObj.deadline = jobDescriptionUpdate.deadline;
    }
    if (jobDescriptionUpdate.jobDescription) {
      updateObj.jobDescription = jobDescriptionUpdate.jobDescription;
    }
    if (jobDescriptionUpdate.jobType) {
      updateObj.jobType = JobType[jobDescriptionUpdate.jobType];
    }
    if (jobDescriptionUpdate.role) {
      updateObj.role = jobDescriptionUpdate.role;
    }
    if (jobDescriptionUpdate.startDateTime) {
      updateObj.startDateTime = jobDescriptionUpdate.startDateTime;
    }
    if (jobDescriptionUpdate.minCpi) {
      updateObj.minCpi = jobDescriptionUpdate.minCpi;
    }
    if (jobDescriptionUpdate.threads) {
      updateObj.threads = jobDescriptionUpdate.threads;
    }

    JobDescriptionModel.updateOne(
      { _id: jobDescriptionUpdate._id },
      {
        $set: updateObj,
      },
    ).catch((err) => {
      logger.error(err);
      Promise.resolve(false);
    });
    return Promise.resolve(true);
  }
}
