import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  // FETCH SINGLE EVENT
  useEffect(() => {
    axios.get(`${API}/events`).then((res) => {
      const found = res.data.find((ev) => ev._id === id);
      setEvent(found);
    });
  }, [id]);

  if (!event) return <h2>Loading...</h2>;

  // ⭐ FIXED: Correct creator check (works with both formats)
  const isCreator =
    user &&
    (user._id === event.createdBy?._id || user._id === event.createdBy);

  // CHECK ATTENDEE
  const isAttending = user && event.attendees?.includes(user._id);

  // RSVP FUNCTIONS
  const handleRSVP = async () => {
    await axios.post(`${API}/events/${event._id}/rsvp`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  const handleCancel = async () => {
    await axios.post(`${API}/events/${event._id}/cancel`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      {/* EVENT IMAGE */}
      <img
        src={`http://localhost:5000/${event.image}`}
        style={{ width: "50%", borderRadius: 10, marginBottom: 20 }}
      />

      {/* EVENT TITLE */}
      <h1>{event.title}</h1>

      {/* EVENT DETAILS */}
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Location:</strong> {event.location}</p>

      {/* ATTENDEE COUNT */}
      <p><strong>Attendees:</strong> {event.attendees.length} / {event.capacity}</p>

      <p style={{ marginTop: 10 }}>{event.description}</p>

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: 20 }}>
        {!isCreator && user && (
          isAttending ? (
            <button onClick={handleCancel}>Leave Event</button>
          ) : (
            <button onClick={handleRSVP}>Join Event</button>
          )
        )}

        {/* ⭐ NOW DELETE + EDIT WORK FOR CREATORS */}
        {isCreator && (
          <>
            <Link to={`/edit-event/${event._id}`}>Edit</Link>
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteEvent(event._id, token, navigate, API)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// DELETE EVENT
async function deleteEvent(id, token, navigate, API) {
  await axios.delete(`${API}/events/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  navigate("/");
}
