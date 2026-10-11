import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { email } = useAuth();
  const [services, setServices] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getServices()
      .then(setServices)
      .catch(() => setServices({}));
  }, []);

  const selected = [];
  if (services?.personalTrainer) selected.push("Personal Trainer");
  if (services?.nutritionist) selected.push("Nutritionist");
  if (services?.weekendSession) selected.push("Weekend Sessions");

  return (
    <section className="dashboard-container">
      <h1>Welcome{email ? `, ${email}` : " Member"}</h1>
      <div className="dashboard-card">
        <h2>Your Selected Services</h2>
        <ul>
          {!services && <li>Loading...</li>}
          {services && selected.length === 0 && <li>No services selected</li>}
          {selected.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <button className="neon-next-btn" onClick={() => navigate("/services/select")}>
        Update Services
      </button>
    </section>
  );
}
