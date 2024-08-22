import { accountRules } from '@/constant/bankInfo';

interface Props {
  codes: string[];
  accountNumber: string;
}

export function validateBankAccount({ codes, accountNumber }: Props) {
  const isValid = codes.some((code) => {
    const rule = accountRules[code]?.[accountNumber.length.toString()];
    return rule ? rule.test(accountNumber) : false;
  });

  return isValid;
}
