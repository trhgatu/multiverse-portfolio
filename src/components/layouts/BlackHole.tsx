const BlackHole = () => {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover -z-10"
      style={{ filter: 'hue-rotate(20deg) saturate(2)' }}
    >
      <source src="/assets/blackhole.webm" type="video/webm" />
    </video>
  );
};

export default BlackHole;
