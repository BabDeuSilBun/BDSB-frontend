import { useState } from 'react';

import styled from 'styled-components';

// 미디어 쿼리 설정
const mediaQueries = {
  tablet: `@media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
};

// 기본 버튼 스타일
const BaseButton = styled.button`
  width: 100%;
  padding: 0.65rem;
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius-md);
  border: none;
  font-size: var(--font-size-md);
  font-weight: var(--font-semi-bold);
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: var(--purple500);
  }

  &:active {
    background-color: var(--purple400);
    transform: scale(0.98);
  }

  ${mediaQueries.tablet} {
    max-width: 480px;
    font-size: var(--font-size-lg);
  }
  ${mediaQueries.desktop} {
    max-width: 640px;
    font-size: var(--font-size-lg);
  }
`;

// 비활성 버튼 스타일
const BaseButtonInactive = styled(BaseButton)`
  background-color: var(--gray300);
  color: white;

  &:hover {
    background-color: var(--gray400);
  }

  &:active {
    background-color: var(--gray500);
  }
`;

const BaseBtnLight = styled(BaseButton)`
  background-color: var(--purple100);
  color: var(--primary);

  &:hover {
    background-color: var(--purple200);
  }

  &:active {
    background-color: var(--purple100);
  }
`;

// 절반 크기 퍼플 버튼 스타일
const HalfButtonPurple = styled(BaseButton)`
  width: 136px;

  ${mediaQueries.tablet} {
    max-width: 240px;
    font-size: var(--font-size-lg);
  }
  ${mediaQueries.desktop} {
    max-width: 320px;
    font-size: var(--font-size-lg);
  }
`;

// 절반 크기 라이트 버튼 스타일
const HalfButtonLight = styled(HalfButtonPurple)`
  background-color: var(--purple100);
  color: var(--primary);

  &:hover {
    background-color: var(--purple200);
  }

  &:active {
    background-color: var(--purple300);
  }
`;

// 버튼 그룹 스타일
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 281px;

  button {
    flex: 1;
  }

  ${mediaQueries.tablet} {
    max-width: 480px;
  }
  ${mediaQueries.desktop} {
    max-width: 640px;
  }
`;

// 라운드 버튼 스타일
const RoundButtonFilled = styled(BaseButton)`
  min-width: 106px;
  width: fit-content;
  height: 34px;
  border-radius: 21px;
  padding: 0.3rem 1rem;
  background-color: var(--purple100);
  color: var(--text);
  font-size: var(--font-size-sm);

  &:hover {
    background-color: var(--purple200);
  }

  &:active {
    background-color: var(--purple300);
  }

  ${mediaQueries.tablet} {
    max-width: 160px;
    font-size: var(--font-size-md);
  }
  ${mediaQueries.desktop} {
    max-width: 214px;
    font-size: var(--font-size-md);
  }
`;

// 작은 라운드 버튼 스타일
const SmallRoundButton = styled.button<{ isActive: boolean }>`
  width: 45px;
  height: 27px;
  border-radius: 15px;
  padding: 0.03rem 0.2rem;
  font-size: var(--font-size-sm);
  cursor: pointer;
  border: 1px solid var(--gray300);
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary)' : 'transparent'};
  color: ${({ isActive }) => (isActive ? 'white' : 'var(--gray300)')};
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary)' : 'var(--gray200)'};
  }

  &:active {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary)' : 'var(--gray100)'};
    transform: scale(0.98);
  }

  &:focus {
    border: ${({ isActive }) =>
      isActive ? 'none' : '1px solid var(--gray300)'};
  }

  ${mediaQueries.tablet} {
    max-width: 60px;
    font-size: var(--font-size-md);
  }
  ${mediaQueries.desktop} {
    max-width: 75px;
    font-size: var(--font-size-md);
  }
`;

// 버튼 컴포넌트들 정의
const BaseBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BaseButton onClick={onClick} {...props}>
      {children}
    </BaseButton>
  );
};

const BaseBtnInactive: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <BaseButtonInactive {...props}>{children}</BaseButtonInactive>;
};

const HalfBtnPurple: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HalfButtonPurple onClick={onClick} {...props}>
      {children}
    </HalfButtonPurple>
  );
};

const HalfBtnLight: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <HalfButtonLight onClick={onClick} {...props}>
      {children}
    </HalfButtonLight>
  );
};

const BtnGroup: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};

const RoundBtnFilled: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, onClick, ...props }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <RoundButtonFilled onClick={onClick} {...props}>
      {children}
    </RoundButtonFilled>
  );
};

interface SmallRdBtnProps {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode; // children 속성을 명시적으로 추가
}

const SmallRdBtn: React.FC<SmallRdBtnProps> = ({
  children,
  onClick,
  active = false,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <SmallRoundButton isActive={active} onClick={handleClick} {...props}>
      {children}
    </SmallRoundButton>
  );
};

export {
  BaseBtn,
  BaseBtnInactive,
  BaseBtnLight,
  HalfBtnPurple,
  HalfBtnLight,
  BtnGroup,
  RoundBtnFilled,
  SmallRdBtn,
};
