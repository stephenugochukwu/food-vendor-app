import styled from "styled-components";

export const FormStyle = styled.div`
  background-color: #fbc19e;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & > form > div > input {
    -webkit-appearance: none;
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 1rem 2rem;
    margin-bottom: 1rem;
    width: 400px;
    background: transparent;
    border-bottom: 2px solid #333333;
  }

  & .action-btn {
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 1rem;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    cursor: pointer;
  }

  & .action-btn:hover {
    opacity: 0.8;
  }

  & .action-btn:active {
    opacity: 0.6;
  }

  & .error {
    color: red;
    margin: 0;
    padding: 0;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  & .link {
    color: var(--primary-color);
  }
`;
