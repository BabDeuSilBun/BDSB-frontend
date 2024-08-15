import { useSignUpStore } from '@/state/authStore';

const Step1Name = () => {
  const { name, setName, setStep } = useSignUpStore();

  return (
    <div>
      <h2>이름 입력</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step1Name;
