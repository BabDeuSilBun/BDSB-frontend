'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

interface MapProps {
  orderStatus: '주문접수' | '배달시작' | '배달거의완료' | '배달완료';
  deliveryAddress: string;
  restaurantAddress: string;
  riderPosition?: { lat: number; lng: number };
}

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const Map: React.FC<MapProps> = ({
  orderStatus,
  deliveryAddress,
  restaurantAddress,
  riderPosition,
}) => {
  useEffect(() => {
    const loadKakaoMaps = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window.kakao !== 'undefined' && window.kakao.maps) {
          resolve(); // Kakao Maps API is already loaded
          return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services,clusterer,drawing`;
        script.async = true;

        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            resolve(); // Resolve when the Kakao Maps API is fully loaded
          } else {
            reject(new Error('Kakao Maps API failed to load.'));
          }
        };

        script.onerror = (err) => reject(err);

        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      const retryCount = 0;
      const maxRetries = 20; // Increase maxRetries for more attempts
      const retryDelay = 1000; // Increase delay between retries to 1000ms (1 second)

      const attemptInitialization = (retries: number) => {
        if (
          window.kakao &&
          window.kakao.maps &&
          window.kakao.maps.LatLng &&
          window.kakao.maps.services?.Geocoder
        ) {
          console.log(
            'LatLng and Geocoder are now available:',
            window.kakao.maps.LatLng,
          );

          const mapContainer = document.getElementById('map') as HTMLElement;
          const mapOption = {
            center: new window.kakao.maps.LatLng(37.5665, 126.978), // Default center
            level: 4, // Map zoom level
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // Geocoder to convert address to coordinates
          const geocoder = new window.kakao.maps.services.Geocoder();

          // Function to place a marker
          const placeMarker = (
            position: kakao.maps.LatLng,
            map: kakao.maps.Map,
          ) => {
            const marker = new window.kakao.maps.Marker({
              position,
            });
            marker.setMap(map);
          };

          // Convert restaurant and delivery addresses to coordinates and place markers
          geocoder.addressSearch(restaurantAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const restaurantPosition = new window.kakao.maps.LatLng(
                parseFloat(result[0].y),
                parseFloat(result[0].x),
              );
              placeMarker(restaurantPosition, map);
              if (orderStatus === '주문접수') {
                map.setCenter(restaurantPosition);
              }
            } else {
              console.error('Failed to load restaurant address:', status);
            }
          });

          geocoder.addressSearch(deliveryAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const deliveryPosition = new window.kakao.maps.LatLng(
                parseFloat(result[0].y),
                parseFloat(result[0].x),
              );
              placeMarker(deliveryPosition, map);
              if (orderStatus === '주문접수') {
                map.setCenter(deliveryPosition);
              }
            } else {
              console.error('Failed to load delivery address:', status);
            }
          });

          // For 배달시작 and 배달거의완료, show the rider position and route
          if (orderStatus === '배달시작' || orderStatus === '배달거의완료') {
            if (riderPosition) {
              const riderLatLng = new window.kakao.maps.LatLng(
                riderPosition.lat,
                riderPosition.lng,
              );
              placeMarker(riderLatLng, map);
              map.setCenter(riderLatLng);

              // Optionally, draw a route (polyline implementation)
              geocoder.addressSearch(deliveryAddress, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const deliveryPosition = new window.kakao.maps.LatLng(
                    parseFloat(result[0].y),
                    parseFloat(result[0].x),
                  );
                  const linePath = [deliveryPosition, riderLatLng];

                  const polyline = new window.kakao.maps.Polyline({
                    path: linePath,
                    strokeWeight: 5,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeStyle: 'solid',
                  });

                  polyline.setMap(map);
                } else {
                  console.error(
                    'Failed to load delivery address for polyline:',
                    status,
                  );
                }
              });
            }
          }
        } else if (retries < maxRetries) {
          console.log('Retrying... Kakao Maps API is not fully initialized.');
          setTimeout(() => attemptInitialization(retries + 1), retryDelay); // Retry after 1 second
        } else {
          console.error(
            'Kakao Maps API failed to initialize after max retries.',
          );
        }
      };

      attemptInitialization(retryCount); // Initial attempt to initialize the map
    };

    loadKakaoMaps()
      .then(initializeMap)
      .catch((err) => console.error('Failed to load Kakao Maps script: ', err));
  }, [deliveryAddress, restaurantAddress, riderPosition, orderStatus]);

  return <MapContainer id="map" />;
};

export default Map;
