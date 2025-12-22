import React from "react";
import { ArrowRight } from "lucide-react";
import { ProgressiveBlur } from "./ProgressiveBlur";

const cx = (...arr) => arr.filter(Boolean).join(" ");

export function ProgressiveBlurCard({
  title = "Title",
  subtitle = "Subtitle",
  imageUrl = "",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5",
        "text-left shadow-sm transition-all duration-500 hover:scale-[1.01] hover:border-white/20"
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <ProgressiveBlur
        className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-full"
        blurIntensity={8}
      />

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="mt-1 text-sm text-white/75">{subtitle}</div>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-sm ring-1 ring-black/10 transition-all duration-300 hover:bg-white">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </button>
  );
}