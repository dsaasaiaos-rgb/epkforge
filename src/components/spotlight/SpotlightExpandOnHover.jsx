import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";

const cx = (...arr) => arr.filter(Boolean).join(" ");

function hashToGradient(slug = "creator") {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  const a = h % 360;
  const b = (h * 7) % 360;
  return `linear-gradient(135deg, hsl(${a} 70% 45%), hsl(${b} 70% 35%))`;
}

export default function SpotlightExpandOnHover() {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(4);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  }, []);

  useEffect(() => {
    async function load() {
      try {
        // Fetch public creators
        const allCreators = await base44.entities.Artist.filter({ isPublic: true });
        
        if (!allCreators.length) {
          setItems([]);
          setIsLoading(false);
          return;
        }

        // Split by tier
        const proCreators = allCreators.filter(c => c.epkTier === 'pro');
        const freeCreators = allCreators.filter(c => c.epkTier !== 'pro');

        // Weight pro 3x
        const weighted = [
          ...proCreators,
          ...proCreators,
          ...proCreators,
          ...freeCreators
        ];

        // Shuffle and take unique 10
        const shuffled = weighted.sort(() => Math.random() - 0.5);
        const unique = [];
        const seen = new Set();
        
        for (const creator of shuffled) {
          if (!seen.has(creator.slug) && unique.length < 10) {
            unique.push(creator);
            seen.add(creator.slug);
          }
        }

        setItems(unique);
      } catch (error) {
        console.error('Error loading spotlight:', error);
        setItems([]);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const getWidth = (idx) => {
    if (isMobile) return "18rem";
    return idx === expandedIndex ? "24rem" : "5rem";
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/60">
        Loading Spotlight...
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/60">
        No Spotlight creators yet. Publish a profile to appear here.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={cx(
          "flex w-full items-center gap-2 rounded-3xl",
          isMobile ? "overflow-x-auto snap-x snap-mandatory pb-2" : "overflow-hidden"
        )}
      >
        {items.map((c, i) => {
          const img = c.bannerUrl || c.profilePhotoUrl || null;
          const title = c.stageName || "Untitled";
          const badge = (c.creatorType || "artist").toUpperCase();
          const slug = c.slug || c.id || String(i);

          return (
            <div
              key={slug}
              className={cx(
                "relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ease-in-out",
                "border border-white/10 bg-white/5 hover:border-white/20",
                isMobile ? "snap-center flex-shrink-0" : ""
              )}
              style={{ width: getWidth(i), height: "24rem" }}
              onMouseEnter={() => !isMobile && setExpandedIndex(i)}
              onClick={() => {
                setExpandedIndex(i);
                navigate(createPageUrl('ArtistProfile') + `?slug=${c.slug}`);
              }}
            >
              {img ? (
                <img src={img} alt={title} className="h-full w-full object-cover" />
              ) : (
                <div
                  className="h-full w-full"
                  style={{ background: hashToGradient(slug) }}
                  aria-label={title}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="mb-2 inline-flex items-center rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/90 ring-1 ring-white/10">
                  {badge}
                </div>
                <div className="text-lg font-semibold text-white">{title}</div>
                <div className="text-sm text-white/75">
                  {(c.primaryLocation || "").slice(0, 38)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}