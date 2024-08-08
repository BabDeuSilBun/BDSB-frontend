'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import HamburgerIcon from '../svg/hamburger';
import BackIcon from '../svg/arrowLeft';
import HomeIcon from '../svg/home';
import ExitIcon from '../svg/exit';

const Icons = {
  hamburger: <HamburgerIcon color="var(--gray500)" width={18} height={18} />,
  back: <BackIcon color="var(--gray500)" width={18} height={18} />,
  home: <HomeIcon color="var(--gray500)" width={18} height={18} />,
  exit: <ExitIcon color="var(--gray500)" width={18} height={18} />,
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: var(--background);
  align-items: center;
  position: fixed;
  z-index: 1000;
  height: 48px;
  width: inherit;
  box-sizing: border-box;
  box-shadow: 1.48px 1.48px 7px var(--shadow);
  padding: 1.5rem;
`;

interface HeaderProps {
  buttonLeft?: 'hamburger' | 'back' | undefined;
  buttonRight?: 'home' | 'exit' | undefined;
  text?: string;
  onExit?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  buttonLeft,
  text,
  buttonRight,
  onExit,
}) => {
  const router = useRouter();

  const handleLeftButtonClick = () => {
    if (buttonLeft === 'hamburger') {
      console.log('Hamburger button clicked');
    } else if (buttonLeft === 'back') {
      router.back();
    }
  };

  const handleRightButtonClick = () => {
    if (buttonRight === 'home') {
      router.push('/');
    } else if (buttonRight === 'exit' && onExit) {
      onExit();
    }
  };

  return (
    <HeaderContainer>
      <button onClick={handleLeftButtonClick}>
        {buttonLeft && Icons[buttonLeft]}
      </button>
      <h1>{text}</h1>
      <button onClick={handleRightButtonClick}>
        {buttonRight && Icons[buttonRight]}
      </button>
    </HeaderContainer>
  );
};

export default Header;
