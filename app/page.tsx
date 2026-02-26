export default function HomePage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 380 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>❤️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1e1b2e', letterSpacing: -0.8, marginBottom: 10 }}>
          Life With You
        </h1>
        <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.6, marginBottom: 32 }}>
          Open a share link from the app to view your love story here.
        </p>
        <div
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            background: '#fce7f3',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 600,
            color: '#e11d48',
          }}
        >
          Waiting for a share link...
        </div>
      </div>
    </main>
  );
}
