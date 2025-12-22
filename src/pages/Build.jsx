import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Sparkles, Loader2, Plus, X, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressIndicator from '@/components/build/ProgressIndicator.jsx';
import LinkInputField from '@/components/build/LinkInputField.jsx';
import TagInput from '@/components/build/TagInput.jsx';
import UploadDropzone from '@/components/build/UploadDropzone.jsx';

const genreSuggestions = [
  'Hip-Hop', 'R&B', 'Pop', 'Rock', 'Alternative', 'Electronic', 'EDM', 'House',
  'Trap', 'Jazz', 'Soul', 'Country', 'Indie', 'Metal', 'Punk', 'Latin', 'Reggae',
  'Classical', 'Folk', 'Blues', 'Funk', 'Gospel', 'Ambient', 'Lo-Fi'
];

const vibeSuggestions = [
  'Melodic', 'Energetic', 'Chill', 'Dark', 'Uplifting', 'Introspective', 'Raw',
  'Atmospheric', 'Dreamy', 'Aggressive', 'Romantic', 'Nostalgic', 'Experimental',
  'Cinematic', 'Hypnotic', 'Groovy', 'Soulful', 'Haunting'
];

export default function Build() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generatedArtist, setGeneratedArtist] = useState(null);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    stageName: '',
    primaryLocation: '',
    secondaryLocation: '',
    genres: [],
    vibes: [],
    links: {
      instagram: '',
      tiktok: '',
      youtube: '',
      spotify: '',
      appleMusic: '',
      soundcloud: '',
      website: ''
    },
    pressLinks: [],
    profilePhotoUrl: null,
    bannerUrl: null,
    pressPhotos: []
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (e) {
        console.log('Not authenticated');
      }
    };
    loadUser();

    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) {
      setFormData(prev => ({ ...prev, stageName: name }));
    }
  }, []);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLink = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [platform]: value }
    }));
  };

  const addPressLink = () => {
    setFormData(prev => ({
      ...prev,
      pressLinks: [...prev.pressLinks, '']
    }));
  };

  const updatePressLink = (index, value) => {
    const newLinks = [...formData.pressLinks];
    newLinks[index] = value;
    setFormData(prev => ({ ...prev, pressLinks: newLinks }));
  };

  const removePressLink = (index) => {
    setFormData(prev => ({
      ...prev,
      pressLinks: prev.pressLinks.filter((_, i) => i !== index)
    }));
  };

  const generateSlug = (name) => {
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    // Add timestamp suffix to ensure uniqueness
    return `${baseSlug}-${Date.now().toString(36)}`;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Progress messages
      const progressMessages = [
        'Analyzing your digital presence...',
        'Extracting key information...',
        'Crafting your narrative...',
        'Generating professional content...',
        'Finalizing your EPK...'
      ];
      
      let messageIndex = 0;
      const progressInterval = setInterval(() => {
        if (messageIndex < progressMessages.length) {
          setGenerationProgress(progressMessages[messageIndex]);
          messageIndex++;
        }
      }, 2000);

      // Build prompt for AI
      const prompt = `Generate a professional Electronic Press Kit (EPK) for the following artist:

Artist Name: ${formData.stageName}
Primary Location: ${formData.primaryLocation || 'Not specified'}
Secondary Location: ${formData.secondaryLocation || 'Not specified'}
Genres: ${formData.genres.join(', ') || 'Not specified'}
Vibes/Keywords: ${formData.vibes.join(', ') || 'Not specified'}

Social Links:
- Instagram: ${formData.links.instagram || 'Not available'}
- TikTok: ${formData.links.tiktok || 'Not available'}
- YouTube: ${formData.links.youtube || 'Not available'}
- Spotify: ${formData.links.spotify || 'Not available'}
- Apple Music: ${formData.links.appleMusic || 'Not available'}
- SoundCloud: ${formData.links.soundcloud || 'Not available'}
- Website: ${formData.links.website || 'Not available'}

Press/Interview Links:
${formData.pressLinks.filter(l => l).join('\n') || 'None provided'}

CRITICAL RULES:
- NEVER fabricate awards, chart positions, celebrity endorsements, label deals, or collaborations
- ONLY use information provided above
- If information is missing, write general but engaging content
- Be press-ready: confident but neutral tone
- No hype language or exaggeration

Generate the following:`;

      const aiResponse = await base44.integrations.Core.InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            tagline: { type: "string", description: "One-line catchy description (max 100 chars)" },
            bioLong: { type: "string", description: "Full bio, 150-250 words" },
            bioShort: { type: "string", description: "Short description, 50-75 words" },
            styleThemes: {
              type: "object",
              properties: {
                genres: { type: "string" },
                mood: { type: "string" },
                themes: { type: "string" },
                style: { type: "string" }
              }
            },
            highlights: {
              type: "array",
              items: { type: "string" },
              description: "3-5 career highlights or key facts"
            }
          }
        }
      });

      clearInterval(progressInterval);

      // Create artist record
      const slug = generateSlug(formData.stageName);
      const verifiedLinks = {
        instagram: formData.links.instagram || null,
        tiktok: formData.links.tiktok || null,
        youtube: formData.links.youtube || null,
        spotify: formData.links.spotify || null,
        appleMusic: formData.links.appleMusic || null,
        soundcloud: formData.links.soundcloud || null,
        website: formData.links.website || null,
        press: formData.pressLinks.filter(l => l)
      };

      const artistData = {
        stageName: formData.stageName,
        slug,
        primaryLocation: formData.primaryLocation,
        secondaryLocation: formData.secondaryLocation,
        genres: formData.genres,
        vibes: formData.vibes,
        tagline: aiResponse.tagline,
        bioLong: aiResponse.bioLong,
        bioShort: aiResponse.bioShort,
        styleThemes: aiResponse.styleThemes,
        highlights: aiResponse.highlights,
        verifiedLinks,
        profilePhotoUrl: formData.profilePhotoUrl,
        bannerUrl: formData.bannerUrl,
        pressPhotos: formData.pressPhotos,
        isPublic: true,
        generationCount: 1,
        lastGeneratedAt: new Date().toISOString(),
        ownerUserId: user?.id || null,
        claimStatus: user ? 'verified' : 'unclaimed'
      };

      const createdArtist = await base44.entities.Artist.create(artistData);
      setGeneratedArtist(createdArtist);
      setCurrentStep(5); // Success step

    } catch (error) {
      console.error('Generation error:', error);
      setGenerationProgress('An error occurred. Please try again.');
    }
    
    setIsGenerating(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.stageName.trim().length > 0;
      case 2:
        return formData.genres.length > 0;
      case 3:
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {currentStep < 5 && (
          <ProgressIndicator step={currentStep} />
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Links */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Artist Info & Links</CardTitle>
                  <p className="text-zinc-400">Enter your artist name and social media links</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Artist / Stage Name *</Label>
                    <Input
                      value={formData.stageName}
                      onChange={(e) => updateField('stageName', e.target.value)}
                      placeholder="Your artist name"
                      className="bg-zinc-900/80 border-zinc-700 rounded-xl h-12"
                    />
                  </div>

                  <div className="border-t border-zinc-800 pt-6">
                    <h3 className="text-lg font-medium text-white mb-4">Social & Streaming Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <LinkInputField
                        platform="instagram"
                        value={formData.links.instagram}
                        onChange={(v) => updateLink('instagram', v)}
                      />
                      <LinkInputField
                        platform="tiktok"
                        value={formData.links.tiktok}
                        onChange={(v) => updateLink('tiktok', v)}
                      />
                      <LinkInputField
                        platform="youtube"
                        value={formData.links.youtube}
                        onChange={(v) => updateLink('youtube', v)}
                      />
                      <LinkInputField
                        platform="spotify"
                        value={formData.links.spotify}
                        onChange={(v) => updateLink('spotify', v)}
                      />
                      <LinkInputField
                        platform="appleMusic"
                        value={formData.links.appleMusic}
                        onChange={(v) => updateLink('appleMusic', v)}
                      />
                      <LinkInputField
                        platform="soundcloud"
                        value={formData.links.soundcloud}
                        onChange={(v) => updateLink('soundcloud', v)}
                      />
                      <LinkInputField
                        platform="website"
                        value={formData.links.website}
                        onChange={(v) => updateLink('website', v)}
                      />
                    </div>
                  </div>

                  <div className="border-t border-zinc-800 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-white">Press / Interview Links</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPressLink}
                        className="border-zinc-700 text-zinc-300"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Link
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {formData.pressLinks.map((link, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={link}
                            onChange={(e) => updatePressLink(index, e.target.value)}
                            placeholder="https://..."
                            className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removePressLink(index)}
                            className="text-zinc-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Artist Details</CardTitle>
                  <p className="text-zinc-400">Tell us about your location and style</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Primary Location</Label>
                      <Input
                        value={formData.primaryLocation}
                        onChange={(e) => updateField('primaryLocation', e.target.value)}
                        placeholder="e.g., Los Angeles, CA"
                        className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-zinc-300">Secondary Location (optional)</Label>
                      <Input
                        value={formData.secondaryLocation}
                        onChange={(e) => updateField('secondaryLocation', e.target.value)}
                        placeholder="e.g., New York, NY"
                        className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                      />
                    </div>
                  </div>

                  <TagInput
                    label="Genres *"
                    placeholder="Type a genre and press Enter"
                    value={formData.genres}
                    onChange={(v) => updateField('genres', v)}
                    maxTags={5}
                    suggestions={genreSuggestions}
                  />

                  <TagInput
                    label="Vibes / Keywords"
                    placeholder="Type a vibe and press Enter"
                    value={formData.vibes}
                    onChange={(v) => updateField('vibes', v)}
                    maxTags={5}
                    suggestions={vibeSuggestions}
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Media */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Media Upload</CardTitle>
                  <p className="text-zinc-400">Add photos to enhance your EPK (optional)</p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <UploadDropzone
                    label="Profile Photo"
                    description="Square image, 400x400px or larger recommended"
                    value={formData.profilePhotoUrl}
                    onChange={(v) => updateField('profilePhotoUrl', v)}
                    aspectRatio="square"
                  />

                  <UploadDropzone
                    label="Banner Image"
                    description="Wide image, 1200x400px or larger recommended"
                    value={formData.bannerUrl}
                    onChange={(v) => updateField('bannerUrl', v)}
                    aspectRatio="video"
                  />

                  <UploadDropzone
                    label="Press Photos"
                    description="Up to 5 high-quality photos for press use"
                    value={formData.pressPhotos}
                    onChange={(v) => updateField('pressPhotos', v)}
                    multiple={true}
                    maxFiles={5}
                    aspectRatio="portrait"
                  />
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Generate */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardContent className="py-16 text-center">
                  {!isGenerating ? (
                    <>
                      <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-emerald-500" />
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Generate Your EPK
                      </h2>
                      <p className="text-zinc-400 max-w-md mx-auto mb-8">
                        Our AI will analyze your information and create a professional 
                        Electronic Press Kit tailored to your artistry.
                      </p>
                      <Button
                        onClick={handleGenerate}
                        size="lg"
                        className="h-14 px-10 bg-emerald-600 hover:bg-emerald-500 text-lg font-medium rounded-xl"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate My EPK
                      </Button>
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-6" />
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Generating Your EPK
                      </h2>
                      <p className="text-zinc-400 animate-pulse">
                        {generationProgress}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {currentStep === 5 && generatedArtist && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                <CardContent className="py-16 text-center">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your EPK is Ready!
                  </h2>
                  <p className="text-zinc-400 max-w-md mx-auto mb-8">
                    {generatedArtist.stageName}'s Electronic Press Kit has been created successfully.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate(createPageUrl('ArtistProfile') + `?slug=${generatedArtist.slug}`)}
                      size="lg"
                      className="h-12 px-8 bg-emerald-600 hover:bg-emerald-500 rounded-xl"
                    >
                      View Public Profile
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    {user && (
                      <Button
                        onClick={() => navigate(createPageUrl('Dashboard'))}
                        variant="outline"
                        size="lg"
                        className="h-12 px-8 border-zinc-700 text-zinc-300 rounded-xl"
                      >
                        Go to Dashboard
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
              className="text-zinc-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              {currentStep === 3 ? 'Review & Generate' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {currentStep === 4 && !isGenerating && (
          <div className="flex justify-start mt-8">
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(3)}
              className="text-zinc-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}