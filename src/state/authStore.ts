import { create } from 'zustand';

interface Address {
  postal: string;
  streetAddress: string;
  detailAddress: string;
}

interface SignUpState {
  userType: 'users' | 'businesses';
  currentStep: number;
  name: string;
  phoneNumber: string;
  businessNumber?: string;
  email: string;
  isEmailVerified: boolean;
  campus?: string;
  department?: string;
  address: Address;
  password: string;
  isButtonActive: boolean;
  buttonText: string;
  setUserType: (userType: 'users' | 'businesses') => void;
  setStep: (step: number) => void;
  setName: (name: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setBusinessNumber?: (businessNumber: string) => void;
  setEmail: (email: string) => void;
  setEmailVerified: (isEmailVerified: boolean) => void;
  setCampus?: (campus: string) => void;
  setDepartment?: (department: string) => void;
  setAddress?: (address: Address) => void;
  setPassword: (password: string) => void;
  setButtonActive: (isActive: boolean) => void;
  setButtonText: (buttonText: string) => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  currentStep: 0,
  userType: 'users',
  name: '',
  phoneNumber: '',
  businessNumber: '',
  email: '',
  isEmailVerified: false,
  campus: '',
  department: '',
  address: {
    postal: '',
    streetAddress: '',
    detailAddress: '',
  },
  password: '',
  isButtonActive: false,
  buttonText: '다음',
  setUserType: (userType) => set({ userType }),
  setStep: (step) => set({ currentStep: step }),
  setName: (name) => set({ name }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setBusinessNumber: (businessNumber) => set({ businessNumber }),
  setEmail: (email) => set({ email }),
  setEmailVerified: (isVerified) => set({ isEmailVerified: isVerified }),
  setCampus: (campus) => set({ campus }),
  setDepartment: (department) => set({ department }),
  setAddress: (address) => set({ address }),
  setPassword: (password) => set({ password }),
  setButtonActive: (isActive) => set({ isButtonActive: isActive }),
  setButtonText: (buttonText) => set({ buttonText }),
}));
