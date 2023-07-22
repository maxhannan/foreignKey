import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { prisma } from "@/lib/prisma";

import React from "react";

async function Dashboard() {
  const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col gap-2 mt-2  ">
      {users.map((user) => (
        <Avatar className="h-8 w-8" key={user.id}>
          <AvatarImage src={user.image!} />
          <AvatarFallback className="bg-secondary">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}

export default Dashboard;
