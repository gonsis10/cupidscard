"use client";

import { useState, useEffect } from "react";
import { Heart, Download, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

export default function ValentineGenerator() {
	const [message, setMessage] = useState("");
	const [recipient, setRecipient] = useState("");
	const [sender, setSender] = useState("");
	const [loading, setLoading] = useState(false); // New loading state
	const router = useRouter();
	const [socket, setSocket] = useState(null);

	// Initialize WebSocket connection only once when the component mounts
	useEffect(() => {
		const newSocket = io("http://3.146.255.4:8000"); // Change this to your server's address if deployed
		setSocket(newSocket);

		// Cleanup socket connection on unmount
		return () => {
			newSocket.disconnect();
		};
	}, []);

	const handleGenerateVideo = async () => {
		if (!socket) {
			console.error("Socket not connected yet.");
			return;
		}

		setLoading(true); // Set loading to true when the button is clicked

		// Ensure listeners are only added once
		socket.off("video_ready").on("video_ready", (data) => {
			console.log("Video is ready:", data.video_url);
			setLoading(false); // Set loading to false once the video is ready
			router.push(`/card?video=${encodeURIComponent(data.video_url)}`); // Navigate when ready
		});

		socket.off("video_failed").on("video_failed", (data) => {
			console.error("Video generation failed:", data.error);
			setLoading(false); // Set loading to false if there's an error
			alert("Failed to generate video. Please try again.");
		});

		// Send video generation request
		const response = await fetch("http://3.146.255.4:8000/generate_video", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Socket-ID": socket.id, // Send the socket ID to identify the client
			},
			body: JSON.stringify({ recipient, sender, message }),
		});

		const result = await response.json();
		console.log("Server response:", result);
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
			<Header />
			<CardCreator
				message={message}
				setMessage={setMessage}
				recipient={recipient}
				setRecipient={setRecipient}
				sender={sender}
				setSender={setSender}
				onDownload={handleGenerateVideo}
				loading={loading}
			/>
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<div className="w-full max-w-xl flex flex-col items-center text-center space-y-3 mb-5">
			<div className="flex items-center gap-2">
				<Heart className="w-8 h-8 text-pink-500" />
				<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">CupidsCard</h1>
			</div>
			<h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">for a very very special valentine</h1>
		</div>
	);
}

function CardCreator({ message, setMessage, recipient, setRecipient, sender, setSender, onDownload, loading }) {
	return (
		<div className="w-full max-w-xl">
			<Card className="bg-zinc-900 border-pink-500/20">
				<CardContent className="p-6">
					<CardPreview message={message} recipient={recipient} sender={sender} />
					<CardForm message={message} setMessage={setMessage} recipient={recipient} setRecipient={setRecipient} sender={sender} setSender={setSender} onDownload={onDownload} loading={loading} />
				</CardContent>
			</Card>
		</div>
	);
}

function CardPreview({ message, recipient, sender }) {
	return (
		<div className="bg-gradient-to-br from-pink-500/5 to-rose-500/5 rounded-lg p-6 mb-6 min-h-[200px] border border-pink-500/10 relative">
			<div className="absolute -top-3 -right-3">
				<Sparkles className="w-6 h-6 text-pink-500/50" />
			</div>
			<div className="space-y-4">
				<p className="text-gray-400">Dear {recipient || "..."}</p>
				<p className="text-gray-300 whitespace-pre-wrap">{message || "Your message will appear here..."}</p>
				{sender && <p className="text-gray-400 text-right">Love, {sender}</p>}
			</div>
		</div>
	);
}

function CardForm({ message, setMessage, recipient, setRecipient, sender, setSender, onDownload, loading }) {
	return (
		<div className="space-y-6">
			<FormField id="recipient" label="To" value={recipient} onChange={setRecipient} placeholder="Recipient's name" />
			<FormField id="message" label="Your Message" value={message} onChange={setMessage} placeholder="Write your valentine message here..." multiline />
			<FormField id="sender" label="From" value={sender} onChange={setSender} placeholder="Your name" />
			<Button
				className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
				onClick={onDownload}
				disabled={loading} // Disable button while loading
			>
				{loading ? (
					<span>Loading...</span>
				) : (
					<>
						<Download className="w-4 h-4 mr-2" />
						Download Card
					</>
				)}
			</Button>
		</div>
	);
}

function FormField({ id, label, value, onChange, placeholder, multiline = false }) {
	const InputComponent = multiline ? Textarea : Input;
	return (
		<div className="space-y-2">
			<Label htmlFor={id} className="text-gray-400">
				{label}
			</Label>
			<InputComponent id={id} placeholder={placeholder} className="bg-zinc-800 border-pink-500/20" value={value} onChange={(e) => onChange(e.target.value)} {...(multiline ? { minrows: 3 } : {})} />
		</div>
	);
}

function Footer() {
	return (
		<div className="mt-8 text-center">
			<p className="text-gray-500 text-sm">Create beautiful valentine cards in seconds</p>
		</div>
	);
}
