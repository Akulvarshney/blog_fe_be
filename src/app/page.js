"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormdata, setBlogFormdata] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    console.log(blogFormdata);
    if (blogFormdata.description === "" || blogFormdata.title === "") {
      console.log("Please enter the description and title");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormdata),
      });

      const responseText = await response.text(); // Get raw response text
      console.log("Raw response text:", responseText);

      const data = JSON.parse(responseText); // Parse JSON from the raw text
      console.log("Parsed response data:", data);
      if (data.success === true) {
        setOpenDialogue(false);
        setBlogFormdata({
          title: "",
          description: "",
        });
      } else {
        console.log("Error: " + data.message);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <h1>Welcome to Allontics Blogs Next.js</h1>
      <Button onClick={() => setOpenDialogue(true)}>Add Blog</Button>

      <Dialog onOpenChange={() => setOpenDialogue(false)} open={openDialogue}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                value={blogFormdata?.title}
                onChange={(event) =>
                  setBlogFormdata({
                    ...blogFormdata,
                    title: event.target.value,
                  })
                }
                placeholder="Add the Title..."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Descriptions
              </Label>
              <Input
                id="descriptions"
                value={blogFormdata?.description}
                onChange={(event) =>
                  setBlogFormdata({
                    ...blogFormdata,
                    description: event.target.value,
                  })
                }
                placeholder="Add the Description..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => handleSubmit()}>
              {loading ? "Saving Changes" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
