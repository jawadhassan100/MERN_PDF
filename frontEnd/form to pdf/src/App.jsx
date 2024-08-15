import { Route, Routes } from "react-router-dom";
import Form from "./pages/Form.jsx";
import ShowAll from "./pages/View.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/view" element={<ShowAll />} />
    </Routes>
  );
}

export default App;
