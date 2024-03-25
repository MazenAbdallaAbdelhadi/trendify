import {
  Heart,
  LogOut,
  ScanBarcode,
  ShoppingCart,
  Settings,
  Activity,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/services/state/store";
import { selectCurrentUser } from "@/services/state/authSlice";
import { Badge } from "../ui/badge";
import { useGetMeQuery } from "@/services/api/user";
import { Skeleton } from "../ui/skeleton";
import { useLogoutMutaion } from "@/services/api/auth";
import { Link } from "react-router-dom";

const UserBtn = () => {
  const { isLoading } = useGetMeQuery();
  const { mutate } = useLogoutMutaion();
  const user = useAppSelector(selectCurrentUser);

  // TODO make global state for cart
  const cart = {
    cartItems: 150,
  };

  if (isLoading) {
    return <Skeleton className="w-[35px] h-[35px] rounded-full" />;
  }

  if (!user)
    return (
      <div className="space-x-4">
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="mr-2 h-10 w-10">
          <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
          <AvatarImage src={user?.profileImage} />
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="grid">
            <span className="font-medium">{user?.name}</span>
            <span className="text-muted-foreground text-xsm">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {/* cart, wishlist,orders GROUP */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/my-cart">
              <div className="w-full flex justify-between items-center">
                <div className="flex gap-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>Cart</span>
                </div>
                <Badge>{cart?.cartItems < 100 ? cart?.cartItems : "+99"}</Badge>
              </div>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/wishlist">
              <Heart className="mr-2 h-4 w-4" />
              <span>wishlist</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/my-orders">
              <ScanBarcode className="mr-2 h-4 w-4" />
              <span>Orders</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {/* dashboard, settings,logout GROUP */}

        <DropdownMenuGroup>
          {/* RENDER DASHBOARD LINK IF USER IS ADMIN OR VENDOR */}
          {user?.role < 3 && (
            <DropdownMenuItem asChild>
              <Link to="/dashboard">
                <Activity className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}

          {/* SETTINGS LINK */}
          <DropdownMenuItem asChild>
            <Link to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>settings</span>
            </Link>
          </DropdownMenuItem>

          {/* LOGOUT BUTTON */}
          <DropdownMenuItem onClick={() => mutate()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBtn;
