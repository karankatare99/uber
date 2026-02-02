import React from "react";

export const DarkMapBackground = () => (
  <div className="absolute inset-0 bg-[#121212] overflow-hidden -z-0 pointer-events-none select-none">
    {/* Grid Pattern */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `linear-gradient(#262626 2px, transparent 2px), linear-gradient(90deg, #262626 2px, transparent 2px)`,
        backgroundSize: '100px 100px'
      }}
    />
    <div 
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
    />
    
    {/* Abstract Blobs for "Terrain" */}
    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1a1a1a] rounded-full blur-3xl opacity-50" />
    <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-[#0a0a0a] rounded-full blur-3xl opacity-80" />
  </div>
);