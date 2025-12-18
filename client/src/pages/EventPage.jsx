import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    api
      .get(`/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => {});
  }, [id]);

  const handleRSVP = async () => {
    try {
      const res = await api.post(
        `/api/events/${id}/rsvp`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.attendees) {
        setEvent(res.data);
      }
    } catch {}
  };

  const handleUnRSVP = async () => {
    try {
      const res = await api.post(
        `/api/events/${id}/unrsvp`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEvent(res.data);
    } catch {}
  };

  // 👇 Guest RSVP handler
  const handleGuestRSVP = () => {
    setShowLoginWarning(true);
  };

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  const isOwner = token && String(event.createdBy) === String(userId);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* LOGIN WARNING */}
          {showLoginWarning && (
            <div className="alert alert-warning d-flex justify-content-between align-items-center">
              <span>Please login to RSVP for this event.</span>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}

          <div
            className="card shadow"
            style={{ borderRadius: "1.25rem", overflow: "hidden" }}
          >
            {event.imageURL && (
              <img
                src={event.imageURL}
                alt="event"
                className="w-100"
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}

            <div className="card-body">
              <h3 className="fw-bold">{event.title}</h3>
              <p className="text-muted">{event.description}</p>

              <div className="row mt-3">
                <div className="col-md-6">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Time:</strong> {event.time}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Location:</strong> {event.location}</p>
                  <p>
                    <strong>Attendees:</strong>{" "}
                    {event.attendees.length} / {event.capacity}
                  </p>
                </div>
              </div>

              <div className="mt-4 d-flex gap-2 flex-wrap">
                {/* OWNER */}
                {token && isOwner && (
                  <>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate(`/edit/${id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        await api.delete(`/api/events/${id}`, {
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        navigate("/");
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}

                {/* LOGGED-IN NON-OWNER */}
                {token && !isOwner && (
                  <>
                    <button className="btn btn-success" onClick={handleRSVP}>
                      RSVP
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={handleUnRSVP}
                    >
                      Leave
                    </button>
                  </>
                )}

                {/* GUEST */}
                {!token && (
                  <button
                    className="btn btn-warning"
                    onClick={handleGuestRSVP}
                  >
                    RSVP
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventPage;
