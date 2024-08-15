import { useSignUpStore } from '@/state/authStore';

const Step2Phone = () => {
  const { phone, setPhone, setStep } = useSignUpStore();

  return (
    <div>
      <h2>휴대 전화번호 입력</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step2Phone;
