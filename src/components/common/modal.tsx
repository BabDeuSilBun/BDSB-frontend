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
  buttonText?: string;
  buttonText1?: string;
  buttonText2?: string;
  onButtonClick1?: () => void;
  onButtonClick2?: () => void;
  onButtonClick3?: () => void;
}

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
`;

const Image = styled.img`
  width: 90%;
  max-width: 18rem; /* 288px in 360px mobile screen */
  height: auto;
  border-radius: var(--border-radius-lg);
`;

const Title1 = styled.h2`
  margin-top: var(--spacing-md);
  font-size: var(--font-size-lg);
  font-family: 'SF Pro Display Semibold', sans-serif;
  color: var(--text);
`;

const Title2 = styled.h2`
  font-size: var(--font-size-lg);
  font-family: 'SF Pro Display Semibold', sans-serif;
  color: var(--text);
`;

const Description = styled.p`
  font-size: var(--font-size-sm);
  color: var(--text);
  margin-top: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: var(--spacing-lg);
  border-collapse: collapse;
  table-layout: fixed;
  th,
  td {
    font-size: var(--font-size-sm);
    color: var(--text);
    padding: var(--spacing-xs);
    text-align: left;
    vertical-align: top;
  }
  th {
    width: 40%;
    padding-left: 0;
    font-family: 'SF Pro Display Semibold', sans-serif;
  }
  td {
    word-wrap: break-word;
    padding-right: 0;
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
              <td>
                {address1}
                {address2}
              </td>
            </tr>
            <tr>
              <th>운영시간</th>
              <td>{openTime}</td>
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
