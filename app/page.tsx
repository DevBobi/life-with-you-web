export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'linear-gradient(180deg, #fef7ed 0%, #f9fafb 100%)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: 8 }}>
          Our Love Story
        </h1>
        <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
          Open a share link from the app to view a story here.
        </p>
      </div>
    </main>
  );
}
