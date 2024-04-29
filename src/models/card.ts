import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface ICard {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: string;
  createdAt: Date;
}


const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30

  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})


export default mongoose.model<ICard>('card', cardSchema);