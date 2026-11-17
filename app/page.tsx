import FeatureBar from '@/components/FeatureBar';
import HeroSection from '@/components/HeroSection';
import RecommendedOpportunities from '@/components/RecommendedOpportunities';
import ExploreCommunity from '@/components/ExploreCommunity';
import LatestReviewsSection from '@/components/LatestReviewsSection';
import BuyerGuideFaqSection from '@/components/BuyerGuideFaqSection';
import { getPageBySlug } from '@/lib/api';

export const revalidate = 0;

export default async function HomePage() {
  const homePage = await getPageBySlug('home');
  const heroData = homePage?.content?.hero || undefined;

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <HeroSection initialData={heroData} />
      <FeatureBar />
      <RecommendedOpportunities />
      <ExploreCommunity />
      <LatestReviewsSection />
      <BuyerGuideFaqSection variant="card" pageSlug="home" />
    </main>
  );
}
