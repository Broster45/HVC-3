const highlandValleyLogo = "/attached_assets/Highland Valley (1)_1751581608102.png";
const Highland_Valley__5_ = "/attached_assets/Highland Valley (5).png";

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <img 
      src={Highland_Valley__5_}
      alt="Highland Valley Construction"
      className={`h-20 w-auto ${className}`}
    />
  );
}
