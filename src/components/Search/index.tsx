import { Wrapper } from './styles';
import { Search as SearchIcon } from '../../assets';

type SearchProps = {
  className?: string;
  color?:
    | 'client'
    | 'productOwner'
    | 'developer'
    | 'admin'
    | 'success'
    | 'warning'
    | 'error'
    | 'black'
    | 'white';
  value: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({
  color = 'client',
  value,
  onChange,
  ...props
}: SearchProps) => {
  return (
    <Wrapper color={color} {...props}>
      <div className='search'>
        <span className='icon left'>
          <SearchIcon />
        </span>
        <input
          type='text'
          value={value}
          onChange={onChange}
          placeholder='Search'
        />
      </div>
    </Wrapper>
  );
};

export default Search;
