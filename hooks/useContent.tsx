import { useEffect, useState } from "react";

interface Content {
  id: string;
  type: "youtube" | "twitter";
  title: string;
  link: string;
  user?: { username: string };
}

export function UseContent() {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/content"); // Next.js API route
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      const data = await response.json();
      setContent(data.contents);
    } catch (error) {
      setError("Error fetching content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    const interval = setInterval(fetchContent, 5000);
    return () => clearInterval(interval);
  }, []);

  return { content, loading, error, refresh: fetchContent };
}
