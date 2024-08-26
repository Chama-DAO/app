import { useEffect, useState } from "react";
import { app_backend } from "declarations/app_backend";
import Onboarding from "./pages/Onboarding";
import { initSatellite } from "@junobuild/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Wallet from "./pages/Wallet";
import Chamas from "./pages/Chamas";
import ELearning from "./pages/ELearning";
import Proposals from "./pages/Proposals";
import Settings from "./pages/Settings";

function App() {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: "m3e2r-niaaa-aaaal-ajjtq-cai",
      }))();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    app_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/my-chama" element={<Chamas />} />
          <Route path="/learn" element={<ELearning />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </main>
  );
}

export default App;
