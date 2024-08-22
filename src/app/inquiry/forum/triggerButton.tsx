import styled from 'styled-components';
import { formatDateTime } from '@/utils/formateDateTime';

const TriggerButtonContainer = styled.div<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
  padding: 1rem;
  width: 100%;
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'var(--gray100)' : 'transparent'};
  border: none;
  cursor: pointer;
`;

const State = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font-size-xs);

  span {
    color: var(--caption);
  }
`;

const StateButton = styled.div<{ $finished?: boolean }>`
  border-radius: 1rem;
  padding: 0.25rem 0.6rem;
  color: ${({ $finished }) =>
    $finished ? 'var(--gray300)' : 'var(--warning)'};
  border: ${({ $finished }) =>
    $finished ? '1px solid var(--gray300)' : '1px solid var(--warning)'};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;

  p {
    padding-right: 1rem;
  }
`;

const ToggleBtn = styled.button.attrs({
  className: 'icon',
})<{ $isOpen?: boolean }>`
  word-spacing: 3px;
  padding: 1rem;
  margin: -1rem;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(270deg)' : 'rotate(90deg)')};
  border: none;
  background: transparent;
`;

const TriggerButton = ({
  inquiry,
  onClick,
  isSelected,
}: {
  inquiry: any;
  onClick: () => void;
  isSelected: boolean;
}) => {
  const { formattedFullDate: formattedCreatedDate } = formatDateTime(
    inquiry.createdAt,
  );

  return (
    <TriggerButtonContainer
      $isSelected={isSelected}
      onClick={onClick}
      aria-expanded={isSelected}
      aria-controls={`inquiry-content-${inquiry.inquiryId}`}
      aria-label={`Inquiry ${inquiry.title}`}
    >
      <State>
        <StateButton $finished={inquiry.status === 'COMPLETED'}>
          {inquiry.status === 'PENDING' ? '접수' : '완료'}
        </StateButton>
        <span>{formattedCreatedDate}</span>
      </State>
      <Title>
        <p>{inquiry.title}</p>
        <ToggleBtn $isOpen={isSelected}>{'>'}</ToggleBtn>
      </Title>
    </TriggerButtonContainer>
  );
};

export default TriggerButton;
