import { create } from 'zustand';

interface Time {
  amPm: string;
  hour: string;
  minute: string;
}

interface Address {
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
  paymentAvailableAt: Date;
  time: Time;
  deliveredAddress: Address;
  metAddress: Address;
  description: string;
}

interface OrderStore {
  formData: OrderFormData;
  isButtonActive: boolean;
  setStoreId: (storeId: number) => void;
  setPurchaseType: (purchaseType: string | null) => void;
  setMinHeadcount: (minHeadcount: number) => void;
  setMaxHeadcount: (maxHeadcount: number) => void;
  setOrderType: (orderType: string | null) => void;
  setIsEarlyPaymentAvailable: (isAvailable: boolean) => void;
  setPaymentAvailableAt: (date: Date, time: Time) => void;
  setTime: (time: Partial<Time>) => void;
  setDeliveredAddress: (address: Address) => void;
  setMetAddress: (address: Address) => void;
  setDescription: (description: string) => void;
  setButtonActive: (isActive: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  formData: {
    storeId: 0,
    purchaseType: '',
    orderType: '',
    minHeadcount: 1,
    maxHeadcount: 1,
    isEarlyPaymentAvailable: false,
    paymentAvailableAt: new Date(),
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
  },
  isButtonActive: false,
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
      formData: { ...state.formData, orderType },
    })),
  setIsEarlyPaymentAvailable: () =>
    set((state) => ({
      formData: {
        ...state.formData,
        isEarlyPaymentAvailable: state.formData.orderType === '바로 주문',
      },
    })),
  setPaymentAvailableAt: (date: Date, time: Time) => {
    const adjustedDate = new Date(date);
    adjustedDate.setHours(
      time.amPm === '오후' && time.hour !== '12'
        ? parseInt(time.hour, 10) + 12
        : parseInt(time.hour, 10),
    );
    adjustedDate.setMinutes(parseInt(time.minute, 10));
    set((state) => ({
      formData: { ...state.formData, paymentAvailableAt: adjustedDate },
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
}));
