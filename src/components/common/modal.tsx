'use client';

import styled from 'styled-components';
import {
  BaseBtn,
  BtnGroup,
  HalfBtnLight,
  HalfBtnPurple,
} from '@/styles/button';

interface ModalProps {
  type: 'image' | 'text' | 'info';
  imageUrl?: string;
  title1?: string;
  title2?: string;
  description?: string;
  address1?: string;
  address2?: string;
  openTime?: string;
  closeTime?: string;
  closeDay?: string;
  buttonText?: string;
  buttonText1?: string;
  buttonText2?: string;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
  onButtonClick3?: () => void;
}

const mediaQueries = {
  tablet: `@media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
};

const ModalContainer = styled.div`
  width: 90%;
  max-width: 20.5rem; /* 328px in 360px mobile screen */
  background-color: var(--background);
  box-shadow: 0px 4px 8px var(--shadow);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  ${mediaQueries.tablet} {
    max-width: 25rem; /* Slightly larger modal for tablets */
  }
  ${mediaQueries.desktop} {
    max-width: 30rem; /* Larger modal for desktops */
  }
`;

const Image = styled.img`
  width: 90%;
  max-width: 18rem; /* 288px in 360px mobile screen */
  height: auto;
  border-radius: var(--border-radius-lg);
  @media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max)) {
    max-width: 22rem; /* Slightly larger image for tablets */
  }

  @media (min-width: var(--breakpoint-desktop)) {
    max-width: 26rem; /* Larger image for desktops */
  }
`;

const Title1 = styled.h2`
  margin-top: var(--spacing-md);
  font-size: var(--font-size-lg); /* 20px */
  font-weight: var(--font-semi-bold);
  color: var(--text);
  ${mediaQueries.tablet} {
    font-size: var(--font-size-xl); /* 22px */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-xxl); /* 24px */
  }
`;

const Title2 = styled(Title1)`
  margin-top: 0;
`;

const Description = styled.p`
  font-size: var(--font-size-sm); /* 14px */
  color: var(--text);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  ${mediaQueries.tablet} {
    font-size: var(--font-size-md); /* 16px */
  }
  ${mediaQueries.desktop} {
    font-size: var(--font-size-lg); /* 20px */
  }
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: var(--spacing-lg);
  border-collapse: collapse;
  table-layout: fixed;
  th,
  td {
    font-size: var(--font-size-sm); /* 14px */
    color: var(--text);
    padding: var(--spacing-xs);
    text-align: left;
    vertical-align: top;
  }
  th {
    width: 30%;
    padding-left: 0;
    font-weight: var(--font-semi-bold);
  }
  td {
    word-wrap: break-word;
    padding-right: 0;
  }
  ${mediaQueries.tablet} {
    th,
    td {
      font-size: var(--font-size-md); /* 16px */
    }
  }
  ${mediaQueries.desktop} {
    th,
    td {
      font-size: var(--font-size-lg); /* 20px */
    }
  }
`;

const Modal: React.FC<ModalProps> = ({
  type,
  imageUrl,
  title1,
  title2,
  description,
  address1,
  address2,
  openTime,
  closeTime,
  closeDay,
  buttonText,
  buttonText1,
  buttonText2,
  onButtonClick1,
  onButtonClick2,
  onButtonClick3,
}) => {
  return (
    <ModalContainer>
      {type === 'image' && imageUrl && <Image src={imageUrl} alt={title1} />}
      <Title1>{title1}</Title1>
      <Title2>{title2}</Title2>
      <Description>{description}</Description>
      {type === 'info' && (
        <Table>
          <tbody>
            <tr>
              <th>주소</th>
              <td>{`${address1} ${address2}`}</td>
            </tr>
            <tr>
              <th>운영시간</th>
              <td>
                {openTime} ~ {closeTime}
              </td>
            </tr>
            <tr>
              <th>영업일</th>
              <td>{closeDay}</td>
            </tr>
          </tbody>
        </Table>
      )}
      {type === 'text' || type === 'image' ? (
        <BtnGroup>
          <HalfBtnPurple onClick={onButtonClick1}>{buttonText1}</HalfBtnPurple>
          <HalfBtnLight onClick={onButtonClick2}>{buttonText2}</HalfBtnLight>
        </BtnGroup>
      ) : (
        <BaseBtn onClick={onButtonClick3} style={{ width: '17.625rem' }}>
          {buttonText}
        </BaseBtn> /* 282px in 360px mobile screen */
      )}
    </ModalContainer>
  );
};

export default Modal;
