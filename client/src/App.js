import { Route, Routes } from "react-router-dom";
import "./App.css";
import HDMB from "./pages/HDMB/HDMB";
import Layout from "./components/Layout/Layout";
import HDNC from "./pages/HDNC/HDNC";
import QLCT from "./pages/QLCT/QLCT";
import HDTX from "./pages/HDTX/HDTX";
import HDTM from "./pages/HDTM/HDTM";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout></Layout>} />

        <Route
          path="/hdmb"
          element={
            <Layout>
              <HDMB />
            </Layout>
          }
        />

        <Route
          path="/hdtm"
          element={
            <Layout>
              <HDTM />
            </Layout>
          }
        />

        <Route
          path="/hdtx"
          element={
            <Layout>
              <HDTX />
            </Layout>
          }
        />

        <Route
          path="/hdnc"
          element={
            <Layout>
              <HDNC />
            </Layout>
          }
        />

        <Route path="/hdtx" element={<Layout></Layout>} />

        <Route path="/hddv" element={<Layout></Layout>} />

        <Route
          path="/qlct"
          element={
            <Layout>
              <QLCT />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
