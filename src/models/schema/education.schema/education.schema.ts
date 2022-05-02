import mongoose from 'mongoose';
import Education from '../../types/education.types/education.type';

mongoose.Schema.Types.String.set('trim', true);

const educationSchema = new mongoose.Schema<Education>({
  degree: {
    type: String,
  },
  collegeName: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  percentage: {
    type: Number,
  },
});

educationSchema.set('timestamps', true);
educationSchema.set('toObject', { virtuals: true });

const EducationModel = mongoose.models.Education || mongoose.model('Education', educationSchema);

export default EducationModel;
