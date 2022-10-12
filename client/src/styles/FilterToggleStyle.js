import styled from "styled-components";

export const FilterToggleStyle = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;

  & > p {
    padding: 1rem;
    cursor: pointer;
    user-select: none;
  }

  & > p:hover {
    padding: 1rem;
    cursor: pointer;
  }

  & .active {
    border-bottom: 2px solid #c85c5c;
  }
`;
