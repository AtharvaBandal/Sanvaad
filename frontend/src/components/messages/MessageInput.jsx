import { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage.jsx";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!message.trim()) return; // Check if message is not empty

		try {
			await sendMessage(message);
		} catch (error) {
			console.error("Error sending message:", error);
		} finally {
			setMessage(""); // Clear the input field regardless of success or failure
		}
	};

	return (
		<form onSubmit={handleSubmit} className="px-4 my-3">
			<div className="w-full relative">
				<input
					type="text"
					className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
					placeholder="Send a message"
					value={message} // Ensure the input value is controlled
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type="submit"
					className="absolute inset-y-0 end-0 flex items-center pe-3"
				>
					{loading ? (
						<div className="loading loading-spinner"></div>
					) : (
						<BiSend />
					)}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
