import UserBtn from "../auth/user-btn";
import Logo from "../logo";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type HeaderProps = {
  isCollapsed: boolean;
};
const Header = ({ isCollapsed }: HeaderProps) => {
  return (
    <div
      className={cn(
        "border-b p-2 h-[55px] flex items-center fixed bg-background z-10",
        isCollapsed
          ? "w-[calc(100%-50px)] justify-between"
          : "w-[calc(100%-288px)] justify-end"
      )}
    >
      {isCollapsed && (
        <motion.div
          initial={{ opacity: 0, display: "none" }} // Initial state
          animate={{ opacity: 1, display: "block" }} // Ending state
          transition={{ duration: 0.5 }}
        >
          {<Logo />}
        </motion.div>
      )}

      <UserBtn />
    </div>
  );
};

export default Header;
