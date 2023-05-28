import { Wrapper } from './styles';
import { Text } from '..';
import { Check } from '../../assets';

type CheckBoxProps = {
  className?: string;
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  label: string;
  name: string;
  checked: boolean;
  onClick: () => void;
};

const CheckBox = ({
  label,
  name,
  checked,
  onClick,
  ...props
}: CheckBoxProps) => {
  return (
    <Wrapper checked={checked} {...props} onClick={onClick}>
      <div className='checkbox'>
        <Check />
      </div>
      <Text variant='body'>{label}</Text>
    </Wrapper>
  );
};

export default CheckBox;
