import React, { useState, useEffect } from 'react';
import './ObjectModeling.css';
import { Play, Pause, Box, Camera, Lightbulb, Layers, Code, Timer } from 'lucide-react';

const MediaProjectDemo = () => {
  const [activeTab, setActiveTab] = useState('part1');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 10) {
            setIsPlaying(false);
            return 10;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const requirements = {
    part1: [
      { icon: <Box className="w-5 h-5" />, title: "Complex Object", desc: "12+ sub-parts with multiple colors" },
      { icon: <Layers className="w-5 h-5" />, title: "Matrix Stack", desc: "Push/pop transformations" },
      { icon: <Code className="w-5 h-5" />, title: "Transformations", desc: "Rotate, scale, translate" }
    ],
    part2: [
      { icon: <Camera className="w-5 h-5" />, title: "Camera Motion", desc: "Smooth camera movement through scene" },
      { icon: <Box className="w-5 h-5" />, title: "Object Animation", desc: "Translation & rotation animations" },
      { icon: <Layers className="w-5 h-5" />, title: "Instancing", desc: "Multiple copies using matrix stack" },
      { icon: <Lightbulb className="w-5 h-5" />, title: "Lighting", desc: "Dynamic light sources & shading" },
      { icon: <Timer className="w-5 h-5" />, title: "Duration", desc: "10+ seconds of animation" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/50" />
        <div className="relative container mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            3D Animation Project
          </h1>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto">
            Creating immersive 3D scenes with JavaScript and P5.js. Transform simple shapes into complex objects and bring them to life with smooth animations.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-center space-x-8 mb-12">
          <button
            onClick={() => setActiveTab('part1')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'part1'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Part 2A: Object Creation
          </button>
          <button
            onClick={() => setActiveTab('part2')}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === 'part2'
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Part 2B: Animated Scene
          </button>
          <div className="flex space-x-4 ml-8">
            <a 
              href="/Object%20Modeling/2a/index.html" 
              target="_blank"
              className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>View 2A</span>
            </a>
            <a 
              href="/Object%20Modeling/2b/index.html" 
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>View 2B</span>
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Visual Demo */}
          <div className="relative">
            <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    {activeTab === 'part1' ? (
                      <div className="w-32 h-32 mx-auto">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-12">
                          <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="url(#gradient)" stroke="white" strokeWidth="2" />
                          <circle cx="50" cy="50" r="20" fill="#ff6b6b" opacity="0.8" />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#4158D0" />
                              <stop offset="100%" stopColor="#C850C0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-64 h-32 mx-auto relative">
                        <div className="absolute w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg transform rotate-45" style={{ left: `${(currentTime / 10) * 80}%`, top: '20%' }} />
                        <div className="absolute w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ right: `${(currentTime / 10) * 60}%`, bottom: '30%' }} />
                        <div className="absolute w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg" style={{ left: '40%', top: `${Math.sin(currentTime) * 20 + 50}%` }} />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-4">{activeTab === 'part1' ? 'Rotating 3D Object' : 'Animated Scene Preview'}</p>
                  <a 
                    href={activeTab === 'part1' ? '/Object%20Modeling/2a/index.html' : '/Object%20Modeling/2b/index.html'}
                    target="_blank"
                    className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>View Live Demo</span>
                  </a>
                  {activeTab === 'part2' && (
                    <div className="flex items-center justify-center space-x-4 mt-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <div className="bg-gray-800 rounded-full px-4 py-2">
                        <span className="font-mono text-sm">{currentTime.toFixed(1)}s / 10.0s</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-3xl font-bold mb-6">
              {activeTab === 'part1' ? 'Object Requirements' : 'Scene Requirements'}
            </h2>
            <div className="space-y-4">
              {requirements[activeTab === 'part1' ? 'part1' : 'part2'].map((req, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-4 flex items-start space-x-4 hover:bg-gray-800 transition-colors">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                    {req.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{req.title}</h3>
                    <p className="text-gray-400">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-20">
          <h3 className="text-2xl font-bold mb-6">What You Need to Do</h3>
          
          {activeTab === 'part1' ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-3">Part 2A: Create a 3D Object</h4>
                <p className="text-gray-300 mb-4">
                  Design and build a complex 3D character or object that will be the main protagonist in your animated scene. 
                  This could be anything from a character, vehicle, musical instrument, or even a household appliance.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Key Tasks:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Choose a recognizable object (NOT a snowman, panda, penguin, or Android mascot)</li>
                  <li>• Build it using at least 12 different sub-parts (spheres, cylinders, boxes, etc.)</li>
                  <li>• Use multiple colors to make it visually interesting</li>
                  <li>• Apply all three transformations: translate, rotate, and scale</li>
                  <li>• Use matrix stack operations (push/pop) to assemble the parts</li>
                  <li>• Make the object slowly rotate to show all sides</li>
                  <li>• Submit a square screenshot with white background</li>
                </ul>
              </div>
              
              <div className="bg-purple-900/20 rounded-lg p-4">
                <p className="text-purple-300">
                  💡 <strong>Remember:</strong> Effort and creativity count! A simple thrown-together object won't score well. 
                  Put thought into your design and execution.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-3">Part 2B: Create an Animated Scene</h4>
                <p className="text-gray-300 mb-4">
                  Build a complete animated scene that tells a story. Incorporate your object from Part 2A and create 
                  an engaging narrative with beginning, middle, and end - all in a 10+ second animation.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Required Elements:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Camera Motion:</strong> Move the camera smoothly through the scene using camera() function</li>
                  <li>• <strong>Object Animation:</strong> Include at least 2 different object motions (one with translation, one with rotation)</li>
                  <li>• <strong>Include Part 2A Object:</strong> Your protagonist must appear in the scene</li>
                  <li>• <strong>Object Instancing:</strong> Duplicate at least one object using matrix stack (not copy-paste code)</li>
                  <li>• <strong>Lighting:</strong> Add at least one light source (not just ambient light)</li>
                  <li>• <strong>Duration:</strong> Animation should run for 10+ seconds</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/20 rounded-lg p-4">
                <p className="text-blue-300">
                  🎬 <strong>Pro Tip:</strong> Use a "time" variable with if statements to control different events. 
                  For example: if (time &lt; 60) {"{ /* first scene */ }"} else if (time &lt; 120) {"{ /* second scene */ }"}
                </p>
              </div>
              
              <div className="bg-purple-900/20 rounded-lg p-4">
                <p className="text-purple-300">
                  ⚡ <strong>Performance Note:</strong> Too many spheres can slow down your animation. 
                  Use sphere(detailX, detailY) with lower values for better performance.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="text-center mb-20">
          <h3 className="text-3xl font-bold mb-8">Project Timeline</h3>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <p className="font-semibold">Object Design</p>
              <p className="text-gray-400 text-sm">Create complex 3D object</p>
            </div>
            <div className="h-1 w-16 bg-gray-700" />
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <p className="font-semibold">Scene Creation</p>
              <p className="text-gray-400 text-sm">Build animated environment</p>
            </div>
            <div className="h-1 w-16 bg-gray-700" />
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <p className="font-semibold">Final Animation</p>
              <p className="text-gray-400 text-sm">Complete 10+ second story</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-400 py-8">
          <p>Created with P5.js • JavaScript • WebGL</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a 
              href="/Object%20Modeling/2a/project_2a.js" 
              target="_blank"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <Code className="w-5 h-5 inline mr-2" />
              View 2A Source
            </a>
            <a 
              href="/Object%20Modeling/2b/project_2b.js" 
              target="_blank"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Code className="w-5 h-5 inline mr-2" />
              View 2B Source
            </a>
            <a 
              href="/Object%20Modeling/2a/Merchant_Heeba.png" 
              target="_blank"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <Box className="w-5 h-5 inline mr-2" />
              View 3D Object
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MediaProjectDemo;