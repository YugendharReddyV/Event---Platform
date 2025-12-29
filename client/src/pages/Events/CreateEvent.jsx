import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("location", form.location);
    formData.append("capacity", form.capacity);
    formData.append("image", image);

    try {
      await axios.post(`${API}/events`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      navigate("/");
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Event</h2>

      {error && <p className="error">{error}</p>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input type="date"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input type="time"
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <input placeholder="Location"
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />
        <input type="number" placeholder="Capacity"
          onChange={(e) => setForm({ ...form, capacity: e.target.value })}
        />
        <input type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button>Create Event</button>
      </form>
    </div>
  );
}
