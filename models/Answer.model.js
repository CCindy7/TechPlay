const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    question_id: { type: Schema.Types.ObjectId, ref: 'Question'},
    correct_answer: {
      type: Boolean,
    },
    round: {
      type: Schema.Types.Mixed
    }
  },
  {
    // `createdAt` et `updatedAt`
    timestamps: true,
  }
);
    
const Answer = model("Answer", answerSchema);

module.exports = Answer;