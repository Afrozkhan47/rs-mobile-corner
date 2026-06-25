import ArrivalScene from '@/components/sections/ArrivalScene';
import FounderStoryScene from '@/components/sections/FounderStoryScene';
import ServicesFloatingDeck from '@/components/sections/ServicesFloatingDeck';
import AccessoriesScene from '@/components/sections/AccessoriesScene';
import TrustProofScene from '@/components/sections/TrustProofScene';
import LocationScene from '@/components/sections/LocationScene';
import FinalCTAScene from '@/components/sections/FinalCTAScene';

export default function HomePage() {
  return (
    <>
      <ArrivalScene />
      <FounderStoryScene />
      <ServicesFloatingDeck />
      <AccessoriesScene />
      <TrustProofScene />
      <LocationScene />
      <FinalCTAScene />
    </>
  );
}
