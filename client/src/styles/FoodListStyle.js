import styled from "styled-components";

export const FoodListStyle = styled.div`
  display: relative;

  h3 {
    text-align: center;
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

  .container {
    display: flex;
    justify-content: center;
  }
  .actions {
    display: flex;
    justify-content: center;
  }

  .actions button {
    background-color: #fbd148;
    margin: 2rem 0;
    padding: 0.5rem 1rem;
    border-radius: 0.7rem;
    transition: ease-in-out 0.15s;
  }

  .actions button:hover {
    background-color: #b2ea70;
  }

  /* .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  } */

  /* .modal .modal-content {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  } */

  /* .close {
    cursor: pointer;
  } */
`;
