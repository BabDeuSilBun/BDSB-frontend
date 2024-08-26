import { create } from 'zustand';

interface Time {
  amPm: string;
  hour: string;
  minute: string;
}

export interface StoredAddress {
  postal: string;
  streetAddress: string;
  detailAddress: string;
}

interface OrderFormData {
  storeId: number;
  purchaseType: string | null;
  minHeadcount: number;
  maxHeadcount: number;
  orderType: string | null;
  isEarlyPaymentAvailable: boolean;
  paymentAvailableAt: string;
  time: Time;
  deliveredAddress: StoredAddress;
  metAddress: StoredAddress;
  description: string;
  maxIndividualDeliveryFee: number;
}

interface OrderStore {
  formData: OrderFormData;
  isButtonActive: boolean;
  isUsingDefaultAddress: boolean;
  setStoreId: (storeId: number) => void;
  setPurchaseType: (purchaseType: string | null) => void;
  setMinHeadcount: (minHeadcount: number) => void;
  setMaxHeadcount: (maxHeadcount: number) => void;
  setOrderType: (orderType: string | null) => void;
  setIsEarlyPaymentAvailable: (isAvailable: boolean) => void;
  setPaymentAvailableAt: (time: Time) => void;
  setTime: (time: Partial<Time>) => void;
  setDeliveredAddress: (address: StoredAddress) => void;
  setMetAddress: (address: StoredAddress) => void;
  setDescription: (description: string) => void;
  setButtonActive: (isActive: boolean) => void;
  setMaxIndividualDeliveryFee: (fee: number) => void;
  setIsUsingDefaultAddress: (isUsing: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  formData: {
    storeId: 0,
    purchaseType: '',
    orderType: '',
    minHeadcount: 1,
    maxHeadcount: 1,
    isEarlyPaymentAvailable: false,
    paymentAvailableAt: '',
    deliveredAddress: {
      postal: '',
      streetAddress: '',
      detailAddress: '',
    },
    metAddress: {
      postal: '',
      streetAddress: '',
      detailAddress: '',
    },
    description: '',
    time: { amPm: '오전', hour: '', minute: '' },
    maxIndividualDeliveryFee: 0,
  },
  isButtonActive: false,
  isUsingDefaultAddress: true,
  setStoreId: (storeId) =>
    set((state) => ({
      formData: { ...state.formData, storeId },
    })),
  setPurchaseType: (purchaseType) =>
    set((state) => ({
      formData: { ...state.formData, purchaseType },
    })),
  setMinHeadcount: (minHeadcount) =>
    set((state) => ({
      formData: { ...state.formData, minHeadcount },
    })),
  setMaxHeadcount: (maxHeadcount) =>
    set((state) => ({
      formData: { ...state.formData, maxHeadcount },
    })),
  setOrderType: (orderType) =>
    set((state) => ({
      formData: {
        ...state.formData,
        orderType,
        isEarlyPaymentAvailable: orderType === '바로 주문',
      },
    })),
  setIsEarlyPaymentAvailable: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        isEarlyPaymentAvailable: state.formData.orderType === '바로 주문',
      },
    })),
  setPaymentAvailableAt: (time: Time) => {
    const currentDate = new Date();

    let hour = parseInt(time.hour, 10);
    if (time.amPm === '오후' && hour !== 12) {
      hour += 12;
    } else if (time.amPm === '오전' && hour === 12) {
      hour = 0;
    }

    currentDate.setHours(hour);
    currentDate.setMinutes(parseInt(time.minute, 10));
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    if (isNaN(currentDate.getTime())) {
      console.error('Invalid time value');
      return;
    }

    const isoDate = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
    ).toISOString();

    set((state) => ({
      formData: { ...state.formData, paymentAvailableAt: isoDate },
    }));
  },
  setTime: (newTime) =>
    set((state) => ({
      formData: {
        ...state.formData,
        time: {
          ...state.formData.time,
          ...newTime,
        },
      },
    })),
  setDeliveredAddress: (address) =>
    set((state) => ({
      formData: { ...state.formData, deliveredAddress: address },
    })),
  setMetAddress: (address) =>
    set((state) => ({
      formData: { ...state.formData, metAddress: address },
    })),
  setDescription: (description) =>
    set((state) => ({
      formData: { ...state.formData, description },
    })),
  setButtonActive: (isActive) => set({ isButtonActive: isActive }),
  setMaxIndividualDeliveryFee: (fee) =>
    set((state) => ({
      formData: { ...state.formData, maxIndividualDeliveryFee: fee },
    })),
  setIsUsingDefaultAddress: (isUsing) =>
    set({ isUsingDefaultAddress: isUsing }),
}));
