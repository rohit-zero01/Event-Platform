import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("/api/events")
      .then((res) => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Upcoming Events</h3>

      {events.length === 0 ? (
        <p className="text-muted">No events available</p>
      ) : (
        <div className="row g-4">
          {events.map((event) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={event._id}>
              <div
  className="card h-100 shadow-sm event-card"
  style={{ borderRadius: "1.25rem", overflow: "hidden" }}
>

                {event.imageURL ? (
                  <img
                  src={event.imageURL}
                  className="card-img-top rounded-top-4"
                  alt="event"
                  style={{ height: "180px", objectFit: "cover" }}
                />                
                ) : (
                  <div
                    className="bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ height: "180px" }}
                  >
                    No Image
                  </div>
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text text-muted">
                    {event.description?.slice(0, 80)}...
                  </p>

                  <div className="mt-auto">
                    <Link
                      to={`/event/${event._id}`}
                      className="btn btn-primary w-100"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
