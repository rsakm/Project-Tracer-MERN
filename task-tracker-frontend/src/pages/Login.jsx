import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">Login</button>
       
<p className="text-sm mt-2 text-center">
  Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
</p>

      </form>
    </div>
  );
}
export default Login;
