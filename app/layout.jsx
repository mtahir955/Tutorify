import React from "react";
import "./globals.css";
import "@fontsource/inter"; // Import Inter font using fontsource package

export default function RootLayout({ children }) {
  return (
    <div lang="en" className="font-inter">
      {children}
    </div>
  );
}
