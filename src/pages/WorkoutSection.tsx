import React, { useState } from 'react';
import { Play, Search } from 'lucide-react';

interface WorkoutVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const workoutVideos: WorkoutVideo[] = [
  // DB Workouts
  {
    id: "db1",
    title: "Full Body Dumbbell Workout",
    description: "30-minute full body dumbbell workout with HIIT finisher",
    url: "https://www.youtube.com/embed/Jpxc0TUr9BI",
    category: "DB Workout"
  },
  {
    id: "db2",
    title: "Quick Dumbbell Strength",
    description: "15 Minute Full Body Dumbbell Workout for Strength and Conditioning",
    url: "https://www.youtube.com/embed/xqVBoyKXbsA",
    category: "DB Workout"
  },

  // Bodyweight Workouts
  {
    id: "bw1",
    title: "Full Body No Equipment",
    description: "30 Min FULL BODY WORKOUT with WARM UP - No Equipment & No Repeat",
    url: "https://www.youtube.com/embed/UIPvIYsjfpo",
    category: "Body Weight"
  },

  // HIIT Workouts
  {
    id: "hiit1",
    title: "Intense HIIT Fat Burn",
    description: "30 Min Intense HIIT Workout For Fat Burn & Cardio - No Equipment",
    url: "https://www.youtube.com/embed/4nPKyvKmFi0",
    category: "HIIT"
  },
  {
    id: "hiit2",
    title: "Quick Fat Burning HIIT",
    description: "20 Min Fat Burning HIIT Workout - Full body Cardio, No Equipment",
    url: "https://www.youtube.com/embed/-hSma-BRzoo",
    category: "HIIT"
  },
  {
    id: "hiit3",
    title: "Full Body HIIT",
    description: "30-minute high-intensity interval training",
    url: "https://www.youtube.com/embed/ml6cT4AZdqI",
    category: "HIIT"
  },

  // Core/Abs Workouts
  {
    id: "abs1",
    title: "Scientific Abs Workout",
    description: "Get Abs In 60 Days Using Science-Based Approach",
    url: "https://www.youtube.com/embed/Tn-XvYG9x7w",
    category: "Core"
  },
  {
    id: "core1",
    title: "Core Strength",
    description: "15-minute intense ab workout",
    url: "https://www.youtube.com/embed/3p8EBPVZ2Iw",
    category: "Core"
  },

  // Zumba Workouts
  {
    id: "zumba1",
    title: "Quick Dance Workout",
    description: "25 Minute Dance Workout At Home for Weight Loss",
    url: "https://www.youtube.com/embed/HlFwWrcqIYg",
    category: "Zumba"
  },
  {
    id: "zumba2",
    title: "Intense Belly Dance",
    description: "50-min Exercises To Make Belly Cry HARD",
    url: "https://www.youtube.com/embed/OCy7wPWcTBA",
    category: "Zumba"
  },
  {
    id: "zumba3",
    title: "Full Body Dance",
    description: "Belly Fat Workout + Full Body Exercise Video",
    url: "https://www.youtube.com/embed/TzbaUd5j_jA",
    category: "Zumba"
  },

  // Yoga Workouts
  {
    id: "yoga1",
    title: "Weight Loss Yoga",
    description: "30-minute yoga session for weight loss",
    url: "https://www.youtube.com/embed/s6XgAhHNO2k",
    category: "Yoga"
  },
  {
    id: "yoga2",
    title: "Morning Yoga Flow",
    description: "Energizing morning yoga routine",
    url: "https://www.youtube.com/embed/b1H3xO3x_Js",
    category: "Yoga"
  }
];

const categories = [...new Set(workoutVideos.map(video => video.category))];

export default function WorkoutSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<WorkoutVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = workoutVideos
    .filter(video => 
      (selectedCategory === 'all' || video.category === selectedCategory) &&
      (video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       video.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workout Library
          </h1>
          <p className="text-xl text-gray-600">
            Access our collection of workout videos to support your fitness journey
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map(video => (
            <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{video.title}</h3>
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                    {video.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <button
                  onClick={() => setActiveVideo(video)}
                  className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700"
                >
                  <Play className="w-5 h-5" />
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No workouts found matching your search.</p>
          </div>
        )}

        {/* Video Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full">
              <div className="relative aspect-video">
                <iframe
                  src={activeVideo.url}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full rounded-t-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{activeVideo.title}</h3>
                <p className="text-gray-600 mb-4">{activeVideo.description}</p>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}