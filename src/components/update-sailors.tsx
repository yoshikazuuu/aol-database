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
import { type sailors } from "@prisma/client";
import { DialogClose } from "./ui/dialog";
import { useEffect, useState } from "react";

const formSchema = z.object({
  sid: z.coerce.number().positive({ message: "Boat ID must be positive" }),
  sname: z.string().min(1),
  rating: z.coerce.number().positive({ message: "Boat ID must be positive" }),
  age: z.coerce.number().positive({ message: "Boat ID must be positive" }),
});

export function UpdateSailor({
  data,
  refresh,
  setRefresh,
}: {
  data: sailors;
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}) {
  const [disabled, setDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sid: data.sid,
      sname: data.sname ?? "",
      rating: data.rating ?? 0,
      age: data.age ?? 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    setDisabled(!form.formState.isValid);
  }, [form.formState]);

  const submitData = api.database.updateSailor.useMutation({
    onSuccess: () => {
      toast.success("Sailor update ✅", {
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
      toast.error("Sailor failed to add ❌", {
        description: (
          <div>
            <p>{error.message}</p>
          </div>
        ),
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();
    submitData.mutate(data);
    toast("Updating sailor ⏳", {
      description: (
        <div>
          <p>Sailor ID: {data.sid}</p>
          <p>Sailor Name: {data.sname}</p>
          <p>Rating: {data.rating}</p>
          <p>Age: {data.age}</p>
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
            name="sname"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="font-bold">Sailor Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Sailor Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="font-bold">Rating</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rating" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormLabel className="font-bold">Age</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Age" type="number" />
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
