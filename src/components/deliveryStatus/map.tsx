'use client';

import { useEffect } from 'react';

import styled from 'styled-components';

import { DeliveryStatusMockData } from '@/types/deliveryStatusTypes';

interface MapProps {
  orderStatus: DeliveryStatusMockData['orderStatus'];
  deliveryPosition: DeliveryStatusMockData['deliveryPosition'];
  restaurantPosition: DeliveryStatusMockData['restaurantPosition'];
  riderPosition?: DeliveryStatusMockData['riderPosition'];
  padding?: string;
  margin?: string;
}

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  padding: 0;
  margin: 10px 0 0;
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
            center: new window.kakao.maps.LatLng(37.4599, 126.9519), // Seoul National University
            level: 5, // Map zoom level
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const placeMarker = (
            position: kakao.maps.LatLng,
            map: kakao.maps.Map,
          ) => {
            const marker = new window.kakao.maps.Marker({
              position,
            });
            marker.setMap(map);
          };

          // Place markers for restaurant, delivery, and rider positions
          const restaurantLatLng = new window.kakao.maps.LatLng(
            restaurantPosition.lat,
            restaurantPosition.lng,
          );
          placeMarker(restaurantLatLng, map);

          const deliveryLatLng = new window.kakao.maps.LatLng(
            deliveryPosition.lat,
            deliveryPosition.lng,
          );
          placeMarker(deliveryLatLng, map);

          if (
            (orderStatus === '배달시작' || orderStatus === '배달거의완료') &&
            riderPosition
          ) {
            const riderLatLng = new window.kakao.maps.LatLng(
              riderPosition.lat,
              riderPosition.lng,
            );
            placeMarker(riderLatLng, map);
            map.setCenter(riderLatLng);

            const linePath = [deliveryLatLng, riderLatLng];
            const polyline = new window.kakao.maps.Polyline({
              path: linePath,
              strokeWeight: 5,
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeStyle: 'solid',
            });

            polyline.setMap(map);
          }
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
