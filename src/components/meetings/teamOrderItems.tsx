import styled from 'styled-components';
import { Divider } from '@chakra-ui/react';
import { formatCurrency } from '@/utils/currencyFormatter';
import { TeamMenusResponse, TeamMenuType } from '@/types/coreTypes';
import { ItemType } from '@/types/types';

const MenuTypeTitle = styled.h2`
  color: var(--primary);
  font-size: var(--font-size-lg); /* 20px */
  font-weight: var(--font-semi-bold);
  text-align: left;
  width: 95%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const MenuItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-xs) var(--spacing-md);
  background-color: var(--background);
`;

const MenuItemName = styled.div`
  font-size: var(--font-size-md); /* 16px */
  color: var(--text);
  font-weight: var(--font-semi-bold);
  text-align: left;
`;

const MenuItemPrice = styled.div`
  font-size: var(--font-size-md); /* 16px */
  color: var(--text);
  font-weight: var(--font-regular);
  text-align: right;
`;

interface TeamOrderItemsProps {
  teamMenus: {
    pages: TeamMenusResponse[];
  };
}

const TeamOrderItems: React.FC<TeamOrderItemsProps> = ({ teamMenus }) => (
  <>
    <Divider
      orientation="horizontal"
      sx={{
        borderWidth: '3px',
        borderColor: 'var(--gray100)',
      }}
    />
    <MenuTypeTitle>공통 메뉴</MenuTypeTitle>
    <MenuContainer>
      {teamMenus?.pages.map((page) =>
        page.content.flatMap((teamMenu: TeamMenuType) =>
          teamMenu.items.map((item: ItemType) => (
            <MenuItemRow key={`${teamMenu.teamPurchaseId}-${item.menuId}`}>
              <MenuItemName>{item.name}</MenuItemName>
              <MenuItemPrice>{formatCurrency(item.price)}</MenuItemPrice>
            </MenuItemRow>
          )),
        ),
      )}
    </MenuContainer>
  </>
);

export default TeamOrderItems;
