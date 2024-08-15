import { useSignUpStore } from '@/state/authStore';
import Step1Name from './steps/step1Name';
import Step2Phone from './steps/step2Phone';
import Step3Email from './steps/step3Email';
import Step4Campus from './steps/step4Campus';
import Step5Department from './steps/step5Department';
import Step6Address from './steps/step6Address';
import Step7Password from './steps/step7Password';

const steps = [
  Step1Name,
  Step2Phone,
  Step3Email,
  Step4Campus,
  Step5Department,
  Step6Address,
  Step7Password,
];

const SignUpForm = () => {
  const { currentStep } = useSignUpStore();
  const CurrentStepComponent = steps[currentStep - 1];

  return <CurrentStepComponent />;
};

export default SignUpForm;
