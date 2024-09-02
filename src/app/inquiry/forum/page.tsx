'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import InquiryContact from './contact';
import InquiryHistory from './history';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { apiClientWithCredentials } from '@/services/apiClient';
import Container from '@/styles/container';

const InquiryForum = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type');

  const [pageType, setPageType] = useState<'contact' | 'history'>(
    initialType === 'history' ? 'history' : 'contact',
  );
  const [isButtonActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (pageType) {
      router.replace(`/inquiry/forum/?type=${pageType}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType]);

  const onClickSubmitBtn = async () => {
    if (!formData) return;

    try {
      const config = formData.has('image1')
        ? {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        : {};

      await apiClientWithCredentials.post(
        `/api/users/inquires`,
        formData,
        config,
      );
      console.log(formData);
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
          w="100%"
          isFitted
          aria-label="문의 내역 및 문의 하기"
          aria-labelledby="inquiry-tabs"
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
