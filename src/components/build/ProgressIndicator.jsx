"use client";

export default function ProgressIndicator({ step = 1 }) {
  const steps = ["Details", "Links", "Generate"];

  return (
    <div className="flex items-center gap-2 mb-6">
      {steps.map((label, i) => {
        const active = i + 1 <= step;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`h-2 w-8 rounded-full ${
                active ? "bg-white" : "bg-white/20"
              }`}
            />
            {i < steps.length - 1 && (
              <div className="h-[1px] w-4 bg-white/20" />
            )}
          </div>
        );
      })}
    </div>
  );
}