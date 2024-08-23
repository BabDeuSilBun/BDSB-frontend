'use client';

import { useState, useEffect } from 'react';
import { Tab, TabList, Tabs, TabPanel, TabPanels } from '@chakra-ui/react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Container from '@/styles/container';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import InquiryContact from './contact';
import InquiryHistory from './history';

const InquiryForum = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type');

  const [pageType, setPageType] = useState<'contact' | 'history'>(
    initialType === 'history' ? 'history' : 'contact',
  );
  const [isButtonActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null); // FormData 상태 추가

  useEffect(() => {
    if (pageType) {
      router.replace(`/inquiry/forum/?type=${pageType}`, { scroll: false });
    }
  }, [pageType, router]);

  const onClickSubmitBtn = async () => {
    if (!formData) return;

    try {
      await axios.post(`/api/users/inquires`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(formData)
      alert('문의가 접수되었습니다.');
      setPageType('history');
    } catch (error) {
      console.error('Error during inquiry submission:', error);
    }
  };

  return (
    <>
      <Header buttonLeft="back" text="게시판 문의" />
      <Container>
        <Tabs
          align="center"
          position="fixed"
          w="100%"
          isFitted
          aria-label="문의 내역, 문의 하기"
          bg="white"
          index={pageType === 'contact' ? 0 : 1}
          onChange={(index) => setPageType(index === 0 ? 'contact' : 'history')}
        >
          <TabList>
            <Tab role="tab">문의하기</Tab>
            <Tab role="tab">문의 내역 확인</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {pageType === 'contact' && (
                <>
                  <InquiryContact
                    setIsActive={setIsActive}
                    onFormDataChange={setFormData}
                  />
                  <Footer
                    type="button"
                    buttonText="문의하기"
                    onButtonClick={
                      isButtonActive ? onClickSubmitBtn : undefined
                    }
                    disabled={!isButtonActive}
                  />
                </>
              )}
            </TabPanel>
            <TabPanel>{pageType === 'history' && <InquiryHistory />}</TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default InquiryForum;
