import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import MessageList from "./MessageList";
import './Manufacturer.css'
import { useSelector } from "react-redux";

const Manufacturer = () => {
  const userData = JSON.parse(localStorage.getItem("Profile"));
  const Address = userData?.address

  // console.log(Address)

  const [orderID, setOrderID] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState(Address);
  const [transporter, setTransporter] = useState("transporter1");

  // Function to generate a random alphanumeric code of length 5
  const generateOrderID = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  // Generate the orderID
  useEffect(()=>{
    const newOrderID = generateOrderID();
    setOrderID(newOrderID);
  },[setOrderID])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = { orderID, to, from, quantity, address, transporter };

    const sendMessage = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/communication/send-message`,
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
    sendMessage();

    // Reset the form fields
    setOrderID("");
    setTo("");
    setFrom("");
    setQuantity("");
    setAddress("");
    setTransporter("");
  };

  return (
    <div className="manufacturer-page-container">
      <Navbar/>
      <div className="manufacturer-card">
        <h2>Manufacturer Page</h2>
        <form className="manufacturer-form" onSubmit={handleSubmit}>
          <label>
            <h4>Order ID:</h4>
            <input
              type="text"
              value={orderID}
              onChange={(e) => setOrderID(e.target.value)}
            />
          </label>

          <label>
            <h4>To:</h4>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </label>

          <label>
            <h4>From:</h4>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </label>

          <label>
            <h4>Quantity:</h4>
            <select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            >
              <option value="1">1 ton</option>
              <option value="2">2 tons</option>
              <option value="3">3 tons</option>
            </select>
          </label>

          <label>
            <h4>Address:</h4>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>

          <label>
            <h4>Transporter:</h4>
            <select
              value={transporter}
              onChange={(e) => setTransporter(e.target.value)}
            >
              <option value="transporter1">Transporter 1</option>
            </select>
          </label>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="messageList">
        <MessageList />
      </div>
    </div>
  );
};

export default Manufacturer;
