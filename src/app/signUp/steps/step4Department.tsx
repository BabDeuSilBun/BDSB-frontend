'use client';

import { useEffect } from 'react';
import { useSignUpStore } from '@/state/authStore';

const Step4Department = () => {
  const { department, setDepartment, setStep } = useSignUpStore();

  useEffect(() => {}, []);
  
  return (
    <div>
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder="학과 선택"
        aria-label="학과 선택" 
        aria-required="true"
      />
    </div>
  );
};

export default Step4Department;
