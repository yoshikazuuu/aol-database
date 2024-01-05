"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import Link from "next/link";

interface SailorsCountData {
  count: number;
}

interface BoatsCountData {
  count: number;
}

interface AvgRatingData {
  avg: number;
}

interface AvgAgeData {
  avg: number;
}

export default function Report() {
  const { data: sailorsCount } =
    api.database.countSailors.useQuery<SailorsCountData[]>();
  const { data: boatsCount } =
    api.database.countBoats.useQuery<BoatsCountData[]>();
  const { data: avgRating } =
    api.database.averageRating.useQuery<AvgRatingData[]>();
  const { data: avgAge } = api.database.averageAge.useQuery<AvgAgeData[]>();

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

  const sailorsCountValue = Number(sailorsCount[0]?.count ?? 0);
  const boatsCountValue = Number(boatsCount[0]?.count ?? 0);
  const avgRatingValue = Number(avgRating[0]?.avg ?? 0);
  const avgAgeValue = Number(avgAge[0]?.avg ?? 0);

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(57,100%,80%)]">Data</span> Report
      </h1>
      <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2 md:gap-8">
        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">Jumlah Sailors</h3>
          <div className="text-7xl font-black">{sailorsCountValue}</div>
        </div>

        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">Jumlah Boats</h3>
          <div className="text-7xl font-black">{boatsCountValue}</div>
        </div>

        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">
            Rata-rata Rating Sailors
          </h3>
          <div className="text-7xl font-black">{avgRatingValue.toFixed(2)}</div>
        </div>

        <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
          <h3 className="text-2xl font-bold tracking-tight">
            Rata-rata Age Sailors
          </h3>
          <div className="text-7xl font-black">{avgAgeValue.toFixed(2)}</div>
        </div>

        <Link href="/" className="text-left">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </div>
  );
}
