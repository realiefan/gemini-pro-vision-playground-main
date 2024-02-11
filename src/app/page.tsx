"use client";

// app/page.tsx
import { useState } from 'react';
import { Button } from "../components/ui/button";
import { FiSettings } from 'react-icons/fi'; // Import the Settings icon from react-icons
import { VisionContainer } from "@/components/VisionContainer";
import { ChatContainer } from "@/components/ChatContainer";
import { ControlContainer } from "@/components/control/ControlContainer";
import { useControlContext } from "@/providers/ControlContext";


import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Home() {
  const { selectedModel } = useControlContext();
  const [isSidebarVisible, setSidebarVisibility] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisibility(!isSidebarVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-lg mx-auto">
      {/* Navbar */}
      <nav className="p-1 w-full flex items-center justify-between">
        <h1 className="text-white text-md ml-2 font-bold">WebCore Ai</h1>
        <div className='pr-2 pt-2'>
          <Drawer>
            <DrawerTrigger>
              <FiSettings size={20} />{" "}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Model Setting</DrawerTitle>
                <DrawerDescription>
                  <ControlContainer />
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-1 w-full">
        <div
          className={`relative md:col-span-3 h-[91vh] ${
            isSidebarVisible ? "block" : "hidden"
          }`}
        >
          <ControlContainer />
        </div>
        <div
          className={`md:col-span-9 ${isSidebarVisible ? "hidden" : "block"}`}
        >
          {selectedModel === "gemini-pro" ? (
            <ChatContainer />
          ) : (
            <VisionContainer />
          )}
        </div>
      </main>
    </div>
  );
}
