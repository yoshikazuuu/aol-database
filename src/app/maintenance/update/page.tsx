"use client";

import { api } from "@/trpc/react";

import { useEffect, useState } from "react";
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
import { UpdateReserve } from "@/components/update-reserves";
import { UpdateBoat } from "@/components/update-boats";

export default function Page() {
  const router = useRouter();
  const selectedTable = useSearchParams().get("table") as TableType;

  const [table, setTable] = useState<TableType>(selectedTable || "sailors");
  const [refresh, setRefresh] = useState(false);
  const [prevRefresh, setPrevRefresh] = useState(false);

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
          setPrevRefresh(!prevRefresh);
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

  if (sailorQuery.isLoading || boatQuery.isLoading || reserveQuery.isLoading) {
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
          <span className="text-[hsl(57,100%,80%)]">Update</span> Data
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-md">Current table selected: </p>
          <SelectMenu value={table} onChange={handleSelectChange} />
        </div>

        <p className="text-md">Click the item to update!</p>

        {table === "sailors" && (
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(data as sailors[])?.map((sailor, index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <div className="flex w-[80vw] cursor-pointer flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-green-500 active:scale-[0.97]  sm:w-[300px]">
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
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(data as boats[])?.map((boat, index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <div className="flex w-[80vw] cursor-pointer flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-green-500 active:scale-[0.97]  sm:w-[300px]">
                    <p className="text-md">
                      {boat.bid} - {boat.bname} - {boat.color}
                    </p>
                    <p className="text-4xl font-extrabold">{boat.bid}</p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update</DialogTitle>
                    <DialogDescription>
                      Rubah data yang ada kemudian klik update!
                    </DialogDescription>
                    <div className="flex flex-col space-y-3 py-4">
                      <UpdateBoat
                        data={boat}
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

        {table === "reserves" && (
          <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(data as reserves[])?.map((reserve, index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <div className="flex w-[80vw] cursor-pointer flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-green-500 active:scale-[0.97]  sm:w-[300px]">
                    <p className="text-md text-left">
                      Days: {reserve.days}
                      <br />
                      Sailor ID: {reserve.sid}
                      <br />
                      Boat ID: {reserve.bid}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Update</DialogTitle>
                    <DialogDescription>
                      Rubah data yang ada kemudian klik update!
                    </DialogDescription>
                    <div className="flex flex-col space-y-3 py-4">
                      <UpdateReserve
                        data={reserve}
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
        <Link href="/maintenance">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </>
  );
}
