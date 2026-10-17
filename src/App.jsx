import React, { useEffect } from "react";
import legacyTemplate from "../legacy-template.html?raw";

const styleMatch = legacyTemplate.match(/<style>([\s\S]*?)<\/style>/i);
const bodyMatch = legacyTemplate.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const scriptMatch = bodyMatch?.[1].match(/<script[^>]*>([\s\S]*?)<\/script>/i);
const markup = bodyMatch?.[1].replace(/<script[^>]*>[\s\S]*?<\/script>/i, "") ?? "";

export default function App() {
  useEffect(() => {
    if (!scriptMatch?.[1]) {
      throw new Error("The canvas studio initialization script was not found.");
    }

    const script = document.createElement("script");
    script.textContent = scriptMatch[1];
    document.body.appendChild(script);
    script.remove();
  }, []);

  return (
    <>
      <style>{styleMatch?.[1] ?? ""}</style>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
