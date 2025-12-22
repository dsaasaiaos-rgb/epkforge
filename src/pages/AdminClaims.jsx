import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, CheckCircle, XCircle, Loader2, User, Calendar, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AdminClaims() {
  const [user, setUser] = useState(null);
  const [claims, setClaims] = useState([]);
  const [artists, setArtists] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }

      const userData = await base44.auth.me();
      setUser(userData);

      if (userData.role !== 'admin') {
        setIsLoading(false);
        return;
      }

      // Load pending claims
      const pendingClaims = await base44.entities.ClaimRequest.filter({ status: 'pending' });
      setClaims(pendingClaims);

      // Load associated artists
      const artistIds = [...new Set(pendingClaims.map(c => c.artistId))];
      const artistsData = {};
      for (const id of artistIds) {
        const artistList = await base44.entities.Artist.filter({ id });
        if (artistList.length > 0) {
          artistsData[id] = artistList[0];
        }
      }
      setArtists(artistsData);

    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const handleClaim = async (claim, approved) => {
    setProcessing(claim.id);
    
    try {
      // Update claim request
      await base44.entities.ClaimRequest.update(claim.id, {
        status: approved ? 'approved' : 'denied',
        reviewedBy: user.id,
        reviewedAt: new Date().toISOString()
      });

      // If approved, update artist
      if (approved) {
        await base44.entities.Artist.update(claim.artistId, {
          ownerUserId: claim.userId,
          claimStatus: 'verified'
        });
      }

      // Remove from list
      setClaims(prev => prev.filter(c => c.id !== claim.id));
      toast.success(`Claim ${approved ? 'approved' : 'denied'}`);

    } catch (error) {
      console.error('Error processing claim:', error);
      toast.error('Failed to process claim');
    }
    
    setProcessing(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-zinc-400">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Claim Requests</h1>
              <p className="text-zinc-400">Review and approve artist profile claims</p>
            </div>
          </div>
        </motion.div>

        {/* Claims List */}
        {claims.length > 0 ? (
          <div className="space-y-4">
            {claims.map((claim, index) => {
              const artist = artists[claim.artistId];
              
              return (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                            {artist?.profilePhotoUrl ? (
                              <img 
                                src={artist.profilePhotoUrl} 
                                alt={artist.stageName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <User className="w-8 h-8 text-zinc-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white">
                              {artist?.stageName || 'Unknown Artist'}
                            </h3>
                            <p className="text-sm text-zinc-400 mt-1">
                              Claimed by: {claim.userId}
                            </p>
                            <p className="text-sm text-zinc-500 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(claim.created_date), 'MMM d, yyyy h:mm a')}
                            </p>
                            {claim.verificationCode && (
                              <div className="mt-3 p-3 bg-zinc-800/50 rounded-lg">
                                <p className="text-xs text-zinc-500 mb-1">Verification Code</p>
                                <code className="text-emerald-400 font-mono">
                                  {claim.verificationCode}
                                </code>
                              </div>
                            )}
                            {claim.notes && (
                              <p className="text-sm text-zinc-400 mt-3">
                                Notes: {claim.notes}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex sm:flex-col gap-2">
                          <Button
                            onClick={() => handleClaim(claim, true)}
                            disabled={processing === claim.id}
                            className="bg-emerald-600 hover:bg-emerald-500 flex-1 sm:flex-none"
                          >
                            {processing === claim.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleClaim(claim, false)}
                            disabled={processing === claim.id}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10 flex-1 sm:flex-none"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Deny
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardContent className="py-16 text-center">
                <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No Pending Claims
                </h3>
                <p className="text-zinc-400">
                  All claim requests have been processed.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}