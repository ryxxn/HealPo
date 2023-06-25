import { Children, ReactNode } from 'react';
import './style.scss';

interface ContainerProps {
  children?: ReactNode,
  bgColor?: boolean,
}

export const Container: React.FC<ContainerProps> = ({ children, bgColor = false }) => {
  return (
    <div className="container" style={bgColor ? { background: "var(--tomatoBG)" } : {}}>
      {children}
    </div>
  );
};

