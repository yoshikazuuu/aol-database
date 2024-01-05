"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

const formSchema = z.object({
  sid: z.coerce.number().positive({ message: "Sailor ID must be positive" }),
  bid: z.coerce.number().positive({ message: "Boat ID must be positive" }),
  day: z.string().refine(
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

export function FormReserve() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sid: 0,
      bid: 0,
      day: "",
    },
  });

  const submitData = api.database.insertReserve.useMutation({
    onSuccess: () => {
      toast({
        title: "Reserve added ✅",
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
    },
    onError: (error) => {
      toast({
        title: "Reserve failed to add ❌",
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
    toast({
      title: "Adding reserve ⏳",
      description: (
        <div>
          <p>Sailor ID: {data.sid}</p>
          <p>Boat ID: {data.bid}</p>
          <p>Day: {data.day}</p>
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
              <FormItem className="min-w-[400px]">
                <FormLabel className="font-bold">Sailor ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Sailor ID" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bid"
            render={({ field }) => (
              <FormItem className="min-w-[400px]">
                <FormLabel className="font-bold">Boat ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Boat ID" type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem className="min-w-[400px]">
                <FormLabel className="font-bold">Day</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="MM/DD/YY" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
