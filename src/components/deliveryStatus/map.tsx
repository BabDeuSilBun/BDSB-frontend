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

const loadKakaoMaps = () => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window.kakao !== 'undefined' && window.kakao.maps) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=b16cd4f753d59b3e2a0eff8e4c137407&libraries=services,clusterer,drawing`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });
};

const Map: React.FC<MapProps> = ({
  orderStatus,
  deliveryAddress,
  restaurantAddress,
  riderPosition,
}) => {
  useEffect(() => {
    const initializeMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao Maps API is not loaded');
        return;
      }

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
    };

    loadKakaoMaps()
      .then(initializeMap)
      .catch((err) => console.error('Failed to load Kakao Maps script: ', err));
  }, [orderStatus, deliveryAddress, restaurantAddress, riderPosition]);

  return <MapContainer id="map" />;
};

export default Map;
