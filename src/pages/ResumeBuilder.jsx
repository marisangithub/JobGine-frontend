import { useState } from "react";
import html2canvas from "html2canvas";
import Select from "react-select";

import jsPDF from "jspdf";
import ModernResume
    from "../components/resumeTemplates/ModernResume";

import ProfessionalResume
    from "../components/resumeTemplates/ProfessionalResume";

import ATSResume
    from "../components/resumeTemplates/ATSResume";
import DashboardLayout from "../layouts/DashboardLayout";
// import {
//   downloadResumePdf
// }
// from "../services/pdfService";
import {
    generateResume
} from "../services/resumeBuilderService";

const ResumeBuilder = () => {

    const [template, setTemplate] = useState("modern");
    const [formData,
        setFormData] =
        useState({
            name: "",
            email: "",
            phone: "",
            role: "",
            experience: "",
            skills: "",
            projects: "",
            education: "",
            certifications: ""
        });

    const [generatedResume,
        setGeneratedResume] =
        useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleGenerate =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const res =
                    await generateResume(
                        formData,
                        token
                    );

                setGeneratedResume(
                    res.data.resume
                        .resume_content
                );

            } catch (error) {
                console.error(error);
                alert(
                    "Resume generation failed"
                );
            }
        };
    const downloadPDF = async () => {
        const element =
            document.getElementById(
                "resume-preview"
            );

        if (!element) return;

        const canvas =
            await html2canvas(
                element,
                {
                    scale: 2,
                }
            );

        const imgData =
            canvas.toDataURL("image/png");

        const pdf =
            new jsPDF(
                "p",
                "mm",
                "a4"
            );

        const pdfWidth =
            pdf.internal.pageSize.getWidth();

        const pdfHeight =
            (canvas.height *
                pdfWidth) /
            canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        pdf.save(
            `${formData.name || "resume"}.pdf`
        );
    };
    const downloadATSPDF = () => {

        const pdf =
            new jsPDF(
                "p",
                "mm",
                "a4"
            );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(11);

        const lines =
            pdf.splitTextToSize(
                generatedResume,
                180
            );

        pdf.text(
            lines,
            15,
            20
        );

        pdf.save(
            `${formData.name || "resume"}-ATS.pdf`
        );
    };

    return (
        <DashboardLayout>
            <div
                style={{
                    backgroundColor: "#0f172a",
                    minHeight: "100vh"
                }}
            >

                <div className="row">

                   <div className="col-12 col-lg-5">

                        <div
                            className="card shadow border-0"
                            style={{
                                backgroundColor: "#1e293b",
                                color: "#f8fafc",
                                borderRadius: "16px"
                            }}
                        >

                            <div
                                className="card-body"
                                style={{
                                    backgroundColor: "#1e293b",
                                    color: "#f8fafc"
                                }}
                            >

                                <h3>
                                    AI Resume Builder
                                </h3>

                                <input
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    placeholder="Name"
                                    name="name"
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    placeholder="Email"
                                    name="email"
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    placeholder="Target Role"
                                    name="role"
                                    onChange={handleChange}
                                />

                                <input
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    placeholder="Experience"
                                    name="experience"
                                    onChange={handleChange}
                                />

                                <textarea
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    rows="4"
                                    placeholder="Skills"
                                    name="skills"
                                    onChange={handleChange}
                                />

                                <textarea
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    rows="4"
                                    placeholder="Projects"
                                    name="projects"
                                    onChange={handleChange}
                                />

                                <textarea
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    rows="4"
                                    placeholder="Education"
                                    name="education"
                                    onChange={handleChange}
                                />
                                <textarea
                                    className="form-control mb-2"
                                    style={{
                                        backgroundColor: "#334155",
                                        color: "white",
                                        border: "1px solid #475569"
                                    }}
                                    rows="3"
                                    placeholder="Certifications"
                                    name="certifications"
                                    onChange={handleChange}
                                />
<Select
  className="mb-3"
  value={[
    { value: "modern", label: "Modern Template" },
    { value: "professional", label: "Professional Template" },
    { value: "ats", label: "ATS Template" }
  ].find(option => option.value === template)}
  onChange={(selectedOption) =>
    setTemplate(selectedOption.value)
  }
  options={[
    { value: "modern", label: "Modern Template" },
    { value: "professional", label: "Professional Template" },
    { value: "ats", label: "ATS Template" }
  ]}
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: "#334155",
      borderColor: "#475569",
      color: "white"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#334155"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#3b82f6"
        : "#334155",
      color: "white"
    })
  }}
/>
                                <button
                                    className="btn w-100"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                                        color: "white",
                                        border: "none"
                                    }}
                                    onClick={
                                        handleGenerate
                                    }
                                >
                                    Generate Resume
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-7">

                        <div
                            className="card shadow border-0"
                            style={{
                                backgroundColor: "#1e293b",
                                color: "#f8fafc",
                                borderRadius: "16px"
                            }}
                        >

                            <div
                                className="card-body"
                                style={{
                                    backgroundColor: "#1e293b",
                                    color: "#f8fafc"
                                }}
                            >
                                <h3>
                                    Resume Preview
                                </h3>

                                {generatedResume && (
                                    <div id="resume-preview">

                                        {template === "modern" &&
                                            <ModernResume
                                                content={generatedResume}
                                            />}

                                        {template === "professional" &&
                                            <ProfessionalResume
                                                content={generatedResume}
                                            />}

                                        {template === "ats" &&
                                            <ATSResume
                                                content={generatedResume}
                                            />}

                                    </div>
                                )}

                            </div>

                        </div>
                        {generatedResume && (

                            <div className=" p-3 d-flex flex-column flex-md-row gap-2">

  <button
    className="btn flex-fill"
    style={{
      backgroundColor: "#22c55e",
      color: "white",
      border: "none"
    }}
    onClick={downloadPDF}
  >
    📄 Download Preview PDF
  </button>

  <button
    className="btn flex-fill mt-2"
    style={{
      background:
        "linear-gradient(135deg,#3b82f6,#8b5cf6)",
      color: "white",
      border: "none"
    }}
    onClick={downloadATSPDF}
  >
    🤖 Download ATS PDF
  </button>

</div>

                        )}
                    </div>

                </div>
            </div>

        </DashboardLayout>
    );
};

export default ResumeBuilder;