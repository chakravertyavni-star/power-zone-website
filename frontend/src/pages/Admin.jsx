import { useEffect, useState } from "react";
import { api } from "../api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.adminUsers(), api.contactMessages()])
      .then(([nextUsers, nextMessages]) => {
        setUsers(nextUsers);
        setMessages(nextMessages);
      })
      .catch((err) => setError(err.message || "Not authorized"));
  }, []);

  return (
    <section className="admin-page">
      <h1>Admin Panel</h1>
      {error && <p className="form-status error">{error}</p>}

      <h2>Members</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Services</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const services = [];
              if (user.services?.personalTrainer) services.push("Trainer");
              if (user.services?.nutritionist) services.push("Nutritionist");
              if (user.services?.weekendSession) services.push("Weekend");
              return (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{services.join(", ") || "None"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Contact messages</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone || "-"}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
