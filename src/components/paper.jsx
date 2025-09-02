import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { use } from "react";


function StudentHelp() {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("Server issue");
  const [selectSubject, setSelectedSubject] = useState([]);
  const [selectExam, setSelectedExamination] = useState([]);
  const [selectCourse, setSelectedCourse] = useState([])
  const [subject, setSubject] = useState("");
  const [exam, setExam] = useState("");
  const [course, setCourse] = useState("");
  const [style, setStyle] = useState(false);
  const [nav, setNav] = useState(false);

  const [token, setToken, removeToken] = useCookies(["B-token"]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetch_paper = async () => {
      try {
        const response = await fetch('https://biswajeet.pythonanywhere.com/api/paper/', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",

          },
        });
        if (!response.ok) {
          setError("Server issue");
        }
        const result = await response.json();
        setPapers(result);
      }
      catch {
        setError("Server bad");
      }
    }
    fetch_paper();

  }, [])

  useEffect(() => {
    const filter = async () => {
      try {
        const resp = await fetch('https://biswajeet.pythonanywhere.com/api/paper/filter', {
          method: "GET",
          headers: {}
        });
        if (!resp.ok) {
          setSelectedExamination([]);
          setSelectedSubject([]);
          setSelectedCourse([]);
        }
        const res = await resp.json();
        console.log("Filter API Response:", res);
        setSelectedExamination(res.examinations);
        setSelectedSubject(res.subjects);
        setSelectedCourse(res.course)
      }
      catch {
        setSelectedExamination([]);
        setSelectedSubject([]);
        setSelectedCourse([]);
      }
    }
    filter();
  }, []);


  const Choosen = async () => {
    try {
      const resp = await fetch(`https://biswajeet.pythonanywhere.com/api/paper/?subject=${subject}&examination=${exam}&course=${course}`, {
        method: "GET",
        headers: {}
      });
      if (!resp.ok) {
        console.log("error")
      }
      const data = await resp.json();
      if (data.length === 0) {
        alert("Sorry, Paper is not available");
        return;
      }
      setPapers(data);
      setStyle(true);
    }
    catch {
      setPapers('error in backend');
    }
  }

  const toUpload = () => {
    if (!token["B-token"]) {
      alert("To Upload Sign in first");
      navigate('/');
    }
    if (token["B-token"]) {
      navigate('/upload');
    }
  }

  const toRegister = () => {
    navigate('/');
  }

  const sign_out = async() =>{
    try{
      console.log("Token", token["B-token"]);
      const resp = await fetch('https://biswajeet.pythonanywhere.com/api/user/signout/',{
        method : "POST",
        headers :{
          "Content-Type": "application/json",
          "Authorization": `Token ${token["B-token"]}`
        }
      })
      if(!resp.ok){
        console.log("error");
      }
      const result = await resp.json();
      removeToken('B-token');
      navigate("/");

    }
    catch{
      console.log("Error");
    }

  }

  useEffect(() =>{
    if(token["B-token"]){
      setNav(true)
    }
  })






  return (
    <div className="student-help-bg">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded-3 mt-3 mx-3 px-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4 text-primary">
            PaperHub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                <button className="btn nav-link fw-semibold border-0 bg-transparent" onClick={() => toUpload()}>Upload</button>
              </li>
              <li className="nav-item">
                {!nav && (
                  <button className="btn nav-link fw-semibold border-0 bg-transparent" onClick={() => toRegister()}>Sign in</button>
                )}
                {nav && (
                  <button className="btn nav-link fw-semibold border-0 bg-transparent" onClick={() => sign_out()}>Sign out</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Search Section */}
      <div className="container text-center my-5">
        <h3 className="fw-bold mb-4">Previous Year Question Papers</h3>
        <div className="row justify-content-center g-3">
          <div className="col-md-3 col-6">
            <select className="form-select shadow-sm rounded-pill"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}>
              <option value="">Subjects</option>
              {selectSubject && selectSubject.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2 col-6">
            <select className="form-select shadow-sm rounded-pill"
              value={exam}
              onChange={(e) => setExam(e.target.value)}>
              <option value="">Examinations</option>
              {selectExam && selectExam.map((exam, i) => (
                <option key={i} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
           <div className="col-md-2 col-6">
            <select className="form-select shadow-sm rounded-pill"
              value={course}
              onChange={(e) => setCourse(e.target.value)}>
              <option value="">Courses</option>
              {selectCourse && selectCourse.map((cor, i) => (
                <option key={i} value={cor}>{cor}</option>
              ))}
            </select>
          </div>

          <div className="col-md-2 col-6">
            <button className="btn btn-primary w-100 rounded-pill shadow-sm"
              onClick={() => Choosen()}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}

      <div className="container mb-5">
        {!style && (
          <div className="row g-4">
            {papers.map((paper, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="card shadow-sm border-0 rounded-4 text-center p-3 h-100">
                  <h5 className="fw-bold">{paper.subject}</h5><br/>
                  <p className="text-muted">Semester {paper.semester}</p>
                  <p className="text-muted">{paper.course}</p>
                  <p className="text-muted">{paper.examination}</p>
                  <i
                    className="bi bi-file-earmark-text text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                  <p className="mt-2">{paper.year}</p>
                  <button className="btn btn-outline-primary rounded-pill mt-2" onClick={() => window.open(paper.file,"_parent")}>
                    View/Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="container mb-5">
        {style && (
          <div className="row g-4 justify-content-center">
            {papers.map((paper, index) => (
              <div className="col-md-3 col-sm-6" key={index}>
                <div className="card shadow-sm border-0 rounded-4 text-center p-3 h-100">
                  <h5 className="fw-bold">{paper.subject}</h5>
                  <p className="text-muted">Semester {paper.semester}</p>
                  <p className="text-muted">{paper.course}</p>
                  <p className="text-muted">{paper.examination}</p>
                  <i
                    className="bi bi-file-earmark-text text-primary"
                    style={{ fontSize: "2.5rem" }}
                  ></i>
                  <p className="mt-2">{paper.year}</p>
                  <button className="btn btn-outline-primary rounded-pill mt-2" onClick={() => window.open(paper.file,"_parent")}>
                    View/Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>-
      <footer className="container-fluid bg-black text-white py-4 mt-8">
      <div className="container mx-auto text-center ">
        <h3 className="text-sm">
          Developed By <br/> <span className="font-semibold">Biswajeet Sanyal & Tannu Raj</span>
        </h3>
        <p>Reach us at : sanyalbiswajeet03@gmail.com & rajtannu483@gmail.com</p>
      </div>
    </footer>
    </div>
    
  );
}

export default StudentHelp;



