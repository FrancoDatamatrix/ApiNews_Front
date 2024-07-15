"use client";

import React, { ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { UserProvider } from "./usersContext";
import { ScheduleProvider } from "./schedulesContext";
import { CronProvider } from "./cronContext";
import { NewsProvider } from "./newsContext";

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ScheduleProvider>
          <NewsProvider>
            <CronProvider>{children}</CronProvider>
          </NewsProvider>
        </ScheduleProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;
