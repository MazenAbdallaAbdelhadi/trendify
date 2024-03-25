import {
  Activity,
  // FileText,
  // LayoutGrid,
  // Package,
  // PieChart,
  // Store,
  // Tags,
  Users,
} from "lucide-react";
import { NavItem } from "../types/side-nav";

export const ADMIN_SIDENAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    variant: "default",
    icon: Activity,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
    variant: "ghost",
  },
];
