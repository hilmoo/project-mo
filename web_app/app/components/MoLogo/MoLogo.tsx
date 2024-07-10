import { MoLogoFull } from './MoLogoMini';
import { MoLogoText } from './MoLogoFull';
import { MoLogoInfoLomba } from './MoLogoInfoLomba';
import { LogoProps } from './use-mo-logo-colors';

export interface MantineLogoProps extends LogoProps {
  type?: 'mini' | 'text' | 'infolomba';
}

export function MoLogo({ type, ...others }: MantineLogoProps) {
  if (type === 'mini') {
    return <MoLogoFull {...others} />;
  }

  if (type === 'infolomba') {
    return <MoLogoInfoLomba {...others} />;
  }

  return <MoLogoText {...others} />;
}