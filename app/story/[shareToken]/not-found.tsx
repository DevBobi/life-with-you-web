export default function NotFound() {
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
      <div style={{ textAlign: 'center', maxWidth: 360 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💔</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1e1b2e', marginBottom: 10 }}>
          Link expired or invalid
        </h1>
        <p style={{ fontSize: 15, color: '#78716c', lineHeight: 1.6, marginBottom: 24 }}>
          This share link may have expired. Ask your partner for a new one from the app.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#1e1b2e',
            color: '#fff',
            borderRadius: 14,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Go home
        </a>
      </div>
    </main>
  );
}
