import { useState } from "react";
import { loginUser } from "../../api";
import "./index.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await loginUser({ email, password });
      console.log(response);
      setMessage(`Success : ${response?.message}, ${response?.data?.user?.name}`);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setMessage(
          `Error : ${(error as { message?: string }).message || "Login failed. Please try again."}`
        );
      } else {
        setMessage("Error : Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p className={`message ${message?.toLowerCase()}`}>{message}</p>}
    </div>
  );
};

export default LoginForm;
