import styled from "styled-components";

export const VendorStyle = styled.div`
    width: 50%;
    margin: auto;
    justify-content: center;

    & > .wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0.5rem;
        border: 1px solid #c85c5c;
        border-radius: 5px;


        & > .name {
            text-transform: uppercase;
            align-items: center;
            margin-left: 0.5rem;
        }

        & > .btn button {
            width: 100px;
            height: 40px;
            margin: 0.5rem;
            border-radius: 0.5rem;
        }

        & > .btn .verify{
            background-color: #b2ea70;
        }

        & > .btn .remove{
            background-color: #c85c5c;
        }

        & > .btn button:hover {
            cursor: pointer;
            
        }
      }

`