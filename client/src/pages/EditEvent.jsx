import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    api.get(`/api/events/${id}`).then((res) => {
      setForm({
        title: res.data.title,
        description: res.data.description,
        date: res.data.date,
        time: res.data.time,
        location: res.data.location,
        capacity: res.data.capacity,
      });
    });
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/api/events/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/event/${id}`);
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-7 mb-5">
          <div className="card shadow" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-4">
              <h3 className="fw-bold mb-4 text-center">Edit Event</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Capacity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                  />
                </div>

                <button className="btn btn-primary w-100">
                  Update Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
