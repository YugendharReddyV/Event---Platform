import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API}/events`);
        setEvents(res.data);
      } catch (err) {
        console.log("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  console.log(events);

  return (
    <div style={{ padding: 20 }}>
      <h1>Upcoming Events</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {events.map((ev) => (
          <div
            key={ev._id}
            style={{
              width: 300,
              background: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={ev.image ? `http://localhost:5000/${ev.image}` : ""}
              style={{ width: "100%", height: 180, objectFit: "cover", background: "#ddd" }}
              alt={ev.title}
            />

            <div style={{ padding: 15 }}>
              <h3 style={{ margin: "5px 0" }}>{ev.title}</h3>

              <p style={{ margin: 0, color: "#555" }}>
                {ev.date} at {ev.time}
              </p>

              <p style={{ margin: "5px 0", color: "#777" }}>
                {ev.location}
              </p>

              <Link
                to={`/event/${ev._id}`}
                style={{
                  display: "inline-block",
                  marginTop: 10,
                  padding: "8px 15px",
                  background: "black",
                  color: "white",
                  borderRadius: 5,
                  textDecoration: "none",
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
