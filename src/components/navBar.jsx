import React from "react";
import Icons from "./icons";
import { CircleUserRound } from "lucide-react";
import { Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserComponent = (props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleUserRound className={props.className} />
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>My Bookings</DropdownMenuItem>
            <DropdownMenuItem>My Favourites</DropdownMenuItem>
            <DropdownMenuItem>My Properties</DropdownMenuItem>
            <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </div>
  );
};

const NavBar = () => {
  return (
    <div className="flex justify-between px-5 md:px-16 py-3 bg-muted items-center">
      <div className="logo flex gap-1">
        <Icons.logo className="w-5 text-red-500" />
        <span className="text-red-400 font-semibold">airbnb</span>
      </div>
      <div className="search flex gap-2 border-gray-300 bg-white rounded-full p-2 items-center cursor-pointer">
        <div className="hover:bg-gray-200 transition-colors duration-200 delay-50 px-3  py-1 rounded-full">
          Location
        </div>
        <div className="bg-gray-600 h-[20px] w-[0.7px]"></div>
        <div className="hover:bg-gray-200 transition-colors duration-200 delay-50 px-3  py-1 rounded-full">
          Date
        </div>
        <div className="bg-gray-600 h-[20px] w-[0.7px]"></div>
        <div className="hover:bg-gray-200 transition-colors duration-200 delay-50 px-3  py-1 rounded-full">
          Details
        </div>
        <div className="bg-red-400 text-white p-2 rounded-full hover:scale-105 transition-all duration-300 delay-100">
          <Search />
        </div>
      </div>
      <div>
        <UserComponent className="text-red-500" />
      </div>
    </div>
  );
};

export default NavBar;
