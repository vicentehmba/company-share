"use client";

import { useState } from "react";
import { FileList } from "@/components/file/file-list";
import { Navigation } from "@/components/layout/navigation";

export default function DashboardPage() {
  const [refreshTrigger] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Files shared within your department
          </p>
        </div>

        <FileList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  );
}
