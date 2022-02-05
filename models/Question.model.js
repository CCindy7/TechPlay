const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    user_id: "",
    title: {
        type: String, 
        required: true,
        unique : true
    },
    propositions: {
        type: [String], 
        required: true
    },
    solution : {
        type: Number,
        required: true
    }, 
    category: {
        type: [String], 
        required: true, 
    }, 
    difficulty : {
        type: Number,
        enum :[1, 2, 3], 
        required: true
    }
  },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);
    
const Question = model("Question", questionSchema);

module.exports = Question;