import { notFound } from 'next/navigation';
import styles from './moment.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

interface MomentData {
  id: string;
  momentIndex: number;
  caption: string;
  imageUrl: string | null;
  status: string;
}

async function getMoment(shareToken: string, momentId: string): Promise<MomentData | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/story/public/${shareToken}/moment/${momentId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function MomentPage({
  params,
}: {
  params: { shareToken: string; momentId: string };
}) {
  const { shareToken, momentId } = params;
  const moment = await getMoment(shareToken, momentId);

  if (!moment || !moment.imageUrl || moment.status !== 'completed') notFound();

  return (
    <main className={styles.page}>
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      <div className={styles.container}>
        {/* Back link */}
        <a href={`/story/${shareToken}`} className={styles.backLink}>
          ← View full story
        </a>

        {/* Image card */}
        <div className={styles.card}>
          <div className={styles.imageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={moment.imageUrl}
              alt={moment.caption}
              className={styles.image}
            />
            <div className={styles.badge}>
              Moment {moment.momentIndex + 1}
            </div>
          </div>

          <div className={styles.body}>
            <p className={styles.caption}>{moment.caption}</p>
          </div>
        </div>

        {/* CTA */}
        <a href={`/story/${shareToken}`} className={styles.ctaBtn}>
          See all moments →
        </a>

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
  params: { shareToken: string; momentId: string };
}) {
  return {
    title: 'A Special Moment — Our Love Story',
    description: 'View this special moment from our love story',
  };
}
