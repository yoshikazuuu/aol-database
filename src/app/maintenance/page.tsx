"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Maintenance() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(57,100%,80%)]">Data</span> Maintenance
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href={`/maintenance/select`}
        >
          <h3 className="text-2xl font-bold">Select →</h3>
          <div className="text-lg">
            Lihat data yang tersimpan di dalam database.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href={`/maintenance/insert`}
        >
          <h3 className="text-2xl font-bold">Insert →</h3>
          <div className="text-lg">Tambahkan data baru ke dalam database.</div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href={`/maintenance/update`}
        >
          <h3 className="text-2xl font-bold">Update →</h3>
          <div className="text-lg">
            Perbarui data yang tersimpan di dalam database.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href={`/maintenance/delete`}
        >
          <h3 className="text-2xl font-bold">Delete →</h3>
          <div className="text-lg">
            Hapus data yang tersimpan di dalam database.
          </div>
        </Link>
        <Link href="/">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </div>
  );
}
