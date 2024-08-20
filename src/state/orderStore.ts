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
  purchaseType: string;
  minHeadcount: number;
  maxHeadcount: number;
  isEarlyPaymentAvailable: boolean;
  paymentAvailableAt: Date;
  deliveredAddress: Address;
  metAddress: Address;
  description: string;
  time: Time;
}

interface OrderStore {
  formData: OrderFormData;
  setStoreId: (storeId: number) => void;
  setPurchaseType: (purchaseType: string) => void;
  setMinHeadcount: (minHeadcount: number) => void;
  setMaxHeadcount: (maxHeadcount: number) => void;
  setIsEarlyPaymentAvailable: (isAvailable: boolean) => void;
  setPaymentAvailableAt: () => void;
  setDeliveredAddress: (address: Address) => void;
  setMetAddress: (address: Address) => void;
  setDescription: (description: string) => void;
  setTime: (time: Partial<Time>) => void;
  setButtonActive: (isActive: boolean) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  formData: {
    storeId: 0,
    purchaseType: '',
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
  setIsEarlyPaymentAvailable: (isAvailable) =>
    set((state) => ({
      formData: { ...state.formData, isEarlyPaymentAvailable: isAvailable },
    })),
  setPaymentAvailableAt: () =>
    set((state) => ({
      formData: { ...state.formData, paymentAvailableAt: new Date() },
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
  setButtonActive: (isActive) => set({ isButtonActive: isActive }),
}));
