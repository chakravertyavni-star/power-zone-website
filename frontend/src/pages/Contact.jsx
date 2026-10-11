import { useState } from "react";
import { api } from "../api";

const initial = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const onChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });

    try {
      const data = await api.sendContact(form);
      setStatus({ type: "success", text: data.message || "Message sent successfully" });
      setForm(initial);
    } catch (error) {
      setStatus({ type: "error", text: error.message || "Could not send message" });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="hero-content">
          <h1>Get in Touch</h1>
          <p>We're here to help you start strong</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Power Zone Gym</h2>
            <p>
              Have questions about memberships, classes, or training?<br />
              Reach out and we'll get back to you shortly.
            </p>
            <ul>
              <li><strong>Address:</strong> Sector Chi V, Greater Noida</li>
              <li><strong>Email:</strong> chakravertyavni@gmail.com</li>
              <li><strong>Hours:</strong> Mon – Sun : 5 AM – 11 PM</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <h2>Send a Message</h2>
            <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={onChange} required />
            <input name="email" type="email" placeholder="Your Email" value={form.email} onChange={onChange} required />
            <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={onChange} />
            <textarea name="message" rows="5" placeholder="Your Message" value={form.message} onChange={onChange} required />
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send Message"}
            </button>
            {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
