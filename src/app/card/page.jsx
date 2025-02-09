"use client";

import { useSearchParams } from "next/navigation";

export default function CardPage() {
    const searchParams = useSearchParams();
    const videoUrl = searchParams.get("video");

    if (!videoUrl) {
        return <p className="text-white text-center mt-10">No video found!</p>;
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                Your Valentine's Card
            </h1>
            <video controls className="w-full max-w-lg rounded-lg border border-pink-500/10">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
