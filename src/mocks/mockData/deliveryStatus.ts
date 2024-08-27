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

  return statuses.map((status, index) => ({
    status,
    arrivalTime: arrivalTimeFormatted,
    remainingTime: remainingTimes[index],
  }));
};

const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${period} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const simulateDeliveryStatus = (
  callback: (status: DeliveryStatusMockData) => void,
) => {
  const mockData = getDeliveryStatusMockData();

  mockData.forEach((data, index) => {
    setTimeout(() => {
      callback(data);
    }, index * 2000);
  });
};
