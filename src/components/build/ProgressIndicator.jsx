import React from 'react';
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: 'Links' },
  { id: 2, label: 'Details' },
  { id: 3, label: 'Media' },
  { id: 4, label: 'Generate' },
];

export default function ProgressIndicator({ currentStep }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                  currentStep > step.id
                    ? "bg-emerald-600 text-white"
                    : currentStep === step.id
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-500/30"
                    : "bg-zinc-800 text-zinc-500"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium",
                  currentStep >= step.id ? "text-white" : "text-zinc-500"
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-3 mb-6">
                <div
                  className={cn(
                    "h-full transition-all",
                    currentStep > step.id ? "bg-emerald-600" : "bg-zinc-800"
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}