// src/components/effects/FallingLeaves.tsx
const BlackHole = () => {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute left-0 top-0 size-full w-full object-cover"
            style={{ filter: 'hue-rotate(20deg) saturate(2)' }}
        >
            <source src="/assets/blackhole.webm" type="video/webm" />
        </video>
    );
};

export default BlackHole;
