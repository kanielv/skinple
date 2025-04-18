// app/recommendations/page.tsx
import { redirect } from 'next/navigation';

export default function RecommendationsIndex() {
  redirect('/protected/recommendations/1');
}
