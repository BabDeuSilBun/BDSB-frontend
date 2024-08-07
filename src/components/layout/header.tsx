'use client';

import styled from 'styled-components';

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
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>header 내용</h1>
    </HeaderContainer>
  );
};

export default Header;
