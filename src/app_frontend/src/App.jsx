import { useEffect, useState } from "react";
import { app_backend } from "declarations/app_backend";
import Onboarding from "./pages/Onboarding";
import { initSatellite } from "@junobuild/core";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

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
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
