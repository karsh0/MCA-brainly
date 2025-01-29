"use client";

import { useRef, useState } from "react";
import { Crossicon } from "../icons/crossicon";
import { Button } from "../components/button";
import React from "react";

enum contenttype {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateModel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleref = useRef<HTMLInputElement | null>(null);
  const linkref = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState<contenttype>(contenttype.Youtube);

  async function addcontent() {
    const title = titleref.current?.value;
    const link = linkref.current?.value;

    if (!title || !link) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (session) are sent
        body: JSON.stringify({ title, link, type }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.message);
        return;
      }

      alert("Content added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    }
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-slate-600 opacity-90 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white p-4 rounded-md">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <Crossicon />
                </div>
              </div>
              <div>
                <Input placeholder="Title" ref={titleref} />
                <Input placeholder="Link" ref={linkref} />
              </div>
              <div>
                <h1 className="flex justify-center">Type</h1>
                <div className="flex pt-2">
                  <Button
                    text="Youtube"
                    variant={type === contenttype.Youtube ? "primary" : "secondary"}
                    onClick={() => setType(contenttype.Youtube)}
                  />
                  <Button
                    text="Twitter"
                    variant={type === contenttype.Twitter ? "primary" : "secondary"}
                    onClick={() => setType(contenttype.Twitter)}
                  />
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button variant="primary" text="Submit" onClick={addcontent} />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

const Input = React.forwardRef<HTMLInputElement, { placeholder: string }>(
    function InputComponent({ placeholder }, ref) {
      return (
        <div>
          <input
            ref={ref}
            placeholder={placeholder}
            type="text"
            className="px-2 py-2 border rounded-md w-full"
          />
        </div>
      );
    }
  );
  
  Input.displayName = "InputComponent";
  
