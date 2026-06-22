import ArrivalScene from '@/components/sections/ArrivalScene';
import MeetRahimScene from '@/components/sections/MeetRahimScene';
import ServicesScene from '@/components/sections/ServicesScene';
import AccessoriesScene from '@/components/sections/AccessoriesScene';
import GalleryScene from '@/components/sections/GalleryScene';
import ContactScene from '@/components/sections/ContactScene';
import MarqueeTicker from '@/components/ui/MarqueeTicker';

const MARQUEE_ITEMS = [
  'iPhone Repair',
  'Samsung Specialist',
  'Motherboard Surgery',
  'Water Damage Recovery',
  'Screen Replacement',
  'Battery Renewal',
  'Apple Watch Repair',
  'iPad Restoration',
  'Data Recovery',
  'OEM Components',
  'Same-Day Service',
  '6 Years Experience',
];

export default function HomePage() {
  return (
    <>
      <ArrivalScene />
      <MeetRahimScene />

      <MarqueeTicker items={MARQUEE_ITEMS} speed={35} />

      <ServicesScene />
      <AccessoriesScene />

      <SceneDivider />

      <GalleryScene />
      <ContactScene />
    </>
  );
}

/**
 * Cinematic scene transition — a subtle gradient divider
 * that creates a seamless visual flow between sections
 */
function SceneDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        height: 'clamp(1.5rem, 4vh, 4rem)',
        position: 'relative',
        background:
          'linear-gradient(to bottom, transparent, rgba(201,169,97,0.025), transparent)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '100%',
            background:
              'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)',
          }}
        />
      </div>
    </div>
  );
}
