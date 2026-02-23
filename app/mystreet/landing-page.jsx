"use client";

import dynamic from "next/dynamic";

const MyStreetLanding = dynamic(() => import("./MyStreetLanding"), { ssr: false });

export default function MyStreetPage() {
  return <MyStreetLanding />;
}