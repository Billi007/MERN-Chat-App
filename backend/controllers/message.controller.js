import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/socket.js";

//SEND MESSAGE
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let FindConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!FindConversation) {
      FindConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      FindConversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    await Promise.all([FindConversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error sending message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET ALL MESSAGES
const getMesages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error receiving message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const searchMessages = async (req, res) => {
//   const { receiverId, query } = req.query;
// try {
//   const messages = await Message.find({
//     receiverId,
//     content: {$regex: query}
//   });
//   if (!messages) return;

//   res.status(200).json(messages);
// } catch (error) {
//   console.log(error.message);
//   res.status(500).json({ error: "can't search messages" });
// }
// }
 export { sendMessage, getMesages };
