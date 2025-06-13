import React from 'react';
import { ArrowRight, Play, Star, Users, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

export default function Hero() {
  return (
    <div className="relative min-h-screen gradient-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Badge */}
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Star className="w-4 h-4 mr-2" />
              #1 Fitness Coach in India
            </Badge>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Transform Your
              <span className="text-gradient block">Life Through</span>
              Holistic Health
            </h1>
            
            <p className="text-xl lg:text-2xl text-foreground/80 mb-8 leading-relaxed">
              Discover personalized wellness solutions that empower you to live your 
              <span className="text-primary font-semibold"> healthiest, most vibrant life</span>.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">1000+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">95% Success Rate</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg animate-glow"
                asChild
              >
                <a 
                  href="https://topmate.io/fitbyrishab/1033630" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/20 hover:bg-primary/10 px-8 py-6 text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full relative">
            <Card className="glass border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/ULHUasd3dck"
                    title="Introduction Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Floating Stats Cards */}
            <Card className="absolute -bottom-6 -left-6 glass border-primary/20 p-4 animate-float">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-foreground/70">Happy Clients</p>
              </div>
            </Card>

            <Card className="absolute -top-6 -right-6 glass border-primary/20 p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">95%</p>
                <p className="text-sm text-foreground/70">Success Rate</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}