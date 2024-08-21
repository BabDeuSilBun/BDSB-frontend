'use client';

import styled from 'styled-components';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';

const AccordionTrigger = styled(AccordionButton)`
  display: flex;
  flex-direction: column;
  align-items: start !important;
  gap: 0.5rem;
`;

const State = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font-size-xs);

  span {
    color: var(--caption);
  }
`;

const StateButton = styled.button<{ finished?: boolean }>`
  border-radius: 1rem;
  padding: 0.25rem 0.6rem;
  color: ${({ finished }) => (finished ? 'var(--gray300)' : 'var(--warning)')};
  border: ${({ finished }) =>
    finished ? '1px solid var(--gray300)' : '1px solid var(--warning)'};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InquiryHistory = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>
          <State>
            <StateButton>접수</StateButton>
            <span>2024.08.01</span>
          </State>
          <Title>
            <p>문의내용문의내용문의내용문의내용</p>
            <AccordionIcon />
          </Title>
        </AccordionTrigger>
        <AccordionPanel pb={4} textAlign="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton>
            Section 1 title
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default InquiryHistory;
