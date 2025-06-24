
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className='backButton'>
      <button onClick={() => navigate(-1)} className="btnHome">
        ⬅ Back
      </button>
    </div>
  );
};

export default BackButton;
