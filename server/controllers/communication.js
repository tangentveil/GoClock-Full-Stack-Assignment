import Message from "../models/manufacturer.js";

// send message from manufacturer side
export const manufacturer = async (req, res) => {
  // Extract data from the request body
  const { orderID, to, from, quantity, address, transporter } = req.body;

  try {
    const newMessage = new Message({
      orderID,
      to,
      from,
      quantity,
      address,
      transporter,
    });

    newMessage.save();
    res.status(200).json("Message sent successfully");
  } catch (error) {
    res.status(500).json("An error occurred while sending the message");
  }
};

// reply message from transporter side
export const transporter = async (req, res) => {

  const { orderID, price } = req.body;

  Message.findOne({ orderID })
    .then((message) => {
      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      // Update the reply field
      message.price = price;

      // Save the updated message
      return message.save();
    })
    .then(() => {
      res.status(200).json({ message: "Reply sent successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while sending the reply" });
    });
};


// fetch all messages
export const Allmessages = async(req, res) => {
  Message.find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the messages" });
    });
}