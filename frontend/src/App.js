import {useState} from "react"
import './App.css';
import axios from "axios";


function useGetHelloWorld(){
    axios.get("/test")
}

function App() {
    const [res, setRes] = useState("");
    const getHelloWorld = useGetHelloWorld()

    function handleClick(){
        setRes(getHelloWorld())
    }
  return (
    <div className="App">
        Res: {res}
        <button onClick={handleClick}>get hello world</button>
    </div>
  );
}

export default App;
