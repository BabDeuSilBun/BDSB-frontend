import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const BankAccount = () => {
  return (
    <>
      <Header buttonLeft="back" text="환불 계좌 변경" />
      <Footer type="button" buttonText="변경하기" />
    </>
  );
};

export default BankAccount;
