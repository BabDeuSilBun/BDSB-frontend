import styled from 'styled-components';

interface PaddingBoxProps {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  x?: boolean;
  y?: boolean;
}

const PaddingBox = styled.div<PaddingBoxProps>`
  padding: ${({ top, right, bottom, left, x, y }) => {
    // 개별 방향 설정
    const paddingTop = top ? '1rem' : '0';
    const paddingRight = right ? '1rem' : '0';
    const paddingBottom = bottom ? '1rem' : '0';
    const paddingLeft = left ? '1rem' : '0';

    // 축에 따른 설정
    const paddingX = x ? '1rem' : '0';
    const paddingY = y ? '1rem' : '0';

    if (top || right || bottom || left) {
      return `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`;
    } else if (x || y) {
      return `${paddingY} ${paddingX}`;
    } else {
      return '1rem';
    }
  }};
`;

export default PaddingBox;
