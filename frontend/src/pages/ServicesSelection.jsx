import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

const options = [
  { key: "personalTrainer", title: "Personal Trainer", text: "One-on-one training tailored to your fitness goals." },
  { key: "nutritionist", title: "Nutritionist", text: "Personalized diet plans to support your workouts." },
  { key: "weekendSession", title: "Weekend Sessions", text: "Group workouts and special bootcamp sessions." },
];

export default function ServicesSelection() {
  const [services, setServices] = useState({
    personalTrainer: false,
    nutritionist: false,
    weekendSession: false,
  });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getServices()
      .then((data) => {
        setServices({
          personalTrainer: Boolean(data.personalTrainer),
          nutritionist: Boolean(data.nutritionist),
          weekendSession: Boolean(data.weekendSession),
        });
      })
      .catch(() => {});
  }, []);

  const toggle = (key) => {
    setServices((current) => ({ ...current, [key]: !current[key] }));
  };

  const save = async () => {
    setSaving(true);
    setStatus("");

    try {
      await api.saveServices(services);
      setStatus("Services saved successfully.");
      navigate("/dashboard");
    } catch (error) {
      setStatus(error.message || "Could not save services");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="services-page">
      <h1 className="services-title">CHOOSE YOUR SERVICES</h1>
      <p className="services-subtitle">
        Select the services you’re interested in. You can update these anytime.
      </p>
      <div className="services-grid">
        {options.map((option) => (
          <label key={option.key} className={`service-card ${services[option.key] ? "selected" : ""}`}>
            <input
              type="checkbox"
              checked={services[option.key]}
              onChange={() => toggle(option.key)}
            />
            <div className="card-content">
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </div>
          </label>
        ))}
      </div>
      <button className="neon-next-btn" onClick={save} disabled={saving}>
        {saving ? "SAVING..." : "SAVE & CONTINUE →"}
      </button>
      {status && <p className="form-status">{status}</p>}
    </section>
  );
}
