import axios from "axios"
import { useState } from "react"
import {useNavigate}  from 'react-router-dom'

const Form = () => {
  const [formData, setFormData] = useState({ name: "", email: "", occupation: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4400/data", formData);
      console.log(response);
      navigate(`/view`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto my-20 ">
      <h1 className="text-2xl font-bold mb-4 text-center">Submit Your Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-96">
        <label className="block">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Occupation:</span>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form
