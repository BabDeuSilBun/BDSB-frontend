import styled from 'styled-components';

const ErrorText = styled.div`
  color: red;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-xs);
`;

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <ErrorText>{message}</ErrorText>;
};

export default ErrorMessage;
