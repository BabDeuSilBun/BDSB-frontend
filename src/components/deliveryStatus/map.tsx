'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

import { DeliveryStatusMockData } from '@/types/deliveryStatusTypes';

interface MapProps {
  orderStatus: DeliveryStatusMockData['orderStatus'];
  deliveryPosition: DeliveryStatusMockData['deliveryPosition'];
  restaurantPosition: DeliveryStatusMockData['restaurantPosition'];
  riderPosition?: DeliveryStatusMockData['riderPosition'];
}

const MapContainer = styled.div`
  width: 100%;
  height: 455px;
  padding: 0;
  margin: 5px 0 0;
`;

const Map: React.FC<MapProps> = ({
  orderStatus,
  deliveryPosition,
  restaurantPosition,
  riderPosition,
}) => {
  useEffect(() => {
    const loadKakaoMaps = () => {
      return new Promise<void>((resolve, reject) => {
        if (typeof window.kakao !== 'undefined' && window.kakao.maps) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&libraries=services,clusterer,drawing`;
        script.async = true;

        script.onload = () => {
          if (window.kakao && window.kakao.maps) {
            resolve();
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
      const maxRetries = 20;
      const retryDelay = 1000;

      const attemptInitialization = (retries: number) => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.LatLng) {
          const mapContainer = document.getElementById('map') as HTMLElement;
          const mapOption = {
            center: new window.kakao.maps.LatLng(
              deliveryPosition.lat, // Set the delivery position as the center
              deliveryPosition.lng,
            ),
            level: 5, // Map zoom level
            draggable: false, // Disable dragging
            scrollwheel: false, // Disable scroll zooming
            disableDoubleClickZoom: true, // Disable double-click zoom
            disableDoubleClick: true, // Disable double-click
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          // Helper function to place custom markers with different colors
          const placeCustomMarker = (
            position: kakao.maps.LatLng,
            map: kakao.maps.Map,
            color: string,
          ) => {
            const content = `<div style="width: 20px; height: 20px; background-color: ${color}; border-radius: 50%; border: 2px solid white;"></div>`;

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: position,
              content: content,
              yAnchor: 1,
            });

            customOverlay.setMap(map);
          };

          // Place custom markers for restaurant, delivery, and rider positions
          const restaurantLatLng = new window.kakao.maps.LatLng(
            restaurantPosition.lat,
            restaurantPosition.lng,
          );
          placeCustomMarker(restaurantLatLng, map, '#FF0000'); // Red for restaurant

          const deliveryLatLng = new window.kakao.maps.LatLng(
            deliveryPosition.lat,
            deliveryPosition.lng,
          );
          placeCustomMarker(deliveryLatLng, map, '#00FF00'); // Green for delivery

          if (
            (orderStatus === '배달시작' || orderStatus === '배달거의완료') &&
            riderPosition
          ) {
            const riderLatLng = new window.kakao.maps.LatLng(
              riderPosition.lat,
              riderPosition.lng,
            );
            placeCustomMarker(riderLatLng, map, '#0000FF'); // Blue for rider

            const linePath = [deliveryLatLng, riderLatLng];
            const polyline = new window.kakao.maps.Polyline({
              path: linePath,
              strokeWeight: 5,
              strokeColor: 'var(--primary)',
              strokeOpacity: 0.8,
              strokeStyle: 'solid',
            });

            polyline.setMap(map);
          }

          // Keep the delivery position centered
          map.setCenter(deliveryLatLng);
        } else if (retries < maxRetries) {
          setTimeout(() => attemptInitialization(retries + 1), retryDelay);
        } else {
          console.error(
            'Kakao Maps API failed to initialize after max retries.',
          );
        }
      };

      attemptInitialization(retryCount);
    };

    loadKakaoMaps()
      .then(initializeMap)
      .catch((err) => console.error('Failed to load Kakao Maps script: ', err));
  }, [orderStatus, restaurantPosition, deliveryPosition, riderPosition]);

  return <MapContainer id="map" />;
};

export default Map;
