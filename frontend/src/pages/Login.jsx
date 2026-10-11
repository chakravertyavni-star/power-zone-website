import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      const data = await api.login(loginForm);
      login(data.token);
      navigate("/services");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const onSignup = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");

    try {
      await api.signup(signupForm);
      setMode("login");
      setLoginForm({ email: signupForm.email, password: "" });
      setError("");
      setSignupForm({ name: "", email: "", password: "" });
      alert("Signup successful! Please login.");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="rave-section">
      <div className="rave-stage">
        <div className="login-overlay">
          {mode === "login" ? (
            <form className="login-box" onSubmit={onLogin}>
              <h2>Member Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
              <button type="submit" disabled={busy}>{busy ? "Please wait..." : "Login"}</button>
              {error && <p className="form-status error">{error}</p>}
              <p className="login-note">
                Don’t have an account?
                <span className="toggle-link" onClick={() => { setMode("signup"); setError(""); }}> Sign up</span>
              </p>
            </form>
          ) : (
            <form className="login-box" onSubmit={onSignup}>
              <h2>Create Account</h2>
              <input
                type="text"
                placeholder="Full Name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                required
              />
              <button type="submit" disabled={busy}>{busy ? "Please wait..." : "Sign Up"}</button>
              {error && <p className="form-status error">{error}</p>}
              <p className="login-note">
                Already have an account?
                <span className="toggle-link" onClick={() => { setMode("login"); setError(""); }}> Login</span>
              </p>
            </form>
          )}
        </div>

        <div className="rave-container" aria-hidden="true">
          <div className="box">
            {Array.from({ length: 16 }, (_, i) => (
              <span key={i} style={{ "--i": i + 1 }}>
                <i>LIFT</i> SWEAT <i>REPEAT</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
