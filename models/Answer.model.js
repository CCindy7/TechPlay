const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    correct_answer: {
      type: Boolean,
      required: true,
    }
  },
  {
    // `createdAt` et `updatedAt`
    timestamps: true,
  }
);
    
const Answer = model("Answer", answerSchema);

module.exports = Answer;