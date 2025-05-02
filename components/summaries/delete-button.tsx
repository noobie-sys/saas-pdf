"use client";
import { DeleteIcon, Trash } from "lucide-react";
import React from "react";
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
import { getSummaryDeleteAction } from "@/actions/summary-action";
import { toast } from "sonner";

const DeleteButton = ({
  summaryId,
  file_key,
}: {
  summaryId: string;
  file_key: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // console.log(summaryId);
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = async () => {
    // Handle the delete action here
    startTransition(async () => {
      const response = await getSummaryDeleteAction({
        summaryId,
        file_key,
      });
      if (!response.success) {
        toast.error("Something went wrong", {
          description: "Failed to delete summary, please try again later",
          style: {
            color: "red",
          },
        });
      } else {
        toast.success("Summary deleted successfully", {
          description: "Your summary has been deleted successfully",
        });
      }
      setIsOpen(false);
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className=" hover:text-rose-600 hover:bg-rose-200 bg-rose-50"
        >
          <Trash className="w-4 h-4 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col justify-start gap-2">
          <div className="flex flex-col gap-2 justify-start">
            <DialogTitle className="text-start">Delete Summary</DialogTitle>
            <DialogDescription className="text-start">
              Are you sure you want to delete this summary? This action cannot
              be undone.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end gap-1">
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDelete}>
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
