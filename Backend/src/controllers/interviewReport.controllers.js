const interviewReportModel = require('../models/InterviewReport.model');
const pdfParse = require('pdf-parse');
const generateInterviewReport = require('../services/ai.service');

async function generateInterViewReportController(req, res) {
    const resumeFile = req.file;

    const resumeContent = pdfParse(req.file.buffer);
    const { selfDiscription , jobDiscription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDiscription,
        jobDiscription
    })
}


module.exports = { generateInterViewReportController }