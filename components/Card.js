import React from "react";
import Image from "next/image";

export default function Card({ thumbnail }) {
  return (
    <Image
      width={250}
      height={120}
      objectFit="cover"
      className="rounded-lg mx-2 hover:brightness-75"
      src={thumbnail.url}
      alt={thumbnail.title}
    />
  );
}
