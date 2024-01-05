"use client";

import { api } from "@/trpc/react";

import { use, useEffect, useState } from "react";
import { type boats, type reserves, type sailors } from "@prisma/client";
import SelectMenu from "@/components/select-menu";
import { type TableType } from "@/types/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UpdateSailor } from "@/components/update-sailors";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const selectedTable = useSearchParams().get("table") as TableType;

  const [table, setTable] = useState<TableType>(selectedTable || "sailors");
  const [refresh, setRefresh] = useState(false);

  const handleSelectChange = (newValue: TableType) => {
    setTable(newValue);
    router.replace(`/maintenance/update?table=${newValue}`);
  };

  const sailorQuery = api.database.selectSailor.useQuery();
  const boatQuery = api.database.selectBoat.useQuery();
  const reserveQuery = api.database.selectReserve.useQuery();

  useEffect(() => {
    const refetch = () => {
      Promise.all([
        sailorQuery.refetch(),
        boatQuery.refetch(),
        reserveQuery.refetch(),
      ])
        .then(() => {
          setRefresh(!refresh);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to refetch! ❌");
        });
    };

    refetch();
  }, [refresh]);

  const data = (() => {
    switch (table) {
      case "sailors":
        return sailorQuery.data;
      case "boats":
        return boatQuery.data;
      case "reserves":
        return reserveQuery.data;
      default:
        return [];
    }
  })();

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(57,100%,80%)]">Update</span> Data
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-md">Current table selected: </p>
          <SelectMenu value={table} onChange={handleSelectChange} />
        </div>

        <p className="text-md">Click the item to update!</p>

        {table === "sailors" && (
          <div className="grid grid-cols-3 items-center gap-2">
            {(data as sailors[])?.map((sailor) => (
              <Dialog>
                <DialogTrigger>
                  <div className="flex w-[300px] cursor-pointer flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-yellow-300 hover:text-black active:scale-[0.97]">
                    <p className="text-md text-left">
                      Name: {sailor.sname}
                      <br /> Rating: {sailor.rating}
                      <br /> Age: {sailor.age}
                    </p>
                    <p className="text-4xl font-extrabold">{sailor.sid}</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update</DialogTitle>
                    <DialogDescription>
                      Rubah data yang ada kemudian klik update!
                    </DialogDescription>
                    <div className="flex flex-col space-y-3 py-4">
                      <UpdateSailor
                        data={sailor}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        {table === "boats" && (
          <div className="grid grid-cols-3 items-center gap-2">
            {(data as boats[])?.map((boat) => (
              <div className="flex w-[300px] cursor-pointer flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-yellow-300 hover:text-black active:scale-[0.97]">
                <p className="text-md">
                  {boat.bid} - {boat.bname} - {boat.color}
                </p>
                <p className="text-4xl font-extrabold">{boat.bid}</p>
              </div>
            ))}
          </div>
        )}

        {table === "reserves" && (
          <div className="grid grid-cols-3 items-center gap-2">
            {(data as reserves[])?.map((reserve) => (
              <div className="flex w-[300px] cursor-pointer flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-yellow-300 hover:text-black active:scale-[0.97]">
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
