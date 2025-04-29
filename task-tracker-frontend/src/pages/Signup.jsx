import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold">Sign Up</h2>
        {["name", "email", "password", "country"].map((field) => (
          <input key={field} type={field === "password" ? "password" : "text"} placeholder={field}
            className="w-full px-3 py-2 border rounded"
            value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required />
        ))}
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Register</button>

        <p className="text-sm mt-2 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
        </p>  
        
      </form>
    </div>
  );
}
export default Signup;
