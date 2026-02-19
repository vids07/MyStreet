"use client";

import dynamic from "next/dynamic";

const MyStreetMap = dynamic(() => import("./MyStreetMap"), {
  ssr: false,
});

export default function MyStreetPage() {
  return <MyStreetMap />;
}
