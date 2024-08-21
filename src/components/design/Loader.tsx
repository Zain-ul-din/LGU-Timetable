import styles from '~/styles/design/loader.module.css';

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Loader({ children, ...props }: DivProps) {
  return (
    <div className={styles.loader + ' ' + props.className} {...props}>
      {children}
    </div>
  );
}
