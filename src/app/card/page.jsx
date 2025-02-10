"use client";

import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function CardPage() {
    const searchParams = useSearchParams();
    const videoUrl = searchParams.get("video");
    const [isCopied, setIsCopied] = useState(false);

    if (!videoUrl) {
        return <p className="text-white text-center mt-10">No video found!</p>;
    }

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset the state after 2 seconds
        } catch (error) {
            console.error("Failed to copy URL", error);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-12">
                <Heart className="w-8 h-8 text-pink-500" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">CupidsCard</h1>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                Your Valentine's Card
            </h1>
            <div className="w-full max-w-xs aspect-[9/16]">
                <video controls className="w-full h-full rounded-lg border border-pink-500/10">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <button
                onClick={handleCopyClick}
                className="mt-8 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full"
            >
                {isCopied ? "URL Copied!" : "Copy URL"}
            </button>
        </div>
    );
}
