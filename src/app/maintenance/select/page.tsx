"use client";

import { api } from "@/trpc/react";

import { useState } from "react";
import { type boats, type reserves, type sailors } from "@prisma/client";
import SelectMenu from "@/components/select-menu";
import { type TableType } from "@/types/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const selectedTable = useSearchParams().get("table") as TableType;

  const [table, setTable] = useState<TableType>(selectedTable || "sailors");

  const handleSelectChange = (newValue: TableType) => {
    setTable(newValue);
    router.replace(`/maintenance/select?table=${newValue}`);
  };

  let data;

  if (table === "sailors") {
    data = api.database.selectSailor.useQuery();
  } else if (table === "boats") {
    data = api.database.selectBoat.useQuery();
  } else {
    data = api.database.selectReserve.useQuery();
  }

  if (data.isLoading) {
    return (
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(57,100%,80%)]">Select</span> Data
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-md">Current table selected: </p>
          <SelectMenu value={table} onChange={handleSelectChange} />
        </div>

        <p className="py-10">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(57,100%,80%)]">Select</span> Data
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-md">Current table selected: </p>
          <SelectMenu value={table} onChange={handleSelectChange} />
        </div>

        {table === "sailors" && (
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(data.data as sailors[])?.map((sailor) => (
              <div className="flex w-[80vw] flex-row items-center justify-between gap-2 rounded-md border p-3 sm:w-[300px]">
                <p className="text-md">
                  Name: {sailor.sname}
                  <br /> Rating: {sailor.rating}
                  <br /> Age: {sailor.age}
                </p>
                <p className="text-4xl font-extrabold">{sailor.sid}</p>
              </div>
            ))}
          </div>
        )}

        {table === "boats" && (
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(data.data as boats[])?.map((boat) => (
              <div className="flex w-[80vw] flex-row items-center justify-between gap-2 rounded-md border p-3 sm:w-[300px]">
                <p className="text-md">
                  {boat.bid} - {boat.bname} - {boat.color}
                </p>
                <p className="text-4xl font-extrabold">{boat.bid}</p>
              </div>
            ))}
          </div>
        )}

        {table === "reserves" && (
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(data.data as reserves[])?.map((reserve) => (
              <div className="flex w-[80vw] flex-row items-center justify-between gap-2 rounded-md border p-3 sm:w-[300px]">
                <p className="text-md">
                  Days: {reserve.days}
                  <br />
                  Sailor ID: {reserve.sid}
                  <br />
                  Boat ID:{reserve.bid}
                </p>
              </div>
            ))}
          </div>
        )}
        <Link href="/maintenance">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </>
  );
}
