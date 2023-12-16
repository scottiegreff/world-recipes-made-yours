"use client";

import { useState, useEffect } from "react";
import Country from "../models/Country";

export default function CountryDropdown({ items }: { items: string[] }) {
  const [selectedRestriction, setSelectedRestriction] = useState("");
  const [country, setCountry] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!items) {
      setIsLoading(false);
      return;
    } else {
      setCountry(items);
      setIsLoading(false);
    }
  }, [items]);

  return (
    <>
      {isLoading ? (
        <p>Loading COUNTRIES...</p>
      ) : (
        <select
          value={selectedRestriction}
          onChange={(e) => setSelectedRestriction(e.target.value)}
          name="recipe"
          className="p-1 border rounded-lg border-black"
        >
          <option value="">Select</option>
          {items &&
            items.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
        </select>
      )}
    </>
  );
}
