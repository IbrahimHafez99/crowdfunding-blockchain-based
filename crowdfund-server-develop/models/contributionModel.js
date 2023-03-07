import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema(
  {
    contributor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Campaign'
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Contribution = mongoose.model('Contribution', contributionSchema);

export default Contribution;
