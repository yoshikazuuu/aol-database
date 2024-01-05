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
  bid: z.coerce.number().positive({ message: "Boat ID must be positive" }),
  bname: z.string().min(1),
  color: z.string().min(1),
});

export function FormBoat() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bid: 0,
      bname: "",
      color: "",
    },
  });

  const submitData = api.database.insertBoat.useMutation({
    onSuccess: () => {
      toast({
        title: "Boat added ✅",
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
        title: "Boat failed to add ❌",
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
      title: "Adding boat ⏳",
      description: (
        <div>
          <p>Boat ID: {data.bid}</p>
          <p>Boat Name: {data.bname}</p>
          <p>Color: {data.color}</p>
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
            name="bname"
            render={({ field }) => (
              <FormItem className="min-w-[400px]">
                <FormLabel className="font-bold">Boat Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Boat Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="min-w-[400px]">
                <FormLabel className="font-bold">Color</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Color" />
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
