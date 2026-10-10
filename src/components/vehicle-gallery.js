"use client";

import Image from "next/image";
import { useState } from "react";
import { Images, LoaderCircle, Play, Sparkles } from "lucide-react";

export default function VehicleGallery({ vehicle }) {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function findCommunityMedia() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/media?q=${encodeURIComponent(`${vehicle.make} ${vehicle.name}`)}`,
      );
      if (!response.ok)
        throw new Error("Media search is temporarily unavailable.");
      const result = await response.json();
      setMedia(result);
      setMessage(result.notice || "");
    } catch {
      setMessage(
        "Community media could not be loaded right now. The editorial gallery is still here.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <div className="section-heading gallery-heading">
        <div>
          <span className="eyebrow">Around the vehicle</span>
          <h2 id="gallery-title">
            A closer look<span className="accent-dot">.</span>
          </h2>
        </div>
        <button
          className="outline-button media-button"
          type="button"
          onClick={findCommunityMedia}
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="spin" size={16} />
          ) : (
            <Images size={16} />
          )}
          {loading
            ? "Finding free media…"
            : media
              ? "Refresh community media"
              : "Find free photos & video"}
        </button>
      </div>
      <div className="gallery-grid">
        {vehicle.gallery.map((src, index) => (
          <div
            className={`gallery-tile gallery-tile-${index + 1}`}
            key={`${src}-${index}`}
          >
            <Image
              src={src}
              alt={`${vehicle.type} reference photo ${index + 1}, selected for the ${vehicle.make} ${vehicle.name} profile`}
              fill
              sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 25vw"
            />
            <span className="gallery-index">
              ATLAS REFERENCE / 0{index + 1}
            </span>
          </div>
        ))}
      </div>
      {message && (
        <p className="media-message" role="status">
          {message}
        </p>
      )}
      {media && (
        <>
          {media.photos.length > 0 && (
            <div className="community-media-grid">
              {media.photos.map((item) => (
                <a
                  className="community-photo"
                  href={item.creditUrl}
                  key={item.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Photo by ${item.author} on ${item.source}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 700px) 45vw, 20vw"
                  />
                  <span>
                    Photo: {item.author} · {item.source}
                  </span>
                </a>
              ))}
            </div>
          )}
          {media.videos.length > 0 && (
            <div className="video-grid" aria-label="Community vehicle videos">
              {media.videos.map((video) => (
                <div className="video-tile" key={video.src}>
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={video.poster || undefined}
                    aria-label={`${vehicle.make} ${vehicle.name} community video`}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded video.
                  </video>
                  <a href={video.creditUrl} target="_blank" rel="noreferrer">
                    <Play size={13} /> Video by {video.author} · Pixabay
                  </a>
                </div>
              ))}
            </div>
          )}
          <p className="media-attribution">
            <Sparkles size={13} /> Community photos and videos are sourced from
            Unsplash and Pixabay; open each credit to view the original.
          </p>
        </>
      )}
    </section>
  );
}
