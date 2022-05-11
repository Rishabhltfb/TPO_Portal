import mongoose from 'mongoose';
import CourseBranch from '../../../enums/branch';
import JobType from '../../../enums/job-type';
import JobDescription from '../../types/job-description.types/job-description.type';

mongoose.Schema.Types.String.set('trim', true);

const jobDescriptionSchema = new mongoose.Schema<JobDescription>({
  jobDescription: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  compensation: {
    type: String,
    required: true,
  },
  startDateTime: {
    type: Date,
  },
  courseBranches: [
    {
      type: String,
      enum: CourseBranch,
      default: CourseBranch[CourseBranch.All],
    },
  ],
  placementTests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlacementTest',
    },
  ],
  applicationLink: {
    type: String,
  },
  attachments: [
    {
      type: String,
    },
  ],
  deadline: {
    type: Date,
  },
  jobType: {
    type: String,
    enum: JobType,
    default: JobType[JobType.Job],
  },
  minCpi: {
    type: Number,
  },
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
    },
  ],
});

jobDescriptionSchema.set('timestamps', true);
jobDescriptionSchema.set('toObject', { virtuals: true });

const JobDescriptionModel = mongoose.models.Experience || mongoose.model('JobDescription', jobDescriptionSchema);

export default JobDescriptionModel;
