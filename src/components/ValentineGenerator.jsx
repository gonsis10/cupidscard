"use client";

import { useState } from "react";
import { Heart, Download, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

export default function ValentineGenerator() {
	const [message, setMessage] = useState("");
	const [recipient, setRecipient] = useState("");
	const [sender, setSender] = useState("");
	const router = useRouter();

	const handleGenerateVideo = async () => {
		const fullMessage = `To: ${recipient}\n\n${message}\n\nFrom: ${sender}`;

		const response = await fetch("http://127.0.0.1:5000/generate_video", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: fullMessage }),
		});

		const data = await response.json();

		if (data.video_url) {
			router.push(`/card?video=${encodeURIComponent(data.video_url)}`); // Client-side navigation
		}
	};

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
			<Header />
			<CardCreator message={message} setMessage={setMessage} recipient={recipient} setRecipient={setRecipient} sender={sender} setSender={setSender} onDownload={handleGenerateVideo} />
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<div className="flex items-center gap-2 mb-12">
			<Heart className="w-8 h-8 text-pink-500" />
			<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">CupidsCard</h1>
		</div>
	);
}

function CardCreator({ message, setMessage, recipient, setRecipient, sender, setSender, onDownload }) {
	return (
		<div className="w-full max-w-xl">
			<Card className="bg-zinc-900 border-pink-500/20">
				<CardContent className="p-6">
					<CardPreview message={message} recipient={recipient} sender={sender} />
					<CardForm message={message} setMessage={setMessage} recipient={recipient} setRecipient={setRecipient} sender={sender} setSender={setSender} onDownload={onDownload} />
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

function CardForm({ message, setMessage, recipient, setRecipient, sender, setSender, onDownload }) {
	return (
		<div className="space-y-6">
			<FormField id="recipient" label="To" value={recipient} onChange={setRecipient} placeholder="Recipient's name" />
			<FormField id="message" label="Your Message" value={message} onChange={setMessage} placeholder="Write your valentine message here..." multiline />
			<FormField id="sender" label="From" value={sender} onChange={setSender} placeholder="Your name" />
			<Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600" onClick={onDownload}>
				<Download className="w-4 h-4 mr-2" />
				Download Card
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
