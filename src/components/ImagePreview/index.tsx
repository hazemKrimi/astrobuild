import { Wrapper } from './styles';
import { Upload, Close } from '../../assets';

type ImagePreviewProps = {
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
  error?: boolean;
  errorMessage?: string;
  name?: string;
  image: { name: string; src: string } | undefined;
  deletable?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
};

const ImagePreview = ({
  name,
  image,
  deletable = false,
  onChange,
  onDelete,
  ...props
}: ImagePreviewProps) => {
  return (
    <Wrapper image={image} deletable={deletable} {...props}>
      {image ? (
        <div className='preview'>
          {deletable && (
            <div className='close'>
              <Close onClick={onDelete} />
            </div>
          )}
        </div>
      ) : (
        <div className='upload'>
          <input type='file' name={name} onChange={onChange} />
          <Upload />
        </div>
      )}
    </Wrapper>
  );
};

export default ImagePreview;
