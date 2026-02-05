import React, { useEffect, useState } from 'react';
import './Loading.css';

function Loading({ isLoading }) {
    const [loadingPercentage, setLoadingPercentage] = useState(0);

    useEffect(() => {
        let interval;

        if (isLoading) {
            setLoadingPercentage(0);
            interval = setInterval(() => {
                setLoadingPercentage(prev => {
                    if (prev >= 95) return prev;
                    return prev + 1;
                });
            }, 30);
        } else {
            setLoadingPercentage(100);
        }

        return () => clearInterval(interval);
    }, [isLoading]);

    if (!isLoading) return null;

    return (
        <div className="loading-wrapper">
            <div className="loading-content">
                {/* Text instead of logo */}
                <h1 className="loading-text">
                    Shree Shashwatraj
                </h1>

                <p className="loading-percentage mt-3">
                    {loadingPercentage}%
                </p>
            </div>
        </div>
    );
}

export default Loading;
