// components/StyleControls.tsx

import React from 'react';

const GENRES = [
  "Pop", "Rock", "Hip Hop", "Electronic", "Classical", "Jazz", 
  "Ambient", "Country", "Metal", "Trap", "Lofi", "Synthwave"
];

interface StyleControlsProps {
  onStyleChange?: (config: any) => void;
  config?: any;
}

export default function StyleControls({ onStyleChange, config = {} }: StyleControlsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (onStyleChange) {
      onStyleChange({ ...config, [name]: value });
    }
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Style Controls</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Genre:</label>
        <select 
          name="genre" 
          value={config.genre || ""} 
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a genre...</option>
          {GENRES.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Mood:</label>
        <input 
          type="text" 
          name="mood"
          value={config.mood || ""}
          onChange={handleChange}
          placeholder="e.g. Dreamy, Energetic"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tempo (BPM):</label>
          <input 
            type="number" 
            name="tempo"
            value={config.tempo || ""}
            onChange={handleChange}
            placeholder="Auto"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Energy (0-1):</label>
          <input 
            type="number" 
            step="0.1"
            min="0"
            max="1"
            name="energy"
            value={config.energy || ""}
            onChange={handleChange}
            placeholder="0.5"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}
