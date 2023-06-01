import React, { useState, useEffect } from "react";
import "./MessageList.css";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch messages from the backend API
    fetch("http://localhost:5000/communication/received-messages")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.reverse());
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching messages:", error));
  }, []);

  // console.log(messages[4].price)

  return (
    <div className="message-list-container">
      <div>
        <div>
          <h2 className="message-list-header">Message List</h2>
        </div>

        <div>
          <input
            className="message-list-input"
            type="text"
            value={search}
            placeholder="Search by orderID..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="message-list-item">
          {search !== ""
            ? messages
                .filter((message) =>
                  message.orderID.toLocaleLowerCase().includes(search)
                )
                .map((message) => {
                  return (
                    <div className="message-list-item" key={message._id}>
                      <div className="list-item">
                        <span>Order ID :</span>
                        <p>{message.orderID}</p>
                      </div>
                      <div className="list-item">
                        <span>To:</span> <p>{message.to}</p>
                      </div>
                      <div className="list-item">
                        <span>From:</span> <p>{message.from}</p>
                      </div>
                      <div className="list-item">
                        <span>Quatity:</span> <p>{message.quantity}</p>
                      </div>
                      <div className="list-item">
                        <span>address:</span> <p>{message.address}</p>
                      </div>
                      <div className="list-item">
                        <span>Transporter:</span> <p>{message.transporter}</p>
                      </div>
                      {message.price === "" ? (
                        ""
                      ) : (
                        <div className="list-item">
                          <span>Price:</span> <p>{message.price}</p>
                        </div>
                      )}
                      <div className="line"></div>
                    </div>
                  );
                })
            : messages.map((message) => {
                return (
                  <div className="message-list-item" key={message._id}>
                    <div className="list-item">
                      <span>Order ID :</span>
                      <p>{message.orderID}</p>
                    </div>
                    <div className="list-item">
                      <span>To:</span> <p>{message.to}</p>
                    </div>
                    <div className="list-item">
                      <span>From:</span> <p>{message.from}</p>
                    </div>
                    <div className="list-item">
                      <span>Quatity:</span> <p>{message.quantity}</p>
                    </div>
                    <div className="list-item">
                      <span>address:</span> <p>{message.address}</p>
                    </div>
                    <div className="list-item">
                      <span>Transporter:</span> <p>{message.transporter}</p>
                    </div>
                    {message.price === undefined ? (
                      ""
                    ) : (
                      <div className="list-item">
                        <span>Price:</span> <p>{message.price}</p>
                      </div>
                    )}
                    <div className="line"></div>
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
};

export default MessageList;
