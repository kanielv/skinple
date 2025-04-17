// app/api/ingredients/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  const { data, error } = await supabase
    .from('ingredients')
    .select('ingredient_id, name')
    .order('name');

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ingredients' },
      { status: 500 },
    );
  }

  return NextResponse.json(data || []);
}
