import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Gauge, Users, Zap } from "lucide-react";
import { formatPrice } from "@/lib/vehicles";
import { Reveal } from "@/components/reveal";

export default function VehicleCard({ vehicle, index = 0 }) {
  return (
    <Reveal delay={(index % 4) * 0.055}>
      <Link
        className="vehicle-card"
        href={`/vehicles/${vehicle.slug}`}
        aria-label={`Explore the ${vehicle.make} ${vehicle.name}`}
      >
        <div className="card-image-wrap">
          <Image
            src={vehicle.image}
            alt={`${vehicle.make} ${vehicle.name}`}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="card-image"
            loading="lazy"
          />
          <span className="card-tag">{vehicle.tag}</span>
          <span className="card-index">
            ATLAS / {String(index + 1).padStart(2, "0")}
          </span>
          <span className="card-arrow">
            <ArrowUpRight size={17} />
          </span>
        </div>
        <div className="card-copy">
          <div className="card-meta">
            <span>{vehicle.type}</span>
            {vehicle.fuel === "Electric" && (
              <span className="electric-label">
                <Zap size={12} /> Electric
              </span>
            )}
          </div>
          <div className="card-heading">
            <div>
              <span className="vehicle-make">{vehicle.make}</span>
              <h3>{vehicle.name}</h3>
            </div>
            <span className="card-price">{formatPrice(vehicle.priceUSD)}</span>
          </div>
          <div className="card-specs">
            <span>
              <Gauge size={12} />
              {vehicle.power}
            </span>
            <span>
              <Zap size={12} />
              {vehicle.topSpeed}
            </span>
            <span>
              <Users size={12} />
              {vehicle.seats} seats
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
