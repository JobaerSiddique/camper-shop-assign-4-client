import React from 'react';

// Define the type for each video object
interface Video {
  title: string;
  description: string;
  videoUrl: string;
}

// Define the videos array with proper typing
const videos: Video[] = [
  {
    title: "Camping Essentials for Beginners",
    description: "Learn about the must-have items for your first camping trip.",
    videoUrl: "https://www.youtube.com/embed/Scxs7L0vhZ4", 
  },
  {
    title: "Top 10 Camping Spots in the US",
    description: "Explore some of the best camping locations across the United States.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  },
  {
    title: "How to Set Up a Tent Like a Pro",
    description: "A step-by-step guide to setting up a tent efficiently.",
    videoUrl: "https://www.youtube.com/embed/Z0GFRcFm-aY", 
  },
];

const VideoBlogs: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Video Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full"
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoBlogs;
