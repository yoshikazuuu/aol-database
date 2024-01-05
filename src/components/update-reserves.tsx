"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { type reserves } from "@prisma/client";
import { DialogClose } from "./ui/dialog";
import { useEffect, useState } from "react";

const formSchema = z.object({
  sid: z.coerce.number().positive({ message: "Sailor ID must be positive" }),
  bid: z.coerce.number().positive({ message: "Boat ID must be positive" }),
  days: z.string().refine(
    (val) => {
      // Regular expression to match the date format MM/DD/YY
      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
      return dateRegex.test(val);
    },
    {
      message: "Day must be in MM/DD/YY format",
    },
  ),
});

export function UpdateReserve({
  data,
  refresh,
  setRefresh,
}: {
  data: reserves;
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}) {
  const [disabled, setDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sid: data.sid,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      bid: data.bid,
      days: data.days ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setDisabled(!form.formState.isValid);
  }, [form.formState]);

  const submitData = api.database.updateReserve.useMutation({
    onSuccess: () => {
      toast.success("Reserve updated ✅", {
        description: (
          <div>
            <p>Sukses ditambahkan</p>
            <p>
              {new Date().toLocaleString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
          </div>
        ),
      });
      setRefresh(!refresh);
    },
    onError: (error) => {
      toast.error("Reserve failed to update ❌", {
        description: (
          <div>
            <p>{error.message}</p>
            <p className="font-bold text-foreground">
              Hint: Pastikan Sailor ID dan Boat ID exist!
            </p>
          </div>
        ),
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();
    submitData.mutate(data);
    toast.message("Updating reserve ⏳", {
      description: (
        <div>
          <p>Sailor ID: {data.sid}</p>
          <p>Boat ID: {data.bid}</p>
          <p>Day: {data.days}</p>
          <p>
            {new Date().toLocaleString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            })}
          </p>
        </div>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex flex-col gap-2 text-left">
          <FormField
            control={form.control}
            name="sid"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="font-bold">Sailor ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Sailor ID"
                    type="number"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bid"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="font-bold">Boat ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Boat ID"
                    type="number"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="font-bold">Day</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="MM/DD/YY" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {disabled ? (
            <Button type="submit">Submit</Button>
          ) : (
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          )}
        </div>
      </form>
    </Form>
  );
}
