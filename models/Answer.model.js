const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    user_id: "",
    question_id: {
        type: String,
        required: true, 
        unique: true
    },
    correct_answer : {
        type: Boolean,
        required: true,
        unique: true
    }
  },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);
    
const Answer = model("Answer", answerSchema);

module.exports = Answer;