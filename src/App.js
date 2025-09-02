import StudentHelp from './components/paper';
import { useNavigate } from "react-router-dom";
import { useCookies} from "react-cookie";
import { useEffect } from 'react';
import './App.css';
import Footer from './components/footer';


function App() {

  const [token] = useCookies(["B-token"]);
  const navigate = useNavigate();

  useEffect(() =>{
    if(!token["B-token"]) navigate("/");
  },[token,navigate]);

  return (
    <>
      <div className="">
       
        <StudentHelp/>
        
      </div>
    </>
  )
}
export default App;

