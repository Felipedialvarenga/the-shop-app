import styled from "styled-components/native";

export const ProductContainer = styled.View`
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: "white";
  height: 300px;
  margin: 20px;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 60%;
`;

export const ProductTitle = styled.Text`
  font-size: 18px;
  margin: 0 4px;
`;

export const ProductPrice = styled.Text`
  font-size: 14px;
  color: #888;
`;

export const ProductActions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
