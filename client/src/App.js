import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./screens/Error/Error";
import LandingPage from "./screens/LandingPage/LandingPage";
import CrematoryInfo from "./screens/CrematoryInfo/CrematoryInfo";
import AddNewCrematory from "./screens/AddNewCrematory/AddNewCrematory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/crematories/:id" element={<CrematoryInfo />}></Route>
        <Route path="/crematories" element={<AddNewCrematory />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
