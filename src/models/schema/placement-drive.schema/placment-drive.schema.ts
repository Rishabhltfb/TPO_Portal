import mongoose from 'mongoose';
import PlacementDrive from '../../types/placement-drive.types/placement-drive.type';

mongoose.Schema.Types.String.set('trim', true);

const placementDriveSchema = new mongoose.Schema<PlacementDrive>({
  companyName: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  companyNumber: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  jobDescription: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobDescription',
    },
  ],
});

placementDriveSchema.set('timestamps', true);
placementDriveSchema.set('toObject', { virtuals: true });

const PlacementDriveModel = mongoose.models.PlacementDrive || mongoose.model('PlacementDrive', placementDriveSchema);

export default PlacementDriveModel;
