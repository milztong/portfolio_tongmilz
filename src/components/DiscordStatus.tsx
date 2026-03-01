"use client";

import { useState, useEffect } from "react";

interface LanyardData {
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: {
    name: string;
    details?: string;
    state?: string;
  }[];
}

const DISCORD_ID = "342333370203635723";

export const DiscordStatus = () => {
  const [data, setData] = useState<LanyardData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, {
          signal: controller.signal
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(true);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
        setError(true);
        console.error("Lanyard fetch failed:", err.message);
        }
    }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    
    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  if (error || !data) return null;

  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-neutral-500",
  };

  const activeStatus = data.discord_status;
  const codingActivity = data.activities?.find((a) => a.name === "Visual Studio Code");

  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 w-fit backdrop-blur-sm">
      <div className="relative flex h-2 w-2">
        {activeStatus !== "offline" && (
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColors[activeStatus]}`}></span>
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${statusColors[activeStatus]}`}></span>
      </div>
      
      <span className="text-xs font-medium text-neutral-400">
        {codingActivity ? (
          <span className="flex gap-1.5">
            <span className="text-neutral-500">Coding</span> 
            <span className="text-white truncate max-w-[150px]">{codingActivity.details || "Developing"}</span>
          </span>
        ) : (
          <span className="capitalize">{activeStatus}</span>
        )}
      </span>
    </div>
  );
};