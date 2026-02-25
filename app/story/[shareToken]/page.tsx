import { notFound } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

interface Moment {
  id: string;
  momentIndex: number;
  caption: string;
  imageUrl: string | null;
  status: string;
}

async function getStory(shareToken: string): Promise<{ moments: Moment[] } | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/story/public/${shareToken}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function StoryPage({
  params,
}: {
  params: { shareToken: string };
}) {
  const { shareToken } = params;
  const data = await getStory(shareToken);

  if (!data || !data.moments?.length) notFound();

  const moments = data.moments
    .filter((m) => m.status === 'completed' && m.imageUrl)
    .sort((a, b) => a.momentIndex - b.momentIndex);

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 16,
        background: 'linear-gradient(180deg, #fef7ed 0%, #f9fafb 100%)',
        color: '#111',
      }}
    >
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: 24,
            textAlign: 'center',
            color: '#1f2937',
          }}
        >
          Our Love Story
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {moments.map((m) => (
            <article
              key={m.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid #f3f4f6',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.imageUrl!}
                alt={`Moment ${m.momentIndex + 1}`}
                style={{
                  width: '100%',
                  height: 320,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{ padding: 16 }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#f0fdf4',
                    color: '#166534',
                    padding: '6px 12px',
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  Moment {m.momentIndex + 1}
                </span>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: '#374151',
                    margin: 0,
                  }}
                >
                  {m.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export function generateMetadata({
  params,
}: {
  params: { shareToken: string };
}) {
  return {
    title: 'Our Love Story',
    description: 'View your shared love story',
  };
}
