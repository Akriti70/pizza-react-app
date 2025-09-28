// src/supabase/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://unwprvojuebfvyaypmgl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVud3Bydm9qdWViZnZ5YXlwbWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNDU3NTgsImV4cCI6MjA3MzYyMTc1OH0.5-CQa9Idubgir20MLv9ofNXb004QTT4Tw4wFHSd_UPQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
