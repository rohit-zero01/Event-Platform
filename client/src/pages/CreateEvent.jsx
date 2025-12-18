import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    data.append("image", image);

    console.log("FORM DATA:", form);
console.log("IMAGE:", image);
console.log("TOKEN:", localStorage.getItem("token"));


    try {
      await api.post("/api/events", data, {
        headers: { Authorization: `Bearer ${token}` },
      });      
      navigate("/");
    } catch {
      alert("Event creation failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 mb-5">
          <div className="card shadow" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4 text-center">Create Event</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input className="form-control" name="title" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" name="description" required onChange={handleChange} />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" name="date" required onChange={handleChange} />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time</label>
                    <input type="time" className="form-control" name="time" required onChange={handleChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input className="form-control" name="location" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Capacity</label>
                  <input type="number" className="form-control" name="capacity" required onChange={handleChange} />
                </div>

                <div className="mb-4">
                  <label className="form-label">Event Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <button className="btn btn-success w-100">Create Event</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
