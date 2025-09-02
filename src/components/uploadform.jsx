import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function UploadPaper() {


    const [subject, setSubject] = useState("");
    const [examination, setExamination] = useState("");
    const [semester, setSemester] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [file, setfile] = useState("");
    const navigate = useNavigate();
    const [token] = useCookies(["B-token"]);

    const upload = async () => {

        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("examination", examination);
        formData.append("semester", semester);
        formData.append("course", course);
        formData.append("year", year);
        formData.append("file", file);



        try {
            const resp = await fetch('https://biswajeet.pythonanywhere.com/api/paper/', {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token["B-token"]}`
                },
                body : formData,

            })
            if(!resp.ok){
                console.log("error");
            }
            const result = await resp.json();
            alert("File Uploaded");
            navigate('/papers');
        }
        catch{
            alert("Error");
        }
    }
    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">Upload New Paper</h3>
            <div className="shadow p-4 rounded bg-light">

                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Examination</label>
                    <input
                        type="text"
                        placeholder="MTE or ETE"
                        className="form-control"
                        value={examination}
                        onChange={(e) => setExamination(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Semester</label>
                    <input
                        type="number"
                        placeholder=""
                        className="form-control"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Course</label>
                    <input
                        type="text"
                        placeholder=""
                        className="form-control"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Year</label>
                    <input
                        type="number"
                        placeholder=""
                        className="form-control"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="file"
                        className="form-control"
                        
                        onChange={(e) => setfile(e.target.files[0])}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={() => upload()}>
                    Upload Paper
                </button>
            </div>
        </div>
    );
}

export default UploadPaper;
