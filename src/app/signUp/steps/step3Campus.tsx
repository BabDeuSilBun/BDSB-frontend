'use Effect';

import { useSignUpStore } from '@/state/authStore';
import { useEffect } from 'react';

const Step3Campus = () => {
  const { campus, setCampus, setStep } = useSignUpStore();

  useEffect(() => {}, []);

  return (
    <div>
      <input
        type="text"
        value={campus}
        onChange={(e) => setCampus(e.target.value)}
        placeholder="재학 중인 대학교와 캠퍼스 입력"
        aria-label="재학 중인 대학교와 캠퍼스 입력"
        aria-required="true"
      />
    </div>
  );
};

export default Step3Campus;
