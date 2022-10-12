import styled from "styled-components";

export const VendorMealCardStyle = styled.div`
  width: 350px;
  height: 300px;
  background-color: transparent;
  border-radius: 10px;
  border: 1px dashed #f9975d;
  padding: 1rem 2rem;
  transition: ease-in-out 0.15s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  :hover {
    box-shadow: -1px 1px 11px -1px rgba(249, 151, 93, 0.75);
    -webkit-box-shadow: -1px 1px 11px -1px rgba(249, 151, 93, 0.75);
    -moz-box-shadow: -1px 1px 11px -1px rgba(249, 151, 93, 0.75);
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
  h3 {
    margin: 0.3rem 0 0 0;
  }

  .meal-image {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
  }

  .description {
    text-align: center;
  }

  .actn {
    display: flex;
    gap: 2rem;
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.7rem;
    transition: ease-in-out 0.15s;
  }

  .edit-btn {
    background-color: #fbd148;
  }
  .cancel-btn {
    background-color: #c85c5c;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .mod-container {
    width: 350px;
    height: 150px;
    background-color: #fff;
    border-radius: 10px;
    padding: 1rem 2rem;
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .mod-container form {
    display: flex;
    gap: 20px;
  }

  form .submit {
    padding: 0.5rem 1rem;
    background-color: #c85c5c;
    border-radius: 6px;
  }

  form .submit:hover {
    opacity: 0.8;
  }

  form .cancel {
    padding: 0.5rem 1rem;
  }

  .cancel:hover {
    background-color: #c85c5c;
    border-radius: 6px;
    opacity: 0.8;
  }

  .cancel:active {
    opacity: 0.6;
  }
`;
