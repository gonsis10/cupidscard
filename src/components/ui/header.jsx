import { Heart } from "lucide-react";

export function Header() {
	return (
		<div className="flex items-center gap-2 mb-12">
			<Heart className="w-8 h-8 text-pink-500" />
			<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">CupidsCard</h1>
		</div>
	);
}
