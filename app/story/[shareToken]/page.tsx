import { notFound } from 'next/navigation';
import styles from './story.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

interface Moment {
  id: string;
  momentIndex: number;
  caption: string;
  imageUrl: string | null;
  status: string;
}

function ensureHttps(url: string): string {
  return url.replace(/^http:\/\/(?!localhost|127\.|192\.168\.|10\.)/, 'https://');
}

async function getStory(shareToken: string): Promise<{ moments: Moment[] } | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/story/public/${shareToken}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    data.moments = data.moments.map((m: Moment) => ({
      ...m,
      imageUrl: m.imageUrl ? ensureHttps(m.imageUrl) : null,
    }));
    return data;
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

  if (moments.length === 0) notFound();

  return (
    <main className={styles.page}>
      {/* Background blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerIcon}>❤️</div>
          <h1 className={styles.title}>Our Love Story</h1>
          <p className={styles.subtitle}>
            {moments.length} moment{moments.length !== 1 ? 's' : ''} of love, captured forever
          </p>
        </header>

        {/* Moment cards */}
        <div className={styles.grid}>
          {moments.map((m, i) => (
            <a
              key={m.id}
              href={`/story/${shareToken}/moment/${m.id}`}
              className={styles.card}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className={styles.cardImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.imageUrl!}
                  alt={m.caption}
                  className={styles.cardImage}
                />
                <div className={styles.cardBadge}>
                  Moment {m.momentIndex + 1}
                </div>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardCaption}>{m.caption}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <span>Made with ❤️ using </span>
          <strong>Life With You</strong>
        </footer>
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
    description: 'View our shared love story — moments captured forever',
  };
}
