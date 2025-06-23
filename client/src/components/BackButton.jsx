
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px' }}>
      <button onClick={() => navigate(-1)} className="btnHome">
        ⬅ Back
      </button>
    </div>
  );
};

export default BackButton;
