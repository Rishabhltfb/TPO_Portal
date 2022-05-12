import mongoose from 'mongoose';
import Thread from '../../types/thread.types/thread.type';

mongoose.Schema.Types.String.set('trim', true);

const threadSchema = new mongoose.Schema<Thread>({
  threadText: {
    type: String,
  },
  jobDescription: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobDescription',
  },
});

threadSchema.set('timestamps', true);
threadSchema.set('toObject', { virtuals: true });

const ThreadModel = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default ThreadModel;
