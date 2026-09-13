import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// Map each role to its exact target portal path
const ROLE_ROUTES = {
  Admin: "/Admin/dashboard",
  Trainee: "/trainee/dashboard",
  Provider: "/provider/dashboard",
  Employer: "/employer/dashboard",
};

export const ROLE_ACCOUNTS = {
  Admin: {
    email: "analyst@skilltrack.demo",
    code: "AD",
    subtitle: "State intelligence",
  },
  Employer: {
    email: "neha.mehta@skilltrack.demo",
    code: "EM",
    subtitle: "Hiring & verification",
  },
  Provider: {
    email: "kavita.joshi@skilltrack.demo",
    code: "PR",
    subtitle: "Cohorts & outcomes",
  },
  Trainee: {
    email: "aarav.sharma@skilltrack.demo",
    code: "TR",
    subtitle: "Personal journey",
  },
};

const normalizeApiRole = (role) => {
  if (!role) return "Trainee";
  const r = role.toString().trim().toLowerCase();
  if (r === "government" || r === "admin") return "Admin";
  if (r === "training_provider" || r === "provider") return "Provider";
  if (r === "employer") return "Employer";
  if (r === "trainee") return "Trainee";
  return r.charAt(0).toUpperCase() + r.slice(1);
};

export default function Login({
  onLogin,
  apiBase = "http://localhost:5000",
  demoMode = false,
}) {
  const navigate = useNavigate();

  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState(ROLE_ACCOUNTS.Admin.email);
  const [password, setPassword] = useState("Demo@26135!");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("maha-login-theme") || "light"
  );
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const roleInfo = useMemo(() => ROLE_ACCOUNTS[role], [role]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("maha-login-theme", theme);
  }, [theme]);

  function selectRole(nextRole) {
  setRole(nextRole);
  setEmail(ROLE_ACCOUNTS[nextRole].email);
  setPassword("Demo@26135!");

  // Reset all form/UI state
  setShowPassword(false);
  setStatus({ type: "", message: "" });
  setLoading(false);
}


  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    if (!email.includes("@")) {
      setStatus({
        type: "error",
        message: "Enter a valid official email address.",
      });
      return;
    }

    if (password.length < 8) {
      setStatus({
        type: "error",
        message: "Password must contain at least 8 characters.",
      });
      return;
    }

    setLoading(true);

    try {
      let session;

      if (demoMode) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (
          email !== roleInfo.email ||
          password !== "Demo@26135!"
        ) {
          throw new Error("Invalid demo credentials.");
        }

        session = {
          role,
          email,
          name: `${role} workspace`,
          demo: true,
        };
      } else {
        const response = await fetch(`${apiBase}/api/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            body.message || "Invalid email or password."
          );
        }

        session = {
          ...body.user,
          token: body.token,
          role: normalizeApiRole(body.user.role),
          demo: false,
        };
      }

      if (remember) {
        localStorage.setItem("maha-last-role", role);
      } else {
        localStorage.removeItem("maha-last-role");
      }

      setStatus({
        type: "success",
        message: `Access verified. Opening ${session.role} workspace.`,
      });

      // Update Auth Context State
      onLogin?.(session);

      // Redirect to the appropriate portal
      const targetPath =
        ROLE_ROUTES[session.role] || "/trainee/dashboard";

      navigate(targetPath, { replace: true });

    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Authentication service unavailable.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-shell">
      <aside className="login-story">
        <div className="login-brand">
          <span>MS</span>
          <div>
            <strong>MAHA-SKILL</strong>
            <small>OUTCOME INTELLIGENCE PLATFORM</small>
          </div>
        </div>

        <div className="login-story-copy">
          <div className="login-eyebrow">
            <i /> Secure role-based workspace
          </div>

          <h1>
            From training to <em>real outcomes.</em>
          </h1>

          <p>
            One trusted workspace for programme intelligence,
            trainee journeys, employer verification and provider
            performance.
          </p>

          <div className="login-trust">
            <article>
              <b>Role-scoped</b>
              <span>Authorized data only</span>
            </article>

            <article>
              <b>Auditable</b>
              <span>Tracked decisions</span>
            </article>

            <article>
              <b>Human-led AI</b>
              <span>Explainable support</span>
            </article>
          </div>
        </div>

        <footer>
          <span>SIH 26135 · Demonstration</span>
          <span>
            Fictional records · Not an official publication
          </span>
        </footer>
      </aside>

      <main className="login-main">
        <button
          className="login-theme"
          type="button"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>

        <form
          className="login-card-react"
          onSubmit={handleSubmit}
          noValidate
        >
          <header>
            <div>
              <small>AUTHORIZED ACCESS</small>
              <h2>Welcome back</h2>
              <p>
                Select your workspace and sign in securely.
              </p>
            </div>

            <span className="login-secure">
              <i /> Protected session
            </span>
          </header>

          <div
            className="login-roles"
            aria-label="Select account role"
          >
            {Object.entries(ROLE_ACCOUNTS).map(
              ([name, item]) => (
                <button
                  key={name}
                  className={`login-role ${
                    role === name ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => selectRole(name)}
                  aria-pressed={role === name}
                >
                  <span className="login-role-icon">
                    {item.code}
                  </span>

                  <span>
                    <b>{name}</b>
                    <small>{item.subtitle}</small>
                  </span>
                </button>
              )
            )}
          </div>

          <label className="login-field">
            <span>Official email</span>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="login-field">
            <span>Password</span>

            <div className="login-password">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </label>

          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) =>
                  setRemember(e.target.checked)
                }
              />
              Remember this device
            </label>

            <button type="button">
              Forgot password?
            </button>
          </div>

          <div className="login-notice">
            <div>
              <b>Demonstration Access</b>
              <span>Preset official demo credentials (password: Demo@26135!)</span>
            </div>
            <button type="button" onClick={() => setPassword("Demo@26135!")}>
              USE DEMO
            </button>
          </div>

          {status.message && (
            <div
              className={`login-status ${status.type}`}
              role={status.type === "error" ? "alert" : "status"}
            >
              {status.message}
            </div>
          )}

          <button
            className="login-submit-react"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Verifying secure access…"
              : "Continue to authorized workspace →"}
          </button>

          <p className="login-fine">
            By continuing, you agree to authorized use,
            privacy controls and audit logging.
          </p>
        </form>
      </main>
    </div>
  );
}