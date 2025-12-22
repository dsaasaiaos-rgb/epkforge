import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, Copy, Check, Loader2, Instagram, Globe } from 'lucide-react';
import { toast } from 'sonner';

export default function ClaimModal({ isOpen, onClose, artist, user }) {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState(null);
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const verificationCode = `EPKFORGE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const copyCode = () => {
    navigator.clipboard.writeText(verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitClaim = async () => {
    setIsSubmitting(true);
    
    try {
      await base44.entities.ClaimRequest.create({
        artistId: artist.id,
        userId: user.id,
        status: 'pending',
        verificationMethod: method,
        verificationCode: method === 'code_added' ? verificationCode : null,
        notes: method === 'manual_review' ? notes : null
      });

      await base44.entities.Artist.update(artist.id, {
        claimStatus: 'pending'
      });

      toast.success('Claim request submitted! We will review it shortly.');
      onClose();
    } catch (error) {
      console.error('Error submitting claim:', error);
      toast.error('Failed to submit claim');
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            Claim This Profile
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Verify that you're {artist?.stageName} to manage this profile.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <>
              <p className="text-sm text-zinc-400">
                Choose how you'd like to verify your identity:
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => { setMethod('code_added'); setStep(2); }}
                  className="w-full p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-left hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        Add Verification Code
                      </h4>
                      <p className="text-sm text-zinc-500 mt-1">
                        Add a unique code to your Instagram bio or website
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => { setMethod('manual_review'); setStep(2); }}
                  className="w-full p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-left hover:border-emerald-500/50 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white group-hover:text-emerald-400 transition-colors">
                        Request Manual Review
                      </h4>
                      <p className="text-sm text-zinc-500 mt-1">
                        Submit proof of identity for our team to review
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}

          {step === 2 && method === 'code_added' && (
            <>
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                <p className="text-sm text-zinc-400 mb-3">
                  Add this verification code to your Instagram bio or website:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 p-3 bg-zinc-900 rounded-lg text-emerald-400 font-mono text-lg">
                    {verificationCode}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyCode}
                    className="border-zinc-700"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-white text-sm">Instructions:</h4>
                <ol className="text-sm text-zinc-400 space-y-2 list-decimal list-inside">
                  <li>Copy the verification code above</li>
                  <li>Add it to your Instagram bio or website homepage</li>
                  <li>Click "Submit Claim" below</li>
                  <li>Our team will verify and approve within 24-48 hours</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-zinc-700"
                >
                  Back
                </Button>
                <Button
                  onClick={submitClaim}
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Submit Claim'
                  )}
                </Button>
              </div>
            </>
          )}

          {step === 2 && method === 'manual_review' && (
            <>
              <div>
                <label className="text-sm font-medium text-white mb-2 block">
                  Verification Notes
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain how you can prove you're this artist (e.g., link to official accounts, management contact, etc.)"
                  className="bg-zinc-800 border-zinc-700 min-h-[120px]"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 border-zinc-700"
                >
                  Back
                </Button>
                <Button
                  onClick={submitClaim}
                  disabled={isSubmitting || !notes.trim()}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Submit for Review'
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}