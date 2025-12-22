import React from 'react';
import { Check } from 'lucide-react';

const cx = (...arr) => arr.filter(Boolean).join(" ");

const steps = [
  { num: 1, label: 'Info' },
  { num: 2, label: 'Details' },
  { num: 3, label: 'Media' },
  { num: 4, label: 'Generate' }
];

export default function ProgressIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.num}>
          <div className="flex items-center">
            <div className={cx(
              "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
              currentStep > step.num ? "bg-emerald-600 text-white" : 
              currentStep === step.num ? "bg-emerald-600 text-white" :
              "bg-zinc-800 text-zinc-500"
            )}>
              {currentStep > step.num ? <Check className="w-5 h-5" /> : step.num}
            </div>
            <span className={cx(
              "ml-2 text-sm font-medium",
              currentStep >= step.num ? "text-white" : "text-zinc-500"
            )}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={cx(
              "w-12 h-0.5 mx-4",
              currentStep > step.num ? "bg-emerald-600" : "bg-zinc-800"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}