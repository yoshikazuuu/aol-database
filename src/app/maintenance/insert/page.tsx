"use client";

import { api } from "@/trpc/react";

import { useState } from "react";
import { type boats, type reserves, type sailors } from "@prisma/client";
import SelectMenu from "@/components/select-menu";
import { type TableType } from "@/types/type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormBoat } from "@/components/form-boats";
import { FormReserve } from "@/components/form-reserves";
import { FormSailor } from "@/components/form-sailors";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const selectedTable = useSearchParams().get("table") as TableType;

  const [table, setTable] = useState<TableType>(selectedTable || "sailors");

  const handleSelectChange = (newValue: TableType) => {
    setTable(newValue);
    router.replace(`/maintenance/insert?table=${newValue}`);
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(57,100%,80%)]">Insert</span> Data
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-md">Current table selected: </p>
          <SelectMenu value={table} onChange={handleSelectChange} />
        </div>

        {table === "sailors" && <FormSailor />}

        {table === "boats" && <FormBoat />}

        {table === "reserves" && <FormReserve />}
        <Link href="/maintenance">
          <Button>Go Back ←</Button>
        </Link>
      </div>
    </>
  );
}
