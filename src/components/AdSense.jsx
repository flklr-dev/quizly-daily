import React, { useEffect, useRef } from 'react';

const AdSense = ({ adSlot, adFormat = 'auto', className = '', style = {} }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        // Check if the ad container is visible and has width
        if (adRef.current) {
          const rect = adRef.current.getBoundingClientRect();
          const isVisible = rect.width > 0 && rect.height > 0;
          
          if (!isVisible) {
            console.log('Ad container not visible, skipping ad load');
            return;
          }
        }

        // Push the ad to Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={adRef}
      className={`ad-container ${className}`} 
      style={{ 
        minWidth: '160px',
        minHeight: '90px',
        ...style 
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ 
          display: 'block',
          minWidth: '160px',
          minHeight: '90px'
        }}
        data-ad-client="ca-pub-4442939390084208"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense; 