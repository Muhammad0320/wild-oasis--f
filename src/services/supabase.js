import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zkfxpzxzjjkdrgrrxdrg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZnhwenh6amprZHJncnJ4ZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0MTcyMTksImV4cCI6MjAwNDk5MzIxOX0.iWuVSU0tDZtRGcEKScZfb01hsotQNhtS8NFuJZV4NXE";
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl };
