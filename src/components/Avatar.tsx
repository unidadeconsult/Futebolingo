import './Avatar.css';

interface AvatarProps {
  size?: number;
  gradient?: 'gold' | 'primary';
  children: React.ReactNode;
  className?: string;
}

export function Avatar({ size = 40, gradient = 'gold', children, className = '' }: AvatarProps) {
  return (
    <div
      className={`avatar avatar-${gradient} ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {children}
    </div>
  );
}
