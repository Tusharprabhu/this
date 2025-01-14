import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import Report from "./pages/Report";
import Home from "./pages/Register";
import Printcheque from "./pages/printcheque";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="printcheque" element={<Printcheque />} />
          <Route path="Report" element={<Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}