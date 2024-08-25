import InquiryMethod from './method';

import Header from '@/components/layout/header';

const Inquiry = () => {
  return (
    <>
      <Header text="문의 게시판" buttonLeft="back" />
      <InquiryMethod />
    </>
  );
};

export default Inquiry;
