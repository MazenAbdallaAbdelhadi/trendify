import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { User } from "@/lib/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { DataTableColumnHeader } from "./ui/data-tabel-column-header";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDeleteUserMutaion } from "@/services/api/user";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="username" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const profileImage = row.original.profileImage as string;

      return (
        <div className="flex gap-2 items-center">
          <Avatar className="w-8 h-8">
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
            <AvatarImage src={profileImage} />
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as number;
      switch (role) {
        case 1:
          return <Badge>admin</Badge>;
        case 2:
          return <Badge variant="secondary">vendor</Badge>;
        case 3:
          return <Badge variant="outline">user</Badge>;
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <>
          <div className="flex items-center gap-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <UserViewSheet user={user} />
              </TooltipTrigger>
              <TooltipContent>View</TooltipContent>
            </Tooltip>
            {/* TODO make edit form */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <UserUpdateSheet />
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            {/* TODO add delete modal */}
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <UserDeleteAlertDialog id={user._id} />
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </>
      );
    },
  },
];

import imgPlaceholder from "@/assets/avatar-placeholder.png";
import RegisterForm from "../auth/register-form";

const UserViewSheet = ({ user }: { user: User }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "h-9 w-9",
          })}
        >
          <Eye className="h-4 w-4" />
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetClose />
        <SheetHeader>
          <SheetTitle>User Data</SheetTitle>
          <SheetDescription>you can view all user data</SheetDescription>
        </SheetHeader>

        <div className="space-y-4 overflow-y-auto max-h-[calc(100%-80px)] mt-2 pe-2 rounded-md">
          {/* id */}
          <div className="flex flex-col bg-secondary text-secondary-foreground text-start rounded-md p-4">
            <span className="text-muted-foreground">id</span>
            <span>{user._id}</span>
          </div>

          {/* profile Image */}
          <div className="bg-secondary flex flex-col justify-center  rounded-md p-4">
            <span className="self-start text-muted-foreground">
              Profile Image
            </span>
            <div className="self-center">
              {user?.profileImage ? (
                <img
                  src={user?.profileImage}
                  alt={user.name}
                  className="w-[200px] h-[200px]"
                />
              ) : (
                <img
                  src={imgPlaceholder}
                  alt={user.name}
                  className="w-[200px] h-[200px]"
                />
              )}
            </div>
          </div>

          {/* username */}
          <div className="flex flex-col bg-secondary text-secondary-foreground text-start rounded-md p-4">
            <span className="text-muted-foreground self-start">username</span>
            <span>{user.name}</span>
          </div>

          {/* email */}
          <div className="flex flex-col bg-secondary text-secondary-foreground text-start rounded-md p-4">
            <span className="text-muted-foreground">email</span>
            <span>{user.email}</span>
          </div>

          {/* role */}
          <div className="flex flex-col bg-secondary text-secondary-foreground text-start rounded-md p-4">
            <span className="text-muted-foreground">role</span>
            <div>
              {user.role === 1 && (
                <Badge className="rounded-[5px]">ADMIN</Badge>
              )}
              {user.role === 2 && (
                <Badge className="rounded-[5px]">VENDOR</Badge>
              )}
              {user.role === 3 && <Badge className="rounded-[5px]">USER</Badge>}
            </div>
          </div>

          {/* bio */}
          <div className="flex flex-col bg-secondary text-secondary-foreground text-start rounded-md p-4">
            <span className="text-muted-foreground">Bio</span>
            <span>{user?.bio || "null"}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UserUpdateSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "h-9 w-9",
          })}
        >
          <Pencil className="h-4 w-4" />
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetClose />
        <SheetHeader>
          <SheetTitle>Edit User Data</SheetTitle>
          <SheetDescription>you can Edit user data</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto max-h-[calc(100%-80px)] mt-2 pe-2">
          <RegisterForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const UserDeleteAlertDialog = ({ id }: { id: string }) => {
  const { mutate } = useDeleteUserMutaion(id);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "h-9 w-9",
          })}
        >
          <Trash className="h-4 w-4" />
        </span>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove his data from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
