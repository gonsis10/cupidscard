"use client";

import { Suspense } from "react";

export default function CardPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CardClient />
		</Suspense>
	);
}
