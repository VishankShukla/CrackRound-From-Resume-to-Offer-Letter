import React, { useState, useEffect } from 'react'
import { useInterviewReport } from '../hooks/useInterviewReport'
import { useParams } from 'react-router'


const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
]


const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
            >
                <h3 className="font-semibold text-gray-800">
                    <span className="text-blue-600">
                        Q{index + 1}:
                    </span>{" "}
                    {item.question}
                </h3>

                <span className="text-gray-400 text-xl">
                    {open ? "−" : "+"}
                </span>
            </button>


            {open && (
                <div className="px-5 pb-5 space-y-5 bg-gray-50">

                    <div>
                        <h4 className="text-sm font-semibold text-blue-600 mb-1">
                            Intention
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {item.intention}
                        </p>
                    </div>


                    <div>
                        <h4 className="text-sm font-semibold text-green-600 mb-1">
                            Model Answer
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                        </p>
                    </div>

                </div>
            )}

        </div>
    )
}



const RoadMapDay = ({ day }) => (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

        <h3 className="font-bold text-lg text-gray-800 mb-3">
            <span className="text-blue-600">
                Day {day.day}
            </span>
            {" "}
            - {day.focus}
        </h3>


        <ul className="space-y-2">

            {day.tasks.map((task, i) => (
                <li
                    key={i}
                    className="flex gap-2 text-gray-700"
                >
                    <span className="mt-2 w-2 h-2 bg-blue-600 rounded-full" />
                    {task}
                </li>
            ))}

        </ul>

    </div>
)



const Interview = () => {

    const [activeNav, setActiveNav] = useState('technical')

    const {
        report,
        getReportById,
        loading,
        getResumePdf
    } = useInterview()


    const { interviewReportId } = useParams()



    useEffect(() => {

        if (interviewReportId) {
            getReportById(interviewReportId)
        }

    }, [interviewId])



    if (loading || !report) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-semibold text-gray-700">
                    Loading your interview plan...
                </h1>
            </div>
        )
    }



    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">


                {/* Sidebar Navigation */}

                <aside className="col-span-12 md:col-span-3 bg-white rounded-2xl shadow-sm p-5 h-fit">

                    <h3 className="text-lg font-bold mb-5 text-gray-800">
                        Sections
                    </h3>


                    <div className="space-y-3">

                        {
                            NAV_ITEMS.map(item => (

                                <button
                                    key={item.id}
                                    onClick={() => setActiveNav(item.id)}
                                    className={`
                                    w-full text-left px-4 py-3 rounded-xl transition
                                    ${
                                        activeNav === item.id
                                        ? "bg-blue-600 text-white shadow"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }
                                    `}
                                >

                                    {item.label}

                                </button>

                            ))
                        }

                    </div>


                    <button
                        onClick={() => getResumePdf(interviewId)}
                        className="mt-6 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                    >
                        Download Resume
                    </button>


                </aside>



                {/* Main Content */}

                <main className="col-span-12 md:col-span-6 space-y-5">


                    {
                        activeNav === "technical" && (

                            <>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Technical Questions
                                    <span className="text-sm text-gray-500 ml-2">
                                        ({report.technicalQuestions.length})
                                    </span>
                                </h2>


                                {
                                    report.technicalQuestions.map((q,i)=>(
                                        <QuestionCard
                                            key={i}
                                            item={q}
                                            index={i}
                                        />
                                    ))
                                }

                            </>

                        )
                    }



                    {
                        activeNav === "behavioral" && (

                            <>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Behavioral Questions
                                    <span className="text-sm text-gray-500 ml-2">
                                        ({report.behavioralQuestions.length})
                                    </span>
                                </h2>


                                {
                                    report.behavioralQuestions.map((q,i)=>(
                                        <QuestionCard
                                            key={i}
                                            item={q}
                                            index={i}
                                        />
                                    ))
                                }

                            </>

                        )
                    }




                    {
                        activeNav === "roadmap" && (

                            <>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Preparation Road Map
                                </h2>


                                {
                                    report.preparationPlan.map(day=>(
                                        <RoadMapDay
                                            key={day.day}
                                            day={day}
                                        />
                                    ))
                                }

                            </>

                        )
                    }


                </main>




                {/* Right Sidebar */}

                <aside className="col-span-12 md:col-span-3 space-y-6">


                    <div className="bg-white rounded-2xl shadow-sm p-6 text-center">

                        <h3 className="font-semibold text-gray-600">
                            Match Score
                        </h3>


                        <div className="text-5xl font-bold text-blue-600 my-4">
                            {report.matchScore}%
                        </div>


                        <p className="text-gray-500">
                            Strong match for this role
                        </p>

                    </div>




                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <h3 className="font-bold text-gray-800 mb-4">
                            Skill Gaps
                        </h3>


                        <div className="flex flex-wrap gap-2">

                            {
                                report.skillGaps.map((gap,i)=>(
                                    <span
                                        key={i}
                                        className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm"
                                    >
                                        {gap.skill}
                                    </span>
                                ))
                            }

                        </div>


                    </div>


                </aside>


            </div>

        </div>

    )
}


export default Interview