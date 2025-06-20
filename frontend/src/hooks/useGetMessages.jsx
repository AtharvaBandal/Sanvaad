import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversations";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				// Make sure to include credentials with the request
				const res = await fetch(`https://sanvaad.onrender.com/api/messages/${selectedConversation._id}`, {
					method: 'GET',
					credentials: 'include', // Ensures cookies are sent
				});

				const data = await res.json();

				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) 
			getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};

export default useGetMessages;
