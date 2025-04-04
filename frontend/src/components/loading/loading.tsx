import LoadingGif from '@/assets/loading.gif'
import './style.css'

const Loading = () => {
  return (
    <div className="loading">        
      <img src={LoadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;