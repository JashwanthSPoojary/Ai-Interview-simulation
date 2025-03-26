import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
const Navbar = ({
  setToggle,
}: {
  setToggle: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex justify-end items-center gap-2 p-4 mb-4">
      <Button
        onClick={() => setToggle(true)}
        className="flex items-center gap-2 px-4 py-2 cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
        <span>Quit the Interview</span>
      </Button>
    </div>
  );
};
export default Navbar;
