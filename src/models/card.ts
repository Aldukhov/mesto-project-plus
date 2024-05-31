import mongoose from "mongoose";
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
    maxlength: 30,
  },
  link: {
    type: String,
    required: [true, "URL обязателен"],
    validate: {
      validator: function (v: string) {
        const urlRegex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
        return urlRegex.test(v);
      },
      message: (props: any) => `${props.value} некорректный URL!`,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>("card", cardSchema);
