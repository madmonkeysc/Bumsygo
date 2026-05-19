import { useEffect } from 'react';

const useSEO = ({ title, description, image }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Bumsy Go`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (metaDescription) metaDescription.setAttribute('content', description);
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (ogImage && image) ogImage.setAttribute('content', image);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image]);
};

export default useSEO;
