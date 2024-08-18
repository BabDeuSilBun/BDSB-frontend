import { create } from 'zustand';

interface Time {
  amPm: string;
  hour: string;
  minute: string;
}

interface OrderFormData {
  mealType: string;
  orderType: string;
  meetingPlace: string;
  deliveryPlace: string;
  minHeadcount: number;
  maxHeadcount: number;
  additionalInfo: string;
  time: Time;
}

interface OrderStore {
  formData: OrderFormData;
  setMealType: (mealType: string) => void;
  setOrderType: (orderType: string) => void;
  setMeetingPlace: (meetingPlace: string) => void;
  setDeliveryPlace: (deliveryPlace: string) => void;
  setMinHeadcount: (minHeadcount: number) => void;
  setMaxHeadcount: (maxHeadcount: number) => void;
  setAdditionalInfo: (additionalInfo: string) => void;
  setTime: (time: Partial<Time>) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  formData: {
    mealType: 'option1',
    orderType: 'optionA',
    meetingPlace: '',
    deliveryPlace: '',
    minHeadcount: 1,
    maxHeadcount: 10,
    additionalInfo: '',
    time: { amPm: '오전', hour: '', minute: '' },
  },
  setMealType: (mealType) => set((state) => ({ formData: { ...state.formData, mealType } })),
  setOrderType: (orderType) => set((state) => ({ formData: { ...state.formData, orderType } })),
  setMeetingPlace: (meetingPlace) => set((state) => ({ formData: { ...state.formData, meetingPlace } })),
  setDeliveryPlace: (deliveryPlace) => set((state) => ({ formData: { ...state.formData, deliveryPlace } })),
  setMinHeadcount: (minHeadcount) => set((state) => ({ formData: { ...state.formData, minHeadcount } })),
  setMaxHeadcount: (maxHeadcount) => set((state) => ({ formData: { ...state.formData, maxHeadcount } })),
  setAdditionalInfo: (additionalInfo) => set((state) => ({ formData: { ...state.formData, additionalInfo } })),
  setTime: (newTime) => set((state) => ({
    formData: {
      ...state.formData,
      time: {
        ...state.formData.time,
        ...newTime,      
      },
    },
  })),
}));
