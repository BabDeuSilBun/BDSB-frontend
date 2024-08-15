import { useSignUpStore } from '@/state/authStore';

const Step4Campus = () => {
  const { campus, setCampus, setStep } = useSignUpStore();

  return (
    <div>
      <h2>캠퍼스 입력</h2>
      <input
        type="campus"
        value={campus}
        onChange={(e) => setCampus(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step4Campus;
