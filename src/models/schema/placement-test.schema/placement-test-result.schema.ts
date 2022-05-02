import mongoose from 'mongoose';
import PlacementTestResult from '../../types/placement-test.types/placement-test-result.type';

mongoose.Schema.Types.String.set('trim', true);

const placementTestResultSchema = new mongoose.Schema<PlacementTestResult>({
  placementTest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlacementTest',
  },
  selectedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

placementTestResultSchema.set('timestamps', true);
placementTestResultSchema.set('toObject', { virtuals: true });

const PlacementTestResultModel =
  mongoose.models.PlacementTestResult || mongoose.model('PlacementTestResult', placementTestResultSchema);

export default PlacementTestResultModel;
