"use client";

import { api } from "@/trpc/react";

import { useEffect, useState } from "react";
import { type boats, type reserves, type sailors } from "@prisma/client";
import SelectMenu from "@/components/select-menu";
import { type TableType } from "@/types/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const selectedTable = useSearchParams().get("table") as TableType;
  const [table, setTable] = useState<TableType>(selectedTable || "sailors");

  const sailorQuery = api.database.selectSailor.useQuery();
  const boatQuery = api.database.selectBoat.useQuery();
  const reserveQuery = api.database.selectReserve.useQuery();

  const deleteSailorMutation = api.database.deleteSailor.useMutation();
  const deleteBoatMutation = api.database.deleteBoat.useMutation();
  const deleteReserveMutation = api.database.deleteReserve.useMutation();

  useEffect(() => {
    setTable(selectedTable || "sailors");
  }, [selectedTable]);

  const handleSelectChange = (newValue: TableType) => {
    setTable(newValue);
    router.replace(`/maintenance/delete?table=${newValue}`);
  };

  const handleDelete = async ({ sid, bid }: { sid?: number; bid?: number }) => {
    try {
      toast.message("Deleting...");
      if (table === "sailors" && sid) {
        await deleteSailorMutation.mutateAsync({ sid });
        await sailorQuery.refetch();
      } else if (table === "boats" && bid) {
        await deleteBoatMutation.mutateAsync({ bid });
        await boatQuery.refetch();
      } else if (table === "reserves" && sid && bid) {
        await deleteReserveMutation.mutateAsync({ sid, bid });
        await reserveQuery.refetch();
      }
      toast.success("Successfully deleted! 🎉");
    } catch (error: unknown) {
      console.error(error);

      const errorTitle = "Failed to delete! ❌";
      let errorMessage = "Unknown error";

      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }

      toast.error(errorTitle, {
        description: (
          <>
            <p>{errorMessage}</p>
            <p className="font-bold text-foreground">
              Hint: Pastikan ID sedang tidak digunakan di reserve!
            </p>
          </>
        ),
      });
    }
  };

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
          <span className="text-[hsl(57,100%,80%)]">Delete</span> Data
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-md">Current table selected: </p>
          <SelectMenu value={table} onChange={handleSelectChange} />
        </div>

        <p className="text-md">Click the item to delete!</p>

        {table === "sailors" && (
          <div className="grid grid-cols-3 items-center gap-2">
            {(data as sailors[])?.map((sailor, index) => (
              <div
                key={index}
                onClick={() => handleDelete({ sid: sailor.sid })}
                className=",oflex-row flex w-[300px] cursor-pointer items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-red-600 active:scale-[0.97]"
              >
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
          <div className="grid grid-cols-3 items-center gap-2">
            {(data as boats[])?.map((boat, index) => (
              <div
                key={index}
                onClick={() => handleDelete({ bid: boat.bid })}
                className="cursor-pointer,o flex w-[300px] flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-red-600 active:scale-[0.97]"
              >
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
            {(data as reserves[])?.map((reserve, index) => (
              <div
                key={index}
                onClick={() =>
                  handleDelete({
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    sid: reserve.sid,
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    bid: reserve.bid,
                  })
                }
                className="cursor-pointer,o flex w-[300px] flex-row items-center justify-between gap-2 rounded-md border p-3 transition-all duration-200 hover:scale-[1.03] hover:bg-red-600 active:scale-[0.97]"
              >
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
