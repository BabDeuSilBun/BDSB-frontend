import { useSignUpStore } from '@/state/authStore';

const Step7Password = () => {
  const { password, setPassword, setStep } = useSignUpStore();

  return (
    <div>
      <h2>비밀번호 입력</h2>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step7Password;
