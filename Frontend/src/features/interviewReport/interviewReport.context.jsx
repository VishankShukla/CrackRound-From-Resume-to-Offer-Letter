import { createContext, useState } from "react";

export const InterviewReportContext = createContext();

export const InterviewReportProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  return (
    <InterviewReportContext.Provider
      value={{
        loading, setLoading,
        report, setReport,
        reports, setReports,
        error, setError,
      }}
    >
      {children}
    </InterviewReportContext.Provider>
  );
};