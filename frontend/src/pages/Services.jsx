import { useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <section className="services-intro">
      <h1>Unlock Our Services</h1>
      <button className="neon-next-btn" onClick={() => navigate("/services/select")}>
        NEXT →
      </button>
    </section>
  );
}
