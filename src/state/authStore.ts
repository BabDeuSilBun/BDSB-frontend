import create from 'zustand';

interface SignUpState {
  currentStep: number;
  name: string;
  phone: string;
  email: string;
  campus: string;
  department: string;
  address: string;
  password: string;
  setStep: (step: number) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setEmail: (email: string) => void;
  setCampus: (campus: string) => void;
  setDepartment: (department: string) => void;
  setAddress: (address: string) => void;
  setPassword: (password: string) => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  currentStep: 1,
  name: '',
  phone: '',
  email: '',
  campus: '',
  department: '',
  address: '',
  password: '',
  setStep: (step) => set({ currentStep: step }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
  setCampus: (campus) => set({ campus }),
  setDepartment: (department) => set({ department }),
  setAddress: (address) => set({ address }),
  setPassword: (password) => set({ password }),
}));
