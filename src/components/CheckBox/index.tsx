import { Wrapper } from './styles';
import { Text } from '..';
import { Check } from '../../assets';

type CheckBoxProps = {
  className?: string;
  color?: 'client' | 'productOwner' | 'developer' | 'admin';
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
};

const CheckBox = ({
  label,
  name,
  checked,
  onChange,
  ...props
}: CheckBoxProps) => {
  return (
    <Wrapper checked={checked} {...props} onClick={onChange}>
      <div className='checkbox'>
        <Check />
      </div>
      <Text variant='body'>{label}</Text>
    </Wrapper>
  );
};

export default CheckBox;
