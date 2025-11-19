import { useState } from 'react';
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
  {
    id: "db3",
    title: "45-Minute Dumbbell Strength",
    description: "Juice & Toya lead a 45 minute dumbbell circuit to build muscle and endurance.",
    url: "https://www.youtube.com/embed/qs9wyBQrNYA",
    category: "DB Workout"
  },
  {
    id: "db4",
    title: "30-Min Dumbbell Muscle Builder",
    description: "Caroline Girvan’s heavy, slow full-body lift focused on time under tension.",
    url: "https://www.youtube.com/embed/GViX8riaHX4",
    category: "DB Workout"
  },
  {
    id: "db5",
    title: "30-Min Dumbbell Strength Training",
    description: "Juice & Toya stack two rounds of compound lifts to push muscular endurance.",
    url: "https://www.youtube.com/embed/XxuRSjER3Qk",
    category: "DB Workout"
  },
  {
    id: "db6",
    title: "No-Repeat Dumbbell Power",
    description: "A heavy Juice & Toya session designed to build strength and lean mass.",
    url: "https://www.youtube.com/embed/AjAVhtQ2vok",
    category: "DB Workout"
  },
  {
    id: "db7",
    title: "Heavy Strength Dumbbell Session",
    description: "Timed 40-second intervals focused on big compound dumbbell movements.",
    url: "https://www.youtube.com/embed/KJ0FX5B0t6E",
    category: "DB Workout"
  },
  {
    id: "db8",
    title: "Full Body Strength with Heather",
    description: "Heather Robertson’s controlled dumbbell circuits target every major muscle.",
    url: "https://www.youtube.com/embed/sinkIlViPG8",
    category: "DB Workout"
  },
  {
    id: "db9",
    title: "All-Standing Dumbbell Strength",
    description: "Low-impact, all-standing work that still delivers serious dumbbell volume.",
    url: "https://www.youtube.com/embed/-vGcK_1glIk",
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
  {
    id: "bw2",
    title: "20-Min Morning Bodyweight",
    description: "Fraser Wilson’s energizing session you can do anywhere without gear.",
    url: "https://www.youtube.com/embed/IeGrTqW5lek",
    category: "Body Weight"
  },
  {
    id: "bw3",
    title: "Beginner Friendly Burner",
    description: "Team Body Project’s achievable low-impact cardio sculpt workout.",
    url: "https://www.youtube.com/embed/gC_L9qAHVJ8",
    category: "Body Weight"
  },
  {
    id: "bw4",
    title: "60-Min Calisthenics Challenge",
    description: "Caroline Girvan stacks 30 supersets for a long-form, no-equipment burner.",
    url: "https://www.youtube.com/embed/UZmKzVl5Few",
    category: "Body Weight"
  },
  {
    id: "bw5",
    title: "15-Min Bodyweight Blast",
    description: "Chris Heria’s follow-along circuit hits every muscle in just 15 minutes.",
    url: "https://www.youtube.com/embed/gnTzk1yUHB4",
    category: "Body Weight"
  },
  {
    id: "bw6",
    title: "MadFit 30-Min Bodyweight Flow",
    description: "A high-energy session from inside the MadFit app—zero gear required.",
    url: "https://www.youtube.com/embed/4iy4yEKa7W8",
    category: "Body Weight"
  },
  {
    id: "bw7",
    title: "Low-Impact Island Sweat",
    description: "Grow with Anna guides a Maldives-inspired routine with no jumping.",
    url: "https://www.youtube.com/embed/0VHgG84uq_k",
    category: "Body Weight"
  },
  {
    id: "bw8",
    title: "45-Min Apartment-Friendly Strength",
    description: "Jordan Yeoh’s endurance session focuses on quiet, joint-friendly moves.",
    url: "https://www.youtube.com/embed/jA5tcRqBjOE",
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
  {
    id: "hiit4",
    title: "45-Min Killer HIIT",
    description: "Growingannanas’ no-repeat cardio sweat session with warm up and cool down.",
    url: "https://www.youtube.com/embed/D3fRd2WwF5M",
    category: "HIIT"
  },
  {
    id: "hiit5",
    title: "Low-Impact HIIT",
    description: "yes2next’s progressive intervals keep things joint-friendly but intense.",
    url: "https://www.youtube.com/embed/TSpjo-_kX8Y",
    category: "HIIT"
  },
  {
    id: "hiit6",
    title: "23-Min No-Repeat HIIT",
    description: "TIFF x DAN deliver relentless intervals capped with a nasty finisher.",
    url: "https://www.youtube.com/embed/d-g1RsMEOdA",
    category: "HIIT"
  },
  {
    id: "hiit7",
    title: "20-Min Strength x HIIT",
    description: "Juice & Toya combine explosive cardio with strength combos for fat loss.",
    url: "https://www.youtube.com/embed/59tchbMrjIg",
    category: "HIIT"
  },
  {
    id: "hiit8",
    title: "No-Equipment HIIT with Heather",
    description: "A sweaty no-repeat routine alternating athletic cardio and mobility.",
    url: "https://www.youtube.com/embed/rFTJzKNj-vM",
    category: "HIIT"
  },
  {
    id: "hiit9",
    title: "20-Min Bodyweight HIIT Burn",
    description: "FitCircuits’ quick circuit strings together climbers, squats, and pushups.",
    url: "https://www.youtube.com/embed/IXBt541mHL4",
    category: "HIIT"
  },
  {
    id: "hiit10",
    title: "12-Min Tabata HIIT",
    description: "Grow with Anna’s tabata playlist packs 20-second blasts with 10-second rests.",
    url: "https://www.youtube.com/embed/Ujsl8nJ1svs",
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
  {
    id: "core2",
    title: "Standing Abs + HIIT",
    description: "20 upright movements blend cardio and core without hitting the floor.",
    url: "https://www.youtube.com/embed/XqsskhWGU9k",
    category: "Core"
  },
  {
    id: "core3",
    title: "10-Min Killer Core",
    description: "MadFit’s burner targets the entire core in just 10 focused minutes.",
    url: "https://www.youtube.com/embed/Gr1GtwTp_ko",
    category: "Core"
  },
  {
    id: "core4",
    title: "10-Min Ab Complex",
    description: "Caroline Girvan mixes tabletop crunches, hip raises, and oblique lifts.",
    url: "https://www.youtube.com/embed/r7gKGvjfyHg",
    category: "Core"
  },
  {
    id: "core5",
    title: "Perfect Abs Follow-Along",
    description: "A 10-minute routine laser-focused on clean form and tension.",
    url: "https://www.youtube.com/embed/9p7-YC91Q74",
    category: "Core"
  },
  {
    id: "core6",
    title: "Plank Workout for a Smaller Waist",
    description: "Emi Wong’s plank-only sequence to sculpt the midsection.",
    url: "https://www.youtube.com/embed/Z90xpWvuUPs",
    category: "Core"
  },
  {
    id: "core7",
    title: "5-Min Plank Finisher",
    description: "BullyJuice challenges the core with nonstop plank variations.",
    url: "https://www.youtube.com/embed/5Il95mQ30Ro",
    category: "Core"
  },
  {
    id: "core8",
    title: "20 Plank Variations Flow",
    description: "Caroline Girvan’s ladder of plank moves builds stability from every angle.",
    url: "https://www.youtube.com/embed/FJjT-FUlXVU",
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
  {
    id: "zumba4",
    title: "30-Min Dance Party",
    description: "Mira Pham’s high-energy zumba class torches calories fast.",
    url: "https://www.youtube.com/embed/Btyw98t0Ef4",
    category: "Zumba"
  },
  {
    id: "zumba5",
    title: "Bollywood Remix Workout",
    description: "20-minute nonstop Bollywood cardio for a fun sweat.",
    url: "https://www.youtube.com/embed/GELsQw-a_eo",
    category: "Zumba"
  },
  {
    id: "zumba6",
    title: "35-Min Zumba Sculpt",
    description: "Mira Pham leads a full-body dance workout aimed at max calorie burn.",
    url: "https://www.youtube.com/embed/ZCSGRrzHS7g",
    category: "Zumba"
  },
  {
    id: "zumba7",
    title: "25-Min Dance Sweat",
    description: "Another Mira Pham mix of upbeat tracks for a fast-paced cardio party.",
    url: "https://www.youtube.com/embed/y2HJ0Iq6R8A",
    category: "Zumba"
  },
  {
    id: "zumba8",
    title: "Zumba for Belly Fat",
    description: "DanceFit Live strings together samba-inspired moves to target the core.",
    url: "https://www.youtube.com/embed/brjOFJIcdfU",
    category: "Zumba"
  },
  {
    id: "zumba9",
    title: "Cardio Latin Dance Workout",
    description: "Nicole Steen’s 30-minute Latin session with cha-cha, salsa, and cardio drills.",
    url: "https://www.youtube.com/embed/8DZktowZo_k",
    category: "Zumba"
  },
  {
    id: "zumba10",
    title: "10-Min Latin Dance Cardio",
    description: "Pamela Reif brings high-energy hip shaking in this quick Latin groove.",
    url: "https://www.youtube.com/embed/9kT9UxSK1RM",
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
  },
  {
    id: "yoga3",
    title: "Deep Stretch Slow Flow",
    description: "Yoga With Kassandra’s 45 minute stretch class for flexibility.",
    url: "https://www.youtube.com/embed/X4MchDHkJWw",
    category: "Yoga"
  },
  {
    id: "yoga4",
    title: "20-Min Beginner Yoga",
    description: "Yoga With Adriene introduces foundational movement and breath.",
    url: "https://www.youtube.com/embed/vNyJuQuuMC8",
    category: "Yoga"
  },
  {
    id: "yoga5",
    title: "60-Min Full Body Yoga Flow",
    description: "Boho Beautiful blends mobility, flexibility, and strength in a full-hour practice.",
    url: "https://www.youtube.com/embed/H4eimzWFcls",
    category: "Yoga"
  },
  {
    id: "yoga6",
    title: "Yoga With Bird Full Body Flow",
    description: "A 30-minute vinyasa to stretch, strengthen, and reset any time of day.",
    url: "https://www.youtube.com/embed/VP3H_0O37zM",
    category: "Yoga"
  },
  {
    id: "yoga7",
    title: "Move With Nicole Daily Flow",
    description: "Connect breath and movement in this 30-minute feel-good sequence.",
    url: "https://www.youtube.com/embed/5TzqqPJFHeQ",
    category: "Yoga"
  },
  {
    id: "yoga8",
    title: "15-Min Everyday Flow",
    description: "Yoga With Tim’s all-level routine to wake up the body in the morning.",
    url: "https://www.youtube.com/embed/scTmS5iKlEg",
    category: "Yoga"
  },
  {
    id: "yoga9",
    title: "Evening Wind-Down Yoga",
    description: "Yoga With Kassandra’s bedtime stretch helps you release tension and sleep better.",
    url: "https://www.youtube.com/embed/p3EJuBxEjt0",
    category: "Yoga"
  },
  {
    id: "yoga10",
    title: "Yoga for PCOS Relief",
    description: "Move With Agnes shares pelvic-opening asanas that balance hormones and ease PCOS.",
    url: "https://www.youtube.com/embed/5JvbjrLESPs",
    category: "Yoga"
  },
  {
    id: "yoga11",
    title: "20-Min PCOD Yoga Flow",
    description: "Satvic Yoga’s routine focuses on breathwork and hip openers for PCOD/PCOS.",
    url: "https://www.youtube.com/embed/GTVvhMPSoE8",
    category: "Yoga"
  },
  {
    id: "yoga12",
    title: "Yoga for Constipation Relief",
    description: "Satvic Movement sequences twisting postures to stimulate digestion and gut health.",
    url: "https://www.youtube.com/embed/0CwzAtTRVfM",
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
