
import { Player} from '@lottiefiles/react-lottie-player';
import loading from "../../loader/loading-animation.json"
const Loading = () => {
    return (
        <div>
           <Player
  autoplay
  loop
  src={loading}
  style={{ height: '300px', width: '300px' }}
>
  
</Player> 
        </div>
    );
};

export default Loading;