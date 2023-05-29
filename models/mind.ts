import { Schema, model, models } from 'mongoose';

const MindSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  mind: {
    type: String,
    required: [true, 'Mind is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  }
});

const Mind = models.Mind || model('Mind', MindSchema);

export default Mind;
