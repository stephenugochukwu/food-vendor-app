import styled from "styled-components";

export const CommentStyle = styled.div`
  width: 50%;
  margin: auto;
  justify-content: center;

  & > .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0.5rem;
    border: 1px solid #c85c5c;
    border-radius: 5px;

    & > p {
      padding-left: 0.5rem;
    }
  }
`;
