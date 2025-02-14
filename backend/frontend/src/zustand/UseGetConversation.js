import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
     const BASE_URL = "http://localhost:5000";

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
                const res = await axios.get(`${BASE_URL}/api/users`,{withCredentials: true});

				if (res.data.error) {
					throw new Error(res.data.error);
				}
				setConversations(res.data);
			} catch (error) {
				console.log(error.message);
                toast.error("something went wrong");
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;