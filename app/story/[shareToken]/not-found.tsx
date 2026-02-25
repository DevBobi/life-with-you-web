export default function NotFound() {
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
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>
          Invalid or expired link
        </h1>
        <p style={{ color: '#6b7280' }}>
          This share link may have expired. Ask for a new link from the app.
        </p>
      </div>
    </main>
  );
}
