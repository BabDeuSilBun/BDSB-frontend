import { useSignUpStore } from '@/state/authStore';

const Step5Department = () => {
  const { department, setDepartment, setStep } = useSignUpStore();

  return (
    <div>
      <h2>이름 입력</h2>
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
};

export default Step5Department;
