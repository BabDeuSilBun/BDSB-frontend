'use client';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Header from '@/components/layout/header';
import Container from '@/styles/container';

import InquiryContact from './contact';
import InquiryHistory from './history';

const InquiryForum = () => {
  return (
    <>
      <Header buttonLeft="back" text="게시판 문의" />
      <Container>
        <Tabs align="center" isFitted aria-label="문의 내역, 문의 하기">
          <TabList>
            <Tab role="tab">문의하기</Tab>
            <Tab role="tab">문의 내역 확인</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <InquiryContact />
            </TabPanel>
            <TabPanel>
              <InquiryHistory />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default InquiryForum;
