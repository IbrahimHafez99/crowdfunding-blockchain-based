import mongoose from 'mongoose';

const campaginSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    address: {
      type: String,
      required: false,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    goal: {
      type: Number,
      required: true,
      min: [0, 'Should be greater than zero, got {VALUE}']
    },
    pledged: {
      type: Number,
      required: false,
      default: 0,
      min: [0, 'Should not be negative, got {VALUE}']
    },
    contributors: {
      type: Number,
      required: false,
      default: 0,
      min: [0, 'Should not be negative, got {VALUE}']
    },
    startAt: {
      type: Date,
      required: function () {
        return this.state === 'deployed';
      },
      default: null
    },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator: (d) => d - new Date() > 0,
        message: 'Duration must be at least one day'
      }
    },
    minPledge: {
      type: Number,
      required: false,
      default: 0,
      min: [0, 'Should not be negative, got {VALUE}']
    },
    state: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'deployed'],
      required: false,
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Campagin = mongoose.model('Campaign', campaginSchema);

export default Campagin;
