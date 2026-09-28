import type { Metadata } from 'next';
import { AboutPage } from '@/components/about-page';

export const metadata: Metadata = {
  title: 'About the challenge',
  description: 'Architecture, stack, API, and deployment notes for the expense-sharing code challenge.',
};

export default function Page() {
  return <AboutPage />;
}
