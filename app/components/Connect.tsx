import FloatingLines from '@/components/FloatingLines';

export default function Connect() {
  return (
    <div style={{ width: '100%', height: '800px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        // Array - specify line count per wave; Number - same count for all waves
        lineCount={5}
        // Array - specify line distance per wave; Number - same distance for all waves
        lineDistance={5}
        bendRadius={5}
        bendStrength={1.5}
        interactive={true}
        parallax={true}
      />
      <div style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>
          That's All, Folks! Intrigued?
        </h2>
        <button style={{
          padding: '1rem 2.5rem',
          fontSize: '1.5rem',
          border: '2px solid white',
          borderRadius: '50px',
          backgroundColor: 'transparent',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: '500'
        }}>
          Let's Connect →
        </button>
        <p style={{ fontSize: '1rem', color: '#999', marginTop: '2rem', maxWidth: '600px' }}>
          Warning: Getting your designs done from me might result in an overload of compliments & growth. Please proceed with caution.
        </p>
      </div>
    </div>
  );
}