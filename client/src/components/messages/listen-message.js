import { useEffect } from "react";
import { UseSocketContext} from "../../context/SocketContext"
import  useConversation from '../../zustand/UseCoversation'
import notificationSound from '../../assets/frontend_src_assets_sounds_notification.mp3'

const useListenMessages = () => {
    const {socket} = UseSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const notification = new Audio(notificationSound);
      notification.play();
     setMessages([...messages, newMessage]);
    })
      return () => socket?.off("newMessage")

    }, [socket, messages, setMessages]);
}

export default useListenMessages