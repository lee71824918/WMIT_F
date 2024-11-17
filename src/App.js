
import Loginpage from "./pages/Loginpage";
import Adminpage from "./pages/Adminpage"
import Homepage from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";





function App(){


return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/admin" element={<Adminpage/>} />
      <Route path="/" element={<Homepage/>} />
    </Routes>
  </BrowserRouter>
);
}



export default App;
