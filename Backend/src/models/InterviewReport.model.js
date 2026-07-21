const mongoose = require('mongoose');


const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    intention:{
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: true,
    }
},{
    _id:false
})

const behaviourQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    intention:{
        type: String,
        required: true,
    },
    answer:{
        type: String,
        required: true,
    }
},{
    _id:false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required: true,
    },
    severity:{
        type: String,
        enum:["low","medium","high"],
        required:true,
    }
},{
    _id:false
})

const preprationPlanSchema = new mongoose.Schema({
    day:{
        type:String,
        required:true,
    },
    focus:{
        type: String,
        required:true,
    },
    tasks:[{
        type: String,
        required: true,
    }]
},{
    _id:false
})

const interviewReportSchema = new mongoose.Schema({
    jobDiscription:{
        type: String,
        required: true,
    },
    resume:{
        type:String,
    },
    selfDiscription:{
        type:String,
        required: true,
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestion:[technicalQuestionSchema],
    behaviourQuestion:[behaviourQuestionSchema],
    skillGap:[skillGapSchema],
    preprationPlan:[preprationPlanSchema]

})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema);

module.exports = interviewReportModel;
