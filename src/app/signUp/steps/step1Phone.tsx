import { useSignUpStore } from '@/state/authStore';

const Step1Phone = () => {
  const { phone, setPhone, setStep } = useSignUpStore();

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder='휴대 전화번호'
      />
    </div>
  );
};

export default Step1Phone;
