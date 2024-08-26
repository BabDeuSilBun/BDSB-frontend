import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const DrawerBody = styled.div`
  padding: 7.5rem 1rem;
  display: flex;
  flex-direction: column;
  font-size: var(--font-size-xl);
  font-weight: var(--font-semi-bold);
  gap: 20px;
`;

const DrawerFooter = styled.div`
  position: absolute;
  bottom: 40px;
  left: 1rem;
  gap: 10px;
  display: flex;
  align-items: center;
  font-size: var(--font-size-xl);
  font-weight: var(--font-semi-bold);
`;

const FlexLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 아이콘과 텍스트 사이의 간격을 조정 */
`;

interface Props {
  $isOpen: boolean;
  onToggle: () => void;
}

export default function HeaderDrawer({ onToggle, $isOpen }: Props) {
  return (
    <Drawer isOpen={$isOpen} placement="left" onClose={onToggle} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Link href="/notifications">
            <FlexLink>
              <Image
                src="/notification.svg"
                alt="notification icon"
                width="32"
                height="32"
                priority
              />
              <span>알림</span>
            </FlexLink>
          </Link>
          <Link href="/orderHistory">
            <FlexLink>
              <Image
                src="/history.svg"
                alt="order history icon"
                width="32"
                height="32"
                priority
              />
              <span>주문내역</span>
            </FlexLink>
          </Link>
          <Link href="/myPage">
            <FlexLink>
              <Image
                src="/user.svg"
                alt="user page icon"
                width="32"
                height="32"
                priority
              />
              <span>마이페이지</span>
            </FlexLink>
          </Link>
          <Link href="/deliveryStatus">
            <FlexLink>
              <Image
                src="/delivery.svg"
                alt="delivery page icon"
                width="32"
                height="32"
                priority
              />
              <span>배달현황</span>
            </FlexLink>
          </Link>
        </DrawerBody>
        <DrawerFooter>
          <Image src="/logo.svg" alt="logo" width="32" height="32" priority />
          <h4>밥드실분</h4>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
