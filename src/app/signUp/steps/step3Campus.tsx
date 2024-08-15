import { useSignUpStore } from '@/state/authStore';

const Step3Campus = () => {
  const { campus, setCampus, setStep } = useSignUpStore();

  return (
    <div>
      <input
        type="text"
        value={campus}
        onChange={(e) => setCampus(e.target.value)}
        placeholder='재학 중인 대학교와 캠퍼스 입력'
      />
    </div>
  );
};

export default Step3Campus;
