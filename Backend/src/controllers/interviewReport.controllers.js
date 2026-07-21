const interviewReportModel = require('../models/InterviewReport.model');
const pdfParse = require('pdf-parse');
const {generateInterviewReport} = require('../services/ai.service');

async function generateInterViewReportController(req, res) {


    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription , jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })


    return res.status(201).json({
        message:"Interview Report Generated Successfully",
        interviewReport,
    })
}


module.exports = { generateInterViewReportController }