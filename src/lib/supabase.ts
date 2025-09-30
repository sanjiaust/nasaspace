import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BloomObservation {
  id: string;
  user_id?: string;
  location: { lat: number; lng: number };
  country: string;
  district: string;
  species_name: string;
  observation_date: string;
  bloom_intensity: number;
  photo_url: string;
  source: 'citizen' | 'globe_observer' | 'nasa_satellite';
  metadata: Record<string, any>;
  created_at: string;
}

export interface BloomPrediction {
  id: string;
  location: { lat: number; lng: number };
  district: string;
  species_name: string;
  predicted_bloom_date: string;
  confidence_score: number;
  climate_factors: Record<string, any>;
  model_version: string;
  created_at: string;
}

export interface NASADataset {
  id: string;
  dataset_type: 'MODIS' | 'Landsat' | 'VIIRS' | 'AVIRIS' | 'EMIT' | 'PACE' | 'Sentinel-2';
  location: { lat: number; lng: number };
  acquisition_date: string;
  ndvi_value: number;
  evi_value: number;
  spectral_data: Record<string, any>;
  image_url: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string;
  language_preference: 'en' | 'bn';
  total_points: number;
  badges: string[];
  created_at: string;
}

export interface GamePrediction {
  id: string;
  user_id: string;
  location: { lat: number; lng: number };
  district: string;
  species_name: string;
  predicted_date: string;
  actual_bloom_date?: string;
  accuracy_score: number;
  points_earned: number;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  user_id: string;
  region: string;
  rank: number;
  total_score: number;
  accurate_predictions: number;
  updated_at: string;
  user?: User;
}