import { Deleteicons } from "../icons/deleteicon";
import { Plusicon } from "../icons/plusicon";
import { Shareicon } from "../icons/shareicon";
import { useEffect } from "react";

interface Cinterface {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

// Extract YouTube Video ID
const getYouTubeEmbedUrl = (url: string): string => {
  const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

export const Card = ({ title, link, type }: Cinterface) => {
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => window.twttr?.widgets?.load();
      document.body.appendChild(script);
    }
  }, [type]);

  return (
    <div className="max-w-72 min-h-48 min-w-72 p-8 bg-slate-200 rounded-md shadow-lg">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <Plusicon className="pr-2 text-gray-500" />
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <a href={link} target="_blank" rel="noopener noreferrer" className="pr-2 text-gray-500">
            <Shareicon />
          </a>
          <Deleteicons className="pr-2 text-gray-500" />
        </div>
      </div>

      {/* Embedded Content */}
      <div className="mt-4">
        {type === "youtube" && (
          <iframe
            width="100%"
            height="200"
            src={getYouTubeEmbedUrl(link)}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
};
