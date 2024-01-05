"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";

export default function Report() {
  const { data: sailorsCount } = api.database.countSailors.useQuery();
  const { data: boatsCount } = api.database.countBoats.useQuery();
  const { data: avgRating } = api.database.averageRating.useQuery();
  const { data: avgAge } = api.database.averageAge.useQuery();

  if (!sailorsCount || !boatsCount || !avgRating || !avgAge) {
    return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(57,100%,80%)]">Data</span> Report
        </h1>
        <div>Loading...</div>
      </div>
    );
  }

  console.log(sailorsCount, boatsCount, avgRating, avgAge);

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(57,100%,80%)]">Data</span> Report
      </h1>
      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 md:gap-8">
        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">Jumlah Sailors</h3>
          <div className="text-7xl font-black">
            {Number(sailorsCount[0]["COUNT(*)"])}
          </div>
        </div>

        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">Jumlah Boats</h3>
          <div className="text-7xl font-black">
            {Number(boatsCount[0]["COUNT(*)"])}
          </div>
        </div>

        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">
            Rata-rata Rating Sailors
          </h3>
          <div className="text-7xl font-black">
            {avgRating[0]["AVG(rating)"] === null
              ? 0
              : avgRating[0]["AVG(rating)"].toFixed(2)}
          </div>
        </div>

        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">
            Rata-rata Age Sailors
          </h3>
          <div className="text-7xl font-black">
            {avgAge[0]["AVG(age)"] === null
              ? 0
              : avgAge[0]["AVG(age)"].toFixed(2)}
          </div>
        </div>

        <Link href="/" className="text-left">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </div>
  );
}
