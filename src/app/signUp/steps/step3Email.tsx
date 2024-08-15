import { useSignUpStore } from '@/state/authStore';

const Step3Email = () => {
  const { email, setEmail, setStep } = useSignUpStore();

  return (
    <div>
      <h2>이메일 입력</h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step3Email;
