import React, { useState } from 'react';

function BirdItem({ bird }) {
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // try multiple image sources in order
  const imageSources = [
    // scientific name
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
      bird.sciName.replace(' ', '_')
    )}.jpg`,

    // common name fallback
    `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
      bird.comName.replace(' ', '_')
    )}.jpg`
  ];

  // google image search link in case wikimedia images don't work
  const googleImageLink = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
    bird.comName
  )}`;

  const handleImageError = () => {
    if (imageIndex < imageSources.length - 1) {
      setImageIndex(imageIndex + 1); // try next source
    } else {
      setImageIndex(-1); // no images found
    }
  };

  return (
    <li onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
      <div>
        <strong>{bird.comName}</strong> ({bird.sciName}) —{' '}
        {bird.howMany ? `${bird.howMany} observed` : 'No count'}
      </div>

      {open && (
        <div className="bird-dropdown">

          {/* load img if available */}
          {imageIndex !== -1 && (
            <img
              src={imageSources[imageIndex]}
              alt={bird.comName}
              onError={handleImageError}
            />
          )}

          {/* if no image found use google link */}
          {imageIndex === -1 && (
            <div className="image-error">
              <p>Image could not be loaded.</p>
              <a
                href={googleImageLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                View "{bird.comName}" on Google Images
              </a>
            </div>
          )}

        </div>
      )}
    </li>
  );
}

export default BirdItem;
