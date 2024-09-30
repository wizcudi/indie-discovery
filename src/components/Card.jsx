import React from 'react';

const Card = ({ artist }) => {

   // Function to extract YouTube video ID from various YouTube URL formats
   const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderSpotlight = () => {
    if (!artist.spotlights || artist.spotlights.length === 0) return null;

    const spotlight = artist.spotlights[0]; // Assuming we're showing the first spotlight

    switch (spotlight.type) {
      case 'music':
        return (
          <a 
            href={spotlight.value} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline font-semibold text-lg"
          >
            Listen to Featured Music
          </a>
        );
      case 'video':
        const videoId = extractYouTubeId(spotlight.value);
        if (videoId) {
          return (
            <div className="aspect-w-16 aspect-h-9 mt-4">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          );
        } else {
          return <p>Invalid YouTube URL</p>;
        }
      case 'event':
        return (
          <a 
            href={spotlight.value} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline font-semibold text-lg"
          >
            View Featured Event
          </a>
        );
      default:
        return null;
    }
  };


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={artist.img} alt={artist.name} />
      <div 
        className="
          flex
          flex-col
          gap-4
          px-6 
          py-4
        "
      >

        <div 
          className="
            font-bold 
            text-4xl
            mb-2
          "
        >
          {artist.name}
        </div>

        {artist.link && (
          <a 
            href={artist.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="
              flex
              justify-center
              font-bold
              max-[500px]:text-2xl
              text-4xl
              
            
              text-blue-500
              border-2
              border-blue-500
              rounded-full
              px-12
              py-3
              hover:bg-blue-500
              hover:text-white
            "
          >
           Link
          </a>
        )}

        
        {artist.website && (
          <a 
            href={artist.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="
              flex
              justify-center
              font-bold
              max-[500px]:text-2xl
              text-4xl
              
            
              text-blue-500
              border-2
              border-blue-500
              rounded-full
              px-12
              py-3
              hover:bg-blue-500
              hover:text-white
            "
          >
            Website
          </a>
        )}


      </div>
      <div 
        className="
          flex
          flex-wrap
          justify-center
          gap-4
          py-8
          px-2
        "
      >
        {artist.instagram && (
          <span 
            className="
              inline-block 
              bg-gray-200 
              rounded-full 
              px-3 
              py-1 
              text-sm 
              font-semibold 
              text-gray-700 
              
            "
          >
            <a href={artist.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </span>
        )}
        {artist.spotify && (
          <span 
            className="
              inline-block 
              bg-gray-200 
              rounded-full 
              px-3 
              py-1 
              text-sm 
              font-semibold 
              text-gray-700 
              
            "
          >
            <a href={artist.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
          </span>
        )}
        {artist.apple && (
          <span
            className="
              inline-block 
              bg-gray-200 
              rounded-full 
              px-3 
              py-1 
              text-sm 
              font-semibold 
              text-gray-700 
              
            "
          >
            <a href={artist.apple} target="_blank" rel="noopener noreferrer">Apple Music</a>
          </span>
        )}
        {artist.youtube && (
          <span 
            className="
              inline-block 
              bg-gray-200 
              rounded-full 
              px-3 
              py-1 
              text-sm 
              font-semibold 
              text-gray-700 
              
            "
          >
            <a href={artist.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
          </span>
        )}
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold text-xl mb-2">Spotlight</h3>
        {renderSpotlight()}
      </div>

    </div>
  );
};

export default Card;