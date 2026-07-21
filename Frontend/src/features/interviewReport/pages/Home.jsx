import React, { useState, useRef } from 'react'
import { useInterviewReport } from '../hooks/useInterviewReport'
import { useNavigate } from 'react-router'


const Home = () => {

    const { loading, generateReport, reports } = useInterviewReport()

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")

    const resumeInputRef = useRef()

    const navigate = useNavigate()


    const handleGenerateReport = async () => {

        const resumeFile = resumeInputRef.current.files[0]

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile
        })

        navigate(`/interview/${data._id}`)
    }



    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Loading your interview plan...
                </h1>
            </div>
        )
    }



    return (

        <div className="min-h-screen bg-gray-100 px-5 py-10">

            <div className="max-w-6xl mx-auto">


                {/* Header */}

                <header className="text-center mb-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Create Your Custom
                        <span className="text-blue-600">
                            {" "}Interview Plan
                        </span>
                    </h1>


                    <p className="mt-4 text-gray-600 text-lg">
                        Let our AI analyze the job requirements and your profile
                        to build a winning strategy.
                    </p>

                </header>




                {/* Main Card */}

                <div className="bg-white rounded-3xl shadow-lg p-8 grid md:grid-cols-2 gap-8">


                    {/* Job Description */}

                    <div className="space-y-5">

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">
                                Target Job Description
                            </h2>

                            <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                                Required
                            </span>

                        </div>



                        <textarea
                            value={jobDescription}
                            onChange={(e)=>setJobDescription(e.target.value)}
                            placeholder="Paste the full job description here..."
                            maxLength={5000}
                            className="
                            w-full h-72 resize-none rounded-xl
                            border border-gray-300 p-4
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            text-gray-700
                            "
                        />


                        <p className="text-sm text-gray-500 text-right">
                            {jobDescription.length}/5000 chars
                        </p>


                    </div>






                    {/* Profile */}

                    <div className="space-y-5">


                        <h2 className="text-xl font-bold text-gray-800">
                            Your Profile
                        </h2>




                        <div>

                            <label className="block font-medium text-gray-700 mb-2">
                                Upload Resume
                            </label>


                            <input
                                ref={resumeInputRef}
                                type="file"
                                accept=".pdf,.docx"
                                className="
                                w-full border border-gray-300
                                rounded-xl p-3
                                bg-gray-50
                                "
                            />

                        </div>




                        <div className="flex items-center gap-4">

                            <div className="h-px bg-gray-300 flex-1"></div>

                            <span className="text-gray-500 font-semibold">
                                OR
                            </span>

                            <div className="h-px bg-gray-300 flex-1"></div>

                        </div>





                        <div>

                            <label className="block font-medium text-gray-700 mb-2">
                                Quick Self-Description
                            </label>


                            <textarea
                                value={selfDescription}
                                onChange={(e)=>setSelfDescription(e.target.value)}
                                placeholder="Describe your experience, skills..."
                                className="
                                w-full h-36 resize-none
                                rounded-xl border border-gray-300
                                p-4
                                focus:outline-none
                                focus:ring-2 focus:ring-blue-500
                                "
                            />

                        </div>




                        <div className="bg-blue-50 text-blue-700 rounded-xl p-4 text-sm">

                            Either a 
                            <strong> Resume </strong>
                            or 
                            <strong> Self Description </strong>
                            is required to generate a personalized plan.

                        </div>


                    </div>


                </div>





                {/* Button */}

                <div className="flex justify-center mt-8">

                    <button
                        onClick={handleGenerateReport}
                        className="
                        px-8 py-4 rounded-xl
                        bg-blue-600 text-white
                        font-semibold text-lg
                        hover:bg-blue-700
                        transition
                        shadow-lg
                        "
                    >
                        ✨ Generate My Interview Strategy
                    </button>


                </div>







                {/* Reports */}

                {
                    reports?.length > 0 && (

                        <section className="mt-12">

                            <h2 className="text-2xl font-bold text-gray-800 mb-5">
                                My Recent Interview Plans
                            </h2>



                            <div className="grid md:grid-cols-2 gap-5">


                                {
                                    reports.map(report => (

                                        <div
                                            key={report._id}
                                            onClick={() =>
                                                navigate(`/interview/${report._id}`)
                                            }
                                            className="
                                            bg-white p-6 rounded-2xl
                                            shadow hover:shadow-lg
                                            cursor-pointer transition
                                            "
                                        >

                                            <h3 className="text-xl font-bold text-gray-800">
                                                {report.title || "Untitled Position"}
                                            </h3>


                                            <p className="text-gray-500 mt-2">
                                                Generated on:
                                                {" "}
                                                {new Date(
                                                    report.createdAt
                                                ).toLocaleDateString()}
                                            </p>


                                            <p className="mt-3 font-semibold text-blue-600">
                                                Match Score:
                                                {" "}
                                                {report.matchScore}%
                                            </p>


                                        </div>

                                    ))
                                }


                            </div>

                        </section>

                    )
                }





                {/* Footer */}

                <footer className="mt-12 text-center text-gray-500">

                    <a className="hover:text-blue-600" href="#">
                        Privacy Policy
                    </a>

                    {" | "}

                    <a className="hover:text-blue-600" href="#">
                        Terms of Service
                    </a>

                    {" | "}

                    <a className="hover:text-blue-600" href="#">
                        Help Center
                    </a>


                </footer>


            </div>

        </div>

    )
}


export default Home