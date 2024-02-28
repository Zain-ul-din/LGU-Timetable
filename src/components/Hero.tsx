import Link from 'next/link';
import styles from '~/styles/hero.module.css';
import handleGlowBlob from '~/lib/glow';

export default function Hero({ renderDescription }: { renderDescription: boolean }) {
  return (
    <div className={styles.hero + ' ' + 'glow'} onMouseMove={(e) => handleGlowBlob(e)}>
      <h1 style={{ fontFamily: 'inherit' }}>
        <Link href={'/'}>LGU TIMETABLE</Link>
      </h1>
      {renderDescription && (
        <p>A non-official blazingly 🔥 fast website to access the LGU timetable.</p>
      )}
    </div>
  );
}
