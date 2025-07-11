"use client";

import { FileUpload } from "@/components/file/file-upload";
import { Navigation } from "@/components/layout/navigation";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const handleUploadSuccess = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload File</h1>
          <p className="text-muted-foreground mt-2">
            Share a file with your department colleagues
          </p>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-8">
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        </div>
      </main>
    </div>
  );
}
