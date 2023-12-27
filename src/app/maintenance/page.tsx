"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TableType = "sailors" | "boats" | "reserves";

export default function Maintenance() {
  const [table, setTable] = useState<TableType>("sailors");

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(57,100%,80%)]">Data</span> Maintenance
      </h1>

      <div className="flex items-center gap-2">
        <p className="text-md">Current table selected: </p>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Table" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sailors">Sailors</SelectItem>
            <SelectItem value="boats">Boats</SelectItem>
            <SelectItem value="reserves">Reserves</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="/maintenance/select?"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Select →</h3>
          <div className="text-lg">
            Lakukan pengolahan data seperti select, insert, update, dan delete.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="https://create.t3.gg/en/introduction"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Insert →</h3>
          <div className="text-lg">
            Dapatkan laporan mengenai data yang tersimpan.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="https://create.t3.gg/en/introduction"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Update →</h3>
          <div className="text-lg">
            Dapatkan laporan mengenai data yang tersimpan.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="https://create.t3.gg/en/introduction"
          target="_blank"
        >
          <h3 className="text-2xl font-bold">Delete →</h3>
          <div className="text-lg">
            Dapatkan laporan mengenai data yang tersimpan.
          </div>
        </Link>
        <Link href="/">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </div>
  );
}
