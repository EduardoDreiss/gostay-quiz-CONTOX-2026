import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://etrwhkjywikbsagkccwy.supabase.co/rest/v1/";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cndoa2p5d2lrYnNhZ2tjY3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NDIzODgsImV4cCI6MjEwMDUxODM4OH0.U2QnmAsrGQznP2ayiDWhmielyUH-TMr4CtGYZqcWKYs";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);