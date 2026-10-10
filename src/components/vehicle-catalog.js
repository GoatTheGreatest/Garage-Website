"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import VehicleCard from "@/components/vehicle-card";
import { categories } from "@/lib/vehicles";

const filters = [
  "All vehicles",
  ...categories.flatMap((category) => category.types),
];

export default function VehicleCatalog({ vehicles }) {
  const [activeFilter, setActiveFilter] = useState("All vehicles");
  const [query, setQuery] = useState("");
  const filteredVehicles = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return vehicles.filter((vehicle) => {
      const matchesType =
        activeFilter === "All vehicles" || vehicle.type === activeFilter;
      const matchesSearch =
        !needle ||
        `${vehicle.make} ${vehicle.name} ${vehicle.type} ${vehicle.bestFor}`
          .toLowerCase()
          .includes(needle);
      return matchesType && matchesSearch;
    });
  }, [activeFilter, query, vehicles]);

  return (
    <div className="catalog-shell">
      <div className="catalog-toolbar">
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search vehicles</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a make, model, or mood…"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              className="clear-search"
              onClick={() => setQuery("")}
            >
              <X size={15} />
            </button>
          )}
        </label>
        <span className="filter-note" aria-live="polite">
          <SlidersHorizontal size={15} /> {filteredVehicles.length} rides to
          explore
        </span>
      </div>
      <div
        className="filter-scroll"
        role="group"
        aria-label="Filter by vehicle type"
      >
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </div>
      {filteredVehicles.length ? (
        <div className="vehicle-grid">
          {filteredVehicles.map((vehicle, index) => (
            <VehicleCard vehicle={vehicle} index={index} key={vehicle.slug} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="eyebrow">No matches, yet</span>
          <h3>Try another route.</h3>
          <p>
            Search by vehicle type, make, or the kind of drive you have in mind.
          </p>
          <button
            className="text-button"
            type="button"
            onClick={() => {
              setQuery("");
              setActiveFilter("All vehicles");
            }}
          >
            Reset filters ↗
          </button>
        </div>
      )}
    </div>
  );
}
