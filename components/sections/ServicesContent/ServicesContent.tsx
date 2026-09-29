"use client";

import { useState } from "react";
import ServicesHero from "@/components/sections/ServicesHero/ServicesHero";
import ServicesExplorer from "@/components/sections/ServicesExplorer/ServicesExplorer";

export default function ServicesContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const el = document.getElementById("explore-services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleResetSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <ServicesHero
        query={searchQuery}
        onSearch={handleSearch}
        onTagClick={handleSearch}
      />
      <ServicesExplorer
        externalQuery={searchQuery}
        onSearch={handleSearch}
        onClearSearch={handleResetSearch}
      />
    </>
  );
}
