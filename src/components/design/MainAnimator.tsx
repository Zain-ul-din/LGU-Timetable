import { motion, MotionStyle } from 'framer-motion';

export default function MainAnimator(
   { children, style }: 
   { children: React.ReactNode, style?: MotionStyle  }
) {
   return (
      <motion.main
         initial={{ x: -300, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         exit={{ x: -300, opacity: 0 }}
         transition={{ type: 'tween', duration: 0.4 }}
         style={style}
      >
         {children}
      </motion.main>
   );
}
