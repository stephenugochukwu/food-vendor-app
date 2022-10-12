import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  border-bottom: 1px solid #4d4d4d;

  & input {
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 1.2rem;
    width: 400px;
  }

  button,
  input[type="submit"],
  input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }

  .search {
    background-color: #e6e6e6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #643c25;
    width: 450px;
  }

  .link {
    text-decoration: none;
    color: inherit;
  }

  .user-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .user-actions button {
    background-color: #f9975d;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }

  .user-actions button:hover {
    opacity: 0.8;
  }
  .user-actions button:active {
    opacity: 0.6;
  }

  .logo {
    font-size: 1.5rem;
    font-family: "Playfair Display", serif;
  }

  .greeting {
    margin: 0;
  }
`;
