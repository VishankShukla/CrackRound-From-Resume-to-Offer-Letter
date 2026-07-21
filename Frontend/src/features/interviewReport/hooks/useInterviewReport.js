import {getAllInterviewReports,getInterviewReportById,generateInterviewReport} from "../services/interview.api"
import { useContext, useEffect } from "react";
import { InterviewReportContext } from "../interviewReport.context";
import { useParams } from "react-router-dom";

export const useInterviewReport = () => {
    const context = useContext(InterviewReportContext)
    const {interviewReportId} = useParams()

    if(!context) {
        throw new Error("useInterviewReport must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
        setLoading(true)
        let response = null
        try{
            response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        }catch(err){
            console.error("Error generating Interview Report:",err)
        }finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReportById = async (interviewReportId) => {
        setLoading(true)
        let response = null
        try{
            const response = await getInterviewReportById(interviewReportId)
            setReport(response.interviewReport)
        }catch(err){
            console.error("Error generating Interview Report:",err)
        }finally{
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try{
            const response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }catch(err){
            console.error("Error generating Interview Report:",err)
        }finally{
            setLoading(false)
        }
        return response.interviewReport
    }

    useEffect(()=>{
        if(interviewReportId){
            getReportById(interviewReportId)
        }else{
            getReports()
        }
    },[interviewReportId])

    return {loading, report, reports, generateReport, getReportById, getReports}
}