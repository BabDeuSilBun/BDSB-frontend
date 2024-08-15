import { useSignUpStore } from '@/state/authStore';

const Step4Department = () => {
  const { department, setDepartment, setStep } = useSignUpStore();

  return (
    <div>
      <input
        type="text"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        placeholder='학과 선택'
      />
    </div>
  );
};

export default Step4Department;
