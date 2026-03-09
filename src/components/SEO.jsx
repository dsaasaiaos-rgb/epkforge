import { useEffect } from 'react';

export default function SEO({ title, description, image }) {
  useEffect(() => {
    // Update Title
    const previousTitle = document.title;
    if (title) {
      document.title = `${title} | ITSFAMM`;
    }

    // Update Meta Tags
    const updateMeta = (name, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', title);
    updateMeta('og:description', description);
    if (image) {
      updateMeta('og:image', image);
      updateMeta('twitter:image', image);
    }

    // Cleanup
    return () => {
      document.title = previousTitle;
    };
  }, [title, description, image]);

  return null;
}