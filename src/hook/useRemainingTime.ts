import { useEffect, useState } from 'react';

// 남은 시간을 계산하여 포맷하는 함수
const formatRemainingTime = (
  targetDateStr: string,
): { time: string; $isCritical: boolean } => {
  const targetDate = new Date(targetDateStr);
  const now = new Date();
  const timeDifference = targetDate.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return { time: '시간 초과', $isCritical: false };
  }

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const remainingSeconds = seconds % 60;
  const remainingMinutes = minutes % 60;
  const remainingHours = hours % 24;

  const $isCritical = minutes < 5;

  let timeString = '';
  if (minutes < 5) {
    timeString = `${remainingMinutes}분 ${remainingSeconds}초`;
  } else if (minutes < 60) {
    timeString = `${remainingMinutes}분`;
  } else {
    timeString = `${remainingHours}시간 ${remainingMinutes}분`;
  }

  return { time: timeString, $isCritical };
};

// 커스텀 훅
const useRemainingTime = (
  targetDateStr: string,
): { time: string; $isCritical: boolean } => {
  const [remainingTime, setRemainingTime] = useState<{
    time: string;
    $isCritical: boolean;
  }>(formatRemainingTime(targetDateStr));

  useEffect(() => {
    // Immediately check the remaining time to avoid any delays
    setRemainingTime(formatRemainingTime(targetDateStr));
    
    const intervalId = setInterval(() => {
      setRemainingTime(formatRemainingTime(targetDateStr));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDateStr]);

  return remainingTime;
};

export default useRemainingTime;
