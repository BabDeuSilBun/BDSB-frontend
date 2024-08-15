import { useSignUpStore } from '@/state/authStore';

const Step6Password = () => {
  const { password, setPassword, setStep } = useSignUpStore();

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 (8자 이상, 영문 + 숫자)"
        style={{ 'marginBottom': '1rem' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
    </div>
  );
};

export default Step6Password;
