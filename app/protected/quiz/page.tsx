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

return (
    <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6">Skincare Survey</h1>
    <p className="mb-6">Tell us about your skin to get personalized recommendations</p>

    <QuizForm userId={user.id} />
    </div>
);
}
