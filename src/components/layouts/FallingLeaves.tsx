// src/components/effects/FallingLeaves.tsx
const FallingLeaves = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none mix-blend-screen"
      style={{ filter: 'hue-rotate(20deg) saturate(2)' }}
    >
      <source src="/assets/falling_leaves.webm" type="video/webm" />
    </video>
  );
};

export default FallingLeaves;
