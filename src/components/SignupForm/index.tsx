import { useState } from "react";
import { signupUser } from "../../api";
import "./index.css";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await signupUser({ name, email, password });
      setMessage(`Success : ${response?.message}, ${response?.data?.name || name}`);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setMessage(
          `Error : ${(error as { message?: string }).message || "Signup failed. Please try again."}`
        );
      } else {
        setMessage("Error : Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {message && <p className={`message ${message?.toLowerCase()}`}>{message}</p>}
    </div>
  );
};

export default SignupForm;
