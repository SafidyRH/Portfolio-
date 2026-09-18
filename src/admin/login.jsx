import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";

function Login() {
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.set("flow", mode);

    try {
      await signIn("password", formData);
    } catch {
      setError(
        mode === "signIn"
          ? "Identifiants incorrects ou accès non autorisé."
          : "Impossible de créer cet accès. Vérifiez l’adresse administrateur et le mot de passe.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login-shell">
      <a href="/" className="admin-back-link">
        ← Retour au portfolio
      </a>
      <section className="admin-login-card" aria-labelledby="login-title">
        <div className="justify-items-center">
          <div className="admin-brand-mark">SR</div>
        </div>
        <p className="admin-eyebrow">Espace privé</p>
        <h1 id="login-title">Pilotage portfolio</h1>

        <form className="admin-form mt-6" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span>Adresse e-mail</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              required
            />
          </label>
          <label className="admin-field">
            <span>Mot de passe</span>
            <div className="admin-password-field">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={
                  mode === "signIn" ? "current-password" : "new-password"
                }
                placeholder="8 caractères minimum"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </label>

          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="admin-primary-button admin-login-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Connexion…"
              : mode === "signIn"
                ? "Se connecter"
                : "Créer mon accès"}
          </button>
        </form>

        <button
          className="admin-mode-button"
          type="button"
          onClick={() => {
            setMode((value) => (value === "signIn" ? "signUp" : "signIn"));
            setError("");
          }}
        >
          {mode === "signIn"
            ? "Première connexion ? Initialiser le compte"
            : "J’ai déjà un compte"}
        </button>
      </section>
    </main>
  );
}

export default Login;
