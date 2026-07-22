import {
  getAllInterviewReports,
  getInterviewReportById,
  generateInterviewReport,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewReportContext } from "../interviewReport.context";
import { useParams } from "react-router-dom";

function extractErrorMessage(err, fallback) {
  return err?.response?.data?.message || fallback;
}

export const useInterviewReport = () => {
  const context = useContext(InterviewReportContext);
  // Matches the ":interviewId" param defined in App.routes.jsx
  const { interviewId } = useParams();

  if (!context) {
    throw new Error(
      "useInterviewReport must be used within an InterviewReportProvider",
    );
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    error,
    setError,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    setError("");
    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      return { success: true, interviewReport: response.interviewReport };
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "Could not generate the interview report.",
      );
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (id) => {
    setLoading(true);
    setError("");
    setReport(null);
    try {
      const response = await getInterviewReportById(id);
      setReport(response.interviewReport);
      return { success: true, interviewReport: response.interviewReport };
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "Could not load this interview report.",
      );
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return { success: true };
    } catch (err) {
      const message = extractErrorMessage(
        err,
        "Could not load your interview reports.",
      );
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    error,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
  };
};
