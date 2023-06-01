import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import MessageList from "../Manufacturer/MessageList";
import './Transporter.css'

const Transporter = () => {
  const [orderID, setOrderID] = useState("");
  const [messages, setMessages] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    // Fetch messages from the backend API
    fetch("http://localhost:5000/communication/received-messages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.log("Error fetching messages:", error));
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = { orderID, price };

    // Send the form data to the backend API endpoint
    // ...
    const sendReply = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/communication/send-reply`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log("Message sent successfully");
      } catch (error) {
        console.log(error);
      }
    };

    // Call the sendMessage function
    sendReply();

    // Reset the form fields
    setOrderID("");
    setPrice("");
  };

  return (
    <div className="transporter-container">
      <Navbar />
      <div className="transporter-card">
        <h2>Transporter Page</h2>
        <form onSubmit={handleSubmit} className="transporter-form">
          <label>
            <h4>Order ID:</h4>
            <select
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            >
              {messages.map((id) => {
                return (
                  <option key={id.orderID} value={id.orderID}>
                    {id.orderID}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            <h4>Price:</h4>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <button type="submit">Reply</button>
        </form>
      </div>
      <div className="messageList">
        <MessageList />
      </div>
    </div>
  );
};

export default Transporter;
