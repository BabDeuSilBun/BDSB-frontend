'use client';

import styled from 'styled-components';

const MenuButton = styled.button<{ $isOpen: boolean }>`
  margin: -4px;
  padding: 4px;
  display: flex;
  height: 24px;
  width: 24px;
  position: absolute;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2000;

  span {
    width: 18px;
    background-color: var(--gray500);
    height: 2px;
    border-radius: 20px;
    transition:
      transform 0.3s ease-out,
      opacity 0.3s ease-out,
      scaleX 0.3s ease-out;
  }

  ${(props) =>
    props.$isOpen &&
    `
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px) scaleX(1.2);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px) scaleX(1.2);
      }
    `}
`;

interface Props {
  $isOpen: boolean;
  onToggle: () => void;
}

const HamburgerBtn = ({ onToggle, $isOpen }: Props) => {
  return (
    <MenuButton onClick={onToggle} $isOpen={$isOpen}>
      <span />
      <span />
      <span />
    </MenuButton>
  );
};

export default HamburgerBtn;
