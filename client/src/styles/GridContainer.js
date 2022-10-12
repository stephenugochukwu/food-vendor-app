import styled, { css } from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 2rem;
  margin: auto;

  ${(props) =>
    props.vendor &&
    css`
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 2rem;
    `}
`;
