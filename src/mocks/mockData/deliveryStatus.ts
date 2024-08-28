import {
  DeliveryStatusMockData,
  DeliveryStatusType,
} from '@/types/deliveryStatusTypes';

export const getDeliveryStatusMockData = (): DeliveryStatusMockData[] => {
  const statuses: DeliveryStatusType[] = [
    '주문접수',
    '배달시작',
    '배달거의완료',
    '배달완료',
  ];
  const currentTime = new Date();

  // Calculate the arrival time, which is always 20 minutes later than the current time
  const arrivalTime = new Date(currentTime.getTime() + 20 * 60 * 1000);
  const arrivalTimeFormatted = formatTime(arrivalTime);

  // Generate the status data with decreasing remaining times: 20min, 10min, 5min, and 0min
  const remainingTimes = [20, 10, 5, 0];

  // Define the restaurant and delivery positions
  const restaurantPosition = { lat: 37.4599, lng: 126.9519 }; // Seoul National University
  const deliveryPosition = { lat: 37.4665, lng: 126.9527 }; // A location near SNU

  // Calculate the straight line position between two points
  const interpolatePosition = (
    start: { lat: number; lng: number },
    end: { lat: number; lng: number },
    ratio: number,
  ) => ({
    lat: start.lat + (end.lat - start.lat) * ratio,
    lng: start.lng + (end.lng - start.lng) * ratio,
  });

  return statuses.map((orderStatus, index) => {
    let riderPosition: { lat: number; lng: number } | null = null;

    switch (orderStatus) {
      case '배달시작':
        // Rider is 25% of the way from the restaurant to the delivery address
        riderPosition = interpolatePosition(
          restaurantPosition,
          deliveryPosition,
          0.25,
        );
        break;
      case '배달거의완료':
        // Rider is 80% of the way from the restaurant to the delivery address
        riderPosition = interpolatePosition(
          restaurantPosition,
          deliveryPosition,
          0.8,
        );
        break;
      case '배달완료':
        // Rider is at the delivery address
        riderPosition = deliveryPosition;
        break;
      default:
        riderPosition = null;
    }

    return {
      orderStatus,
      arrivalTime: arrivalTimeFormatted,
      remainingTime: remainingTimes[index],
      restaurantPosition,
      deliveryPosition,
      ...(riderPosition && { riderPosition }), // Include riderPosition only if it's not null
    };
  });
};

const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${period} ${formattedHours}:${formattedMinutes}`;
};

export const simulateDeliveryStatus = (
  callback: (status: DeliveryStatusMockData) => void,
) => {
  const mockData = getDeliveryStatusMockData();

  mockData.forEach((data, index) => {
    setTimeout(() => {
      callback(data);
    }, index * 5000);
  });
};
