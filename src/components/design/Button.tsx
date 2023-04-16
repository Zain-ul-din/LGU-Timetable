import React from 'react';
import styles from '~/styles/design/button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
   return (
      <button {...props} className={styles.btn + ' ' + props.className}>
         {children}
      </button>
   );
};

export default Button;
