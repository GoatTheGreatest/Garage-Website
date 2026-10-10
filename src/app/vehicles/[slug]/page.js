import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Compass,
  Gauge,
  MapPin,
  RotateCcw,
  Users,
  Zap,
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import VehicleCard from "@/components/vehicle-card";
import VehicleGallery from "@/components/vehicle-gallery";
import { Reveal } from "@/components/reveal";
import { formatPrice, getVehicle, vehicles } from "@/lib/vehicles";

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({ slug: vehicle.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) return { title: "Vehicle not found" };
  return {
    title: `${vehicle.make} ${vehicle.name} — specs, price & guide`,
    description: `${vehicle.description} Explore estimated ${vehicle.make} ${vehicle.name} specifications, performance, pricing in USD and PKR, and where it feels at home.`,
    alternates: { canonical: `/vehicles/${vehicle.slug}` },
    openGraph: {
      title: `${vehicle.make} ${vehicle.name} | Motor Atlas`,
      description: vehicle.description,
      images: [{ url: vehicle.image, alt: `${vehicle.make} ${vehicle.name}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicle.make} ${vehicle.name} | Motor Atlas`,
      description: vehicle.description,
      images: [vehicle.image],
    },
  };
}

export default function VehiclePage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="content-section detail-loading" role="status">
          Opening the atlas…
        </div>
      }
    >
      <VehiclePageContent params={params} />
    </Suspense>
  );
}

async function VehiclePageContent({ params }) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const related = vehicles
    .filter((item) => item.type === vehicle.type && item.slug !== vehicle.slug)
    .slice(0, 3);
  const neighbors = related.length
    ? related
    : vehicles
        .filter(
          (item) => item.make !== vehicle.make && item.slug !== vehicle.slug,
        )
        .slice(0, 3);
  const specs = [
    ["Powertrain", vehicle.engine],
    ["Power output", vehicle.power],
    ["Top speed", vehicle.topSpeed],
    ["0–60 mph", vehicle.acceleration],
    ["Transmission", vehicle.transmission],
    ["Drive", vehicle.drive],
    ["Seats", `${vehicle.seats} ${vehicle.seats === 1 ? "seat" : "seats"}`],
    ["Fuel / energy", vehicle.fuel],
    [
      "Nitrous oxide",
      vehicle.nitro
        ? "Available on select track builds"
        : "Not fitted by the manufacturer",
    ],
  ];

  return (
    <>
      <SiteHeader />
      <main id="top" className="detail-main">
        <div className="content-section detail-breadcrumb">
          <Link href="/">
            <ArrowLeft size={15} /> Back to the garage
          </Link>
          <span>/</span>
          <span>{vehicle.type}</span>
          <span>/</span>
          <span>{vehicle.make}</span>
        </div>
        <section className="detail-hero content-section">
          <div className="detail-copy">
            <div className="hero-kicker">
              <span className="live-dot" /> {vehicle.year} · {vehicle.type}
            </div>
            <p className="detail-make">{vehicle.make}</p>
            <h1>
              {vehicle.name}
              <span className="accent-dot">.</span>
            </h1>
            <p className="detail-description">{vehicle.description}</p>
            <div className="detail-price-row">
              <div>
                <span className="eyebrow">Estimated starting price</span>
                <strong>{formatPrice(vehicle.priceUSD)}</strong>
                <span className="price-pkr">
                  ≈ {formatPrice(vehicle.pricePKR, "PKR")} PKR
                </span>
              </div>
              <Link className="primary-button" href="#specs">
                Explore the details <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="detail-mini-specs">
              <div>
                <Gauge size={17} />
                <span>
                  <strong>{vehicle.power}</strong>
                  <small>POWER</small>
                </span>
              </div>
              <div>
                <Zap size={17} />
                <span>
                  <strong>{vehicle.topSpeed}</strong>
                  <small>TOP SPEED</small>
                </span>
              </div>
              <div>
                <Users size={17} />
                <span>
                  <strong>{vehicle.seats}</strong>
                  <small>SEATS</small>
                </span>
              </div>
            </div>
          </div>
          <div className="detail-hero-image">
            <Image
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.name}, featured vehicle`}
              fill
              priority
              sizes="(max-width: 800px) 100vw, 58vw"
            />
            <span className="detail-image-caption">
              <span>ATLAS FIELD NOTE</span>
              <span>
                {vehicle.make.toUpperCase()} / {vehicle.name.toUpperCase()}
              </span>
            </span>
          </div>
        </section>

        <div className="content-section detail-rule">
          <span />
          <span>THE USEFUL BITS</span>
          <span />
        </div>

        <section className="content-section specs-section" id="specs">
          <Reveal className="specs-intro">
            <span className="eyebrow">A closer read</span>
            <h2>
              Numbers with
              <br />a little <em>context.</em>
            </h2>
            <p>
              Fast is fun. Knowing what the numbers mean for your life is even
              better.
            </p>
          </Reveal>
          <Reveal className="specs-table-wrap" delay={0.08}>
            <div className="specs-table-heading">
              <span>Specification</span>
              <span>
                {vehicle.make} {vehicle.name}
              </span>
            </div>
            {specs.map(([label, value]) => (
              <div className="spec-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </Reveal>
        </section>

        <section className="content-section use-case-section">
          <Reveal className="use-case-card use-case-primary">
            <span className="eyebrow">
              <Compass size={14} /> The right kind of day
            </span>
            <h2>
              Made for
              <br />
              <em>the moment.</em>
            </h2>
            <p>{vehicle.bestFor}</p>
            <div className="use-case-bottom">
              <Check size={16} />
              <span>Best on: {vehicle.terrain}</span>
            </div>
          </Reveal>
          <Reveal className="use-case-card use-case-aside" delay={0.08}>
            <div className="terrain-icon">
              <MapPin size={21} />
            </div>
            <span className="eyebrow">Pick your pavement</span>
            <h3>Where it feels at home</h3>
            <p>{vehicle.terrain}</p>
            <span className="terrain-path" aria-hidden="true">
              〰
            </span>
            <div className="use-case-bottom">
              <RotateCcw size={15} />
              <span>Match the machine to your everyday map.</span>
            </div>
          </Reveal>
        </section>

        <section className="content-section price-section">
          <Reveal className="price-card">
            <div>
              <span className="eyebrow">The numbers, in two currencies</span>
              <h2>
                Planning a<br />
                little road trip?
              </h2>
              <p>
                Market prices move with trim, taxes, availability, and exchange
                rates. Treat these figures as a starting point, not a dealer
                quote.
              </p>
            </div>
            <div className="price-pair">
              <div>
                <span>UNITED STATES</span>
                <strong>{formatPrice(vehicle.priceUSD)}</strong>
                <small>Estimated starting MSRP · USD</small>
              </div>
              <div>
                <span>PAKISTAN · INDICATIVE</span>
                <strong>{formatPrice(vehicle.pricePKR, "PKR")}</strong>
                <small>Converted at approx. ₨280 / $1</small>
              </div>
            </div>
          </Reveal>
        </section>

        <div className="content-section">
          <VehicleGallery vehicle={vehicle} />
        </div>

        <section className="content-section related-section">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">Keep exploring</span>
              <h2>
                Another good
                <br />
                way to go<span className="accent-dot">.</span>
              </h2>
            </div>
            <Link className="text-button" href="/#explore">
              Back to all vehicles <ArrowUpRight size={16} />
            </Link>
          </Reveal>
          <div className="vehicle-grid related-grid">
            {neighbors.map((item, index) => (
              <VehicleCard vehicle={item} index={index} key={item.slug} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
