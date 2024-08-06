import styled, { css } from 'styled-components';

const mediaQueries = {
  mobile: `@media (max-width: var(--breakpoint-mobile-max))`,
  tablet: `@media (min-width: var(--breakpoint-tablet-min)) and (max-width: var(--breakpoint-tablet-max))`,
  desktop: `@media (min-width: var(--breakpoint-desktop))`,
};

const BaseButton = styled.button`
  width: 328px;
  height: 44px;
  background-color: var(--primary);
  color: white;
  border-radius: var(--border-radius-md);
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--purple400);
  }
  &:active {
    background-color: var(--purple500);
    transform: scale(0.98);
  }
  &:focus {
    box-shadow:
      0 0 1px 2px var(--primary),
      0 1px 1px rgba(0, 0, 0, 0.15);
    outline: none;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 80%;
  }
  ${mediaQueries.desktop} {
    width: 328px;
  }
`;

const BaseBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return <BaseButton {...props}>{children}</BaseButton>;
};

const BaseButtonInactive = styled(BaseButton)`
  background-color: var(--gray300);
  color: white;
  &:hover {
    background-color: var(--gray400);
  }
  &:active {
    background-color: var(--gray500);
    transform: scale(0.98);
  }
  &:focus {
    box-shadow:
      0 0 1px 2px var(--gray300),
      0 1px 1px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

const BaseBtnInactive: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return <BaseButtonInactive {...props}>{children}</BaseButtonInactive>;
};

const HalfButtonPurple = styled(BaseButton)`
  width: 136px;
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 136px;
  }
`;

const HalfBtnPurple: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return <HalfButtonPurple {...props}>{children}</HalfButtonPurple>;
};

const HalfButtonLight = styled(BaseButton)`
  width: 136px;
  background-color: var(--purple100);
  color: var(--primary);
  &:hover {
    background-color: var(--purple200);
  }
  &:active {
    background-color: var(--purple300);
    transform: scale(0.98);
  }
  &:focus {
    box-shadow:
      0 0 1px 2px var(--primary),
      0 1px 1px rgba(0, 0, 0, 0.15);
    outline: none;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 136px;
  }
`;

const HalfBtnLight: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return <HalfButtonLight {...props}>{children}</HalfButtonLight>;
};

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 328px;
  button {
    flex: 1;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 80%;
  }
  ${mediaQueries.desktop} {
    width: 328px;
  }
`;

const BtnGroup: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <ButtonGroup>{children}</ButtonGroup>;
};

const RoundButtonFilled = styled.button`
  width: 106px;
  height: 34px;
  background-color: var(--purple100);
  color: var(--text);
  border-radius: 21px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: var(--purple200);
  }
  &:active {
    background-color: var(--purple300);
    transform: scale(0.98);
  }
  &:focus {
    box-shadow:
      0 0 1px 2px var(--primary),
      0 1px 1px rgba(0, 0, 0, 0.15);
    outline: none;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 106px;
  }
`;

const RoundBtnFilled: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return <RoundButtonFilled {...props}>{children}</RoundButtonFilled>;
};

const SmallRoundStroke = styled.button`
  width: 45px;
  height: 27px;
  background-color: transparent;
  color: var(--gray300);
  border-radius: 15px;
  border: 1px solid var(--gray300);
  cursor: pointer;
  &:hover {
    background-color: var(--gray200);
  }
  &:active {
    background-color: var(--gray100);
    transform: scale(0.98);
  }
  &:focus {
    box-shadow:
      0 0 1px 2px var(--primary),
      0 1px 1px rgba(0, 0, 0, 0.15);
    outline: none;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 45px;
  }
`;

const SmallRdStroke: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return <SmallRoundStroke {...props}>{children}</SmallRoundStroke>;
};

const SmallRoundFilled = styled.button`
  width: 45px;
  height: 27px;
  background-color: var(--primary);
  color: white;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: var(--purple400);
  }
  &:active {
    background-color: var(--purple500);
    transform: scale(0.98);
  }
  &:focus {
    box-shadow:
      0 0 1px 2px var(--primary),
      0 1px 1px rgba(0, 0, 0, 0.15);
    outline: none;
  }
  ${mediaQueries.mobile} {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    width: 50%;
  }
  ${mediaQueries.desktop} {
    width: 45px;
  }
`;

const SmallRdFilled: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => {
  return <SmallRoundFilled {...props}>{children}</SmallRoundFilled>;
};

export {
  BaseBtn,
  BaseBtnInactive,
  HalfBtnPurple,
  HalfBtnLight,
  BtnGroup,
  RoundBtnFilled,
  SmallRdStroke,
  SmallRdFilled,
};
