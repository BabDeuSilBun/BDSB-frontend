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

  return statuses.map((orderStatus, index) => ({
    orderStatus, // Use 'orderStatus' to match the DeliveryStatusMockData interface
    arrivalTime: arrivalTimeFormatted,
    remainingTime: remainingTimes[index],
    restaurantPosition: { lat: 37.4599, lng: 126.9519 }, // Seoul National University
    deliveryPosition: { lat: 37.4665, lng: 126.9527 }, // A location near SNU
    riderPosition: { lat: 37.461, lng: 126.9509 }, // Another nearby location
  }));
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
