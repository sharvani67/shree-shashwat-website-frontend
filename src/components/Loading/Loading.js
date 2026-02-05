import React, { useEffect, useState } from 'react';
import Logo from '../../assets/Loading.jpg'
import './Loading.css'

function Loading({ isLoading }) {
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        let interval;

        if (isLoading) {
            setLoadingPercentage(0); // Reset percentage if loading starts again
            interval = setInterval(() => {
                setLoadingPercentage(prev => {
                    if (prev >= 95) return prev;
                    return prev + 1;
                });
            }, 30);
        } else {
            setLoadingPercentage(100); // Set to 100 when loading is done
        }

        return () => clearInterval(interval);
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="loading-wrapper">
            <div className="loading-content">
                <img
                    src={Logo}
                    alt="Loading Logo"
                    className="loading-logo"
                />
                <p className="loading-percentage mt-3">{loadingPercentage}%</p>
            </div>
        </div>
    );
}

export default Loading;

// import React, { useEffect, useState } from 'react';
// import { Player } from '@lottiefiles/react-lottie-player';
// import lottieAnimation from '../../assets/Animation - 1748721158472.json'; // Put your Lottie JSON here
// import './Loading.css';

// function Loading({ isLoading }) {
//     const [loadingPercentage, setLoadingPercentage] = useState(0);

//     useEffect(() => {
//         let interval;

//         if (isLoading) {
//             setLoadingPercentage(0);
//             interval = setInterval(() => {
//                 setLoadingPercentage(prev => {
//                     if (prev >= 95) return prev;
//                     return prev + 1;
//                 });
//             }, 30);
//         } else {
//             setLoadingPercentage(100);
//         }

//         return () => clearInterval(interval);
//     }, [isLoading]);

//     if (!isLoading) return null;

//     return (
//         <div className="loading-wrapper sparkle">
//             <div className="loading-content">
//                 <Player
//                     autoplay
//                     loop
//                     src={lottieAnimation}
//                     style={{ height: '200px', width: '200px' }}
//                 />
//                 <div className="animated-dots mt-3">
//                     <span>.</span><span>.</span><span>.</span>
//                 </div>
//                 <div className="progress-container mt-4">
//                     <div className="progress-bar" style={{ width: `${loadingPercentage}%` }}></div>
//                 </div>
//                 <p className="loading-percentage mt-2">{loadingPercentage}%</p>
//             </div>
//         </div>
//     );
// }

// export default Loading;

