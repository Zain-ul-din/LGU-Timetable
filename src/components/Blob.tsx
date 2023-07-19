import { useEffect, useRef } from 'react';
import styles from '~/styles/Blob.module.css';
import { motion } from 'framer-motion';

export default function Blob() {
    const blobRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.onpointermove = (e) => {
            if (!blobRef.current) return;
            blobRef.current.animate(
                {
                    left: `${e.clientX}px`,
                    top: `${e.clientY}px`
                },
                { duration: 10000, fill: 'forwards' }
            );
        };
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5, duration: 2 }}
                className={styles.blob}
                ref={blobRef}></motion.div>
            <div className={styles.blur}></div>
        </>
    );
}
