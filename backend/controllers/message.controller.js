import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


//SEND MESSAGE
const sendMessage = async(req,res) => {

    console.log("send message", req.body)
 try {
    const {message, senderId} = req.body;
    const {id: receiverId} = req.params;

    let FindConversation = await Conversation.findOne({
        participants: {$all: [senderId, receiverId]},
    });
 
    if(!FindConversation){
        FindConversation =  await Conversation.create({
            participants: [senderId, receiverId],
            messages: [],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message
    })
    
    if(newMessage){
        FindConversation.messages.push(newMessage._id)
    }

    await Promise.all([FindConversation.save(), newMessage.save()])

    res.status(201).json(newMessage)

 } catch (error) {
    console.log("Error sending message", error.message);
    res.json({
        status: 500,
        error: error.message || 'An error occurred'
    })
 }
}

//GET ALL MESSAGES
const getMesages = async (req, res) => {
 try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
        participants: {$all: [senderId, userToChatId]},
    }).populate("messages");
    
    if(!conversation) return res.status(200).json([]);
    const messages = conversation.messages

    res.status(200).json(messages);

 } catch (error) {
    console.log("Error receiving message", error.message)
    res.json({
        status: 500,
        error: error.message || 'An error occurred'
    })
 }
}


export {sendMessage, getMesages}