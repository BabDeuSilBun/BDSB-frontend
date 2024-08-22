import Header from '@/components/layout/header';

import InquiryMethod from './method';

const Inquiry = () => {
  return (
    <>
      <Header text="문의 게시판" buttonLeft="back" />
      <InquiryMethod />
    </>
  );
};

export default Inquiry;
