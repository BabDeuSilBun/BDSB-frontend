import { useSignUpStore } from '@/state/authStore';

const Step0Name = () => {
  const { name, setName, setStep } = useSignUpStore();

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
    </div>
  );
};

export default Step0Name;
