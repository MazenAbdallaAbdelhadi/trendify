import Logo from "@/components/logo";
import Header from "@/components/shared/header";
import { Nav } from "@/components/ui/nav";
import { Button } from "@/components/ui/button";
import { ADMIN_SIDENAV_ITEMS } from "@/lib/constant/nav-item";
import { cn } from "@/lib/utils";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <div className="flex relative">
        {/* TODO: improve layout to make it responsive */}
        {/* TODO: add Breadcrumb */}
        <motion.div
          className="h-screen fixed border-r flex flex-col bg-background z-10"
          animate={{
            width: collapsed ? "50px" : "288px",
          }}
          transition={{duration: 0.3}}
        >
          <div
            className={cn(
              "p-2 flex items-center gap-1 border-b h-[55px]",
              !collapsed && "justify-between"
            )}
          >
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, display: "none" }} // Initial state
                animate={{ opacity: 1, display: "block" }} // Ending state
                transition={{ duration: 0.5 }}
              >
                {<Logo />}
              </motion.div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              <AlignLeft className="h-4 w-4" />
              <span className="sr-only">side menu toggle</span>
            </Button>
          </div>

          <Nav links={ADMIN_SIDENAV_ITEMS} isCollapsed={collapsed} />
        </motion.div>

        <div className={cn("flex-1", collapsed ? "ps-[50px]" : "ps-72")}>
          <Header isCollapsed={collapsed} />
          <main className="mt-[55px]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
