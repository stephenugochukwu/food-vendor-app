import styled from "styled-components";

export const OrderListStyle = styled.div`
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0 5rem;
  gap: 2rem;

  span {
    color: var(--primary-color);
  }

  .ticket {
    border: 1px solid blue;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;
