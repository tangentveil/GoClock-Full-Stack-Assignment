// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Auth from "./pages/Auth/Auth";
import Manufacturer from "./pages/Manufacturer/Manufacturer";
import Transporter from "./pages/Transporter/Transporter";
import { useSelector } from "react-redux";


function App() {

  const user = useSelector((state) => state.currentUserReducer);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="/manufacturer" element={<Manufacturer />}></Route>
          <Route path="/transporter" element={<Transporter />}></Route>
          {/* {user ? (
            <>
              <Route path="/manufacturer" element={<Manufacturer />}></Route>
              <Route path="/transporter" element={<Transporter />}></Route>
            </>
          ) : (
            ""
          )} */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
