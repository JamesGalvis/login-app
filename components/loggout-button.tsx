"use client";

import { Button } from "./ui/button";
import { useStore } from "@/hooks/store";

function LoggoutButton() {
  const { deleteUserData } = useStore();

  return (
    <Button
      onClick={() => {
        deleteUserData();
      }}
    >
      Sign out
    </Button>
  );
}

export default LoggoutButton;
