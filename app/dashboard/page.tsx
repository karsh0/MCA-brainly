// src/app/dashboard/page.tsx
"use client"
import { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import { CreateModel } from "../../components/createModel";
import { Plusicon } from "../../icons/plusicon";
import { Shareicon } from "../../icons/shareicon";
import { Sidebar } from "../../components/sidebar";
import { UseContent } from "../../hooks/useContent";
import axios from "axios";

// Define the session type based on what you're getting from getServerSession
interface Session {
  user: {
    username: string;
    userId: string;
    // Add other properties as needed
  };
  accessToken: string;
}

export default function DashboardPage() {
  const [session, setSession] = useState<Session | null>(null); // Explicitly typing session state
  const [model, setModel] = useState(false);
  const { content, loading, error } = UseContent();

  // Fetch session data on component mount
  useEffect(() => {
    axios.get<Session>('http://localhost:3000/api/dashboard').then((response) => setSession(response.data))
  }, []);

  const handleShare = async () => {
    if (!session || !session.user) {
      console.error("User session not found");
      return;
    }

    try {
      // Replace axios with fetch for the share request
      const response = await fetch("/api/brain/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // Using session's accessToken (from NextAuth)
        },
        body: JSON.stringify({ share: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to share content");
      }

      const data = await response.json();
      const url = `/api/brain/share/${data.Hash}`;
      alert(url);
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  if (!session) {
    return <p>Loading session...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content Area */}
      <div className="pt-2 ml-60 min-h-screen bg-slate-300 w-full px-4 sm:px-6 md:px-8">
        {/* Create Content Modal */}
        <CreateModel open={model} onClose={() => setModel(false)} />

        {/* Button Actions */}
        <div className="flex justify-between sm:flex-col sm:items-center sm:space-y-4 sm:px-4 md:px-6">
          <Button
            onClick={() => setModel(true)}
            variant="primary"
            text="Add Content"
            startIcon={<Plusicon />}
            className="sm:w-full sm:mb-4"
          />
          <Button
            onClick={handleShare}
            variant="secondary"
            text="Share"
            startIcon={<Shareicon />}
            className="sm:w-full"
          />
        </div>

        {/* Content Cards Grid */}
        <div className="flex flex-wrap space-x-4 pt-4 sm:space-x-0 sm:space-y-4 sm:grid sm:grid-cols-1 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            content.map(({ type, title, link }) => (
              <Card key={title} type={type} link={link} title={title} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
