import { motion } from 'framer-motion';

export default function MainAnimator({ children }: { children: React.ReactNode }) {
   return (
      <motion.main
         initial={{ x: -300, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         exit={{ x: -300, opacity: 0 }}
         transition={{ type: 'tween', duration: 0.4 }}
      >
         {children}
      </motion.main>
   );
}
