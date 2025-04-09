// app/protected/quiz/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import QuizForm from './QuizForm';

export default async function QuizPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/sign-in');
    }

    // Fetch allergies for the form TODO at some point should prolly edit quizform to not be checkboxes for this, some kinda search bar or something would be better for when we get a bunch of allergies
    const { data: allergies } = await supabase
        .from('allergies')
        .select('*');

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Skincare Survey</h1>
            <p className="mb-6">Tell us about your skin to get personalized recommendations</p>
            
            <QuizForm userId={user.id} allergies={allergies || []} />
        </div>
    );
}