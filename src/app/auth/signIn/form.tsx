'use client';

import { BaseBtn, BaseBtnLight } from '@/styles/button';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 0.65rem !important;
  }

  button {
    margin-top: 2rem;
  }
`;

const Container = styled.section`
  margin-top: 0.4rem;
  text-align: center;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SignInForm() {
  const handleBtnClick = () => {};
  return (
    <Container>
      <Form action="" method="post">
        <input type="text" name="" id="" placeholder="이메일" />
        <input type="password" name="" id="" placeholder="비밀번호" />
        <BaseBtn onClick={handleBtnClick}>로그인</BaseBtn>
      </Form>
      <BaseBtnLight onClick={handleBtnClick}>회원가입</BaseBtnLight>
    </Container>
  );
}
