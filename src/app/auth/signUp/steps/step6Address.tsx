import { useSignUpStore } from '@/state/authStore';

const Step6Address = () => {
  const { address, setAddress, setStep } = useSignUpStore();

  return (
    <div>
      <h2>배송지 입력</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step6Address;
