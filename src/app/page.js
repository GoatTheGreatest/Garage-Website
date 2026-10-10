import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Gauge,
  MoveUpRight,
} from "lucide-react";
import SiteHeader from "@/components/site-header";
import VehicleCard from "@/components/vehicle-card";
import VehicleCatalog from "@/components/vehicle-catalog";
import { Reveal } from "@/components/reveal";
import { categories, vehicles } from "@/lib/vehicles";

const featured = [
  "ferrari-296-gtb",
  "land-rover-defender-110",
  "honda-cbr650r",
].map((slug) => vehicles.find((vehicle) => vehicle.slug === slug));
const catalogVehicles = vehicles.map(({ gallery, image, ...vehicle }) => ({
  ...vehicle,
  image: image.replace(/w=1200/, "w=720"),
}));

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <section className="hero-section">
          <Reveal className="hero-copy" delay={0.04}>
            <div className="hero-kicker">
              <span className="live-dot" /> A field guide to the road ahead
            </div>
            <h1>
              Find your kind
              <br />
              of <span>drive.</span>
            </h1>
            <p>
              From city-sized runabouts to horizon-chasing machines, get to know
              the vehicles that make every journey yours.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" href="#explore">
                Explore the garage <ArrowUpRight size={17} />
              </Link>
              <Link className="quiet-link" href="#categories">
                <span className="round-icon">
                  <ArrowDown size={15} />
                </span>{" "}
                Find your lane
              </Link>
            </div>
            <div className="hero-footnote">
              <Compass size={15} /> 26 vehicle types <span /> Five ways to roam
            </div>
          </Reveal>
          <Reveal className="hero-visual" delay={0.16}>
            <div className="hero-photo">
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1900&q=88"
                alt="A classic sports car on a scenic mountain road"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 61vw"
              />
              <div className="hero-image-shade" />
            </div>
            <div className="hero-caption">
              <span>01 / 05</span>
              <span>THE MACHINE IS ONLY HALF THE STORY</span>
              <MoveUpRight size={17} />
            </div>
            <div className="hero-stamp">
              <Gauge size={18} />
              <span>
                Built for the
                <br />
                <strong>long way around.</strong>
              </span>
            </div>
          </Reveal>
          <div className="hero-side-label">ROAD · RIDE · ROAM</div>
        </section>

        <section className="intro-strip" aria-label="Our promise">
          <div>
            <span className="strip-number">01</span>
            <span>Useful detail, minus the jargon.</span>
          </div>
          <div>
            <span className="strip-number">02</span>
            <span>Real-world context for every ride.</span>
          </div>
          <div>
            <span className="strip-number">03</span>
            <span>Curiosity is always in the driver&apos;s seat.</span>
          </div>
        </section>

        <section className="content-section category-section" id="categories">
          <Reveal className="section-heading">
            <div>
              <span className="eyebrow">Pick a direction</span>
              <h2>
                Every road has
                <br className="mobile-only" /> a different rhythm
                <span className="accent-dot">.</span>
              </h2>
            </div>
            <p>
              Five big families. Twenty-six ways to get there.
              <br />
              Start with what moves you.
            </p>
          </Reveal>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.06}>
                <Link
                  className={`category-card category-card-${index + 1}`}
                  href="#explore"
                >
                  <span className="category-index">0{index + 1}</span>
                  <span className="category-type-count">
                    {String(category.types.length).padStart(2, "0")} TYPES
                  </span>
                  <h3>{category.name}</h3>
                  <p>
                    {category.types.slice(0, 3).join(" · ")}
                    {category.types.length > 3 ? " · and more" : ""}
                  </p>
                  <span className="category-arrow">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="feature-section">
          <div className="content-section feature-inner">
            <Reveal className="section-heading feature-heading">
              <div>
                <span className="eyebrow">A few worth meeting</span>
                <h2>
                  Meet your next
                  <br />
                  favorite thing<span className="accent-dot">.</span>
                </h2>
              </div>
              <Link className="text-button" href="#explore">
                See the whole garage <ArrowRight size={16} />
              </Link>
            </Reveal>
            <div className="vehicle-grid featured-grid">
              {featured.map((vehicle, index) => (
                <VehicleCard
                  vehicle={vehicle}
                  index={index}
                  key={vehicle.slug}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="content-section explore-section" id="explore">
          <Reveal className="section-heading explore-heading">
            <div>
              <span className="eyebrow">The Motor Atlas garage</span>
              <h2>
                Good things
                <br />
                come in all speeds<span className="accent-dot">.</span>
              </h2>
            </div>
            <p>
              Filter by the machine, search by the feeling, or just see where
              the road takes you.
            </p>
          </Reveal>
          <VehicleCatalog vehicles={catalogVehicles} />
          <Reveal className="price-note">
            <span className="note-star">✳</span>
            <p>
              Prices are indicative manufacturer starting prices in USD, with
              PKR estimates on each vehicle profile. Specifications vary by
              model year, trim, and market — always confirm with a local dealer.
            </p>
          </Reveal>
        </section>

        <section className="closing-note">
          <div className="closing-line" />
          <span className="eyebrow">Keep looking up the road</span>
          <h2>
            There’s always
            <br />
            another way <em>to go.</em>
          </h2>
          <a href="#top" className="closing-link">
            Take me back up <ArrowUpRight size={16} />
          </a>
        </section>
      </main>
    </>
  );
}
