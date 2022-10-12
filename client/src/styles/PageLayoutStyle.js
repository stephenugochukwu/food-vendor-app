import styled from "styled-components";

export const PageLayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100vh;
  justify-content: center;

  .footer {
    margin-top: auto;
  }

  .vendor-list-container {
    border: 1px solid black;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin: 0 10rem;
  }

  .vendor-list-container h2 {
    text-align: center;
    grid-column: 1 / span 2;
  }
`;
