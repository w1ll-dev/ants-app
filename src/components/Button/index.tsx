import { TouchableOpacityProps } from 'react-native';
import { ButtonLabel } from '../../styles/typography';
import Visible from '../Visible';
import { Background } from './styles';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'disable'> {
  label?: string;
}

export function Button({ label, children, ...rest }: ButtonProps) {
  return (
    <Background {...rest}>
      <Visible visible={!!label}>
        <ButtonLabel>{label}</ButtonLabel>
      </Visible>
      {children}
    </Background>
  );
}
