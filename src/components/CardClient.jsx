"use client";

import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";

export default function CardClient() {
	const searchParams = useSearchParams();
	const videoUrl = searchParams.get("video");

	if (!videoUrl) {
		return <p className="text-white text-center mt-10">No video found!</p>;
	}

	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
			<div className="flex items-center gap-2 mb-12">
				<Heart className="w-8 h-8 text-pink-500" />
				<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">CupidsCard</h1>
			</div>
			<h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">Your Valentine's Card</h1>
			<div className="w-full max-w-xs aspect-[9/16]">
				<video controls className="w-full h-full rounded-lg border border-pink-500/10">
					<source src={videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	);
}
