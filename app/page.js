import HomePageClient from './HomePageClient';
import { getFeaturedArticles } from '../lib/articles';

export default async function Home() {
  const displayedArticles = getFeaturedArticles();
  return <HomePageClient displayedArticles={displayedArticles} />;
}
