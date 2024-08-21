import { motion, MotionStyle } from 'framer-motion';

export default function MainAnimator({
  children,
  style,
  isDisabled
}: {
  children: React.ReactNode;
  style?: MotionStyle;
  isDisabled?: boolean;
}) {
  if (isDisabled) return <>{children}</>;

  return (
    <motion.main
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.4 }}
      style={style}>
      {children}
    </motion.main>
  );
}
