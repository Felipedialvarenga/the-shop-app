import styled from "styled-components/native";

export const ProductContainer = styled.View`
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  height: 300px;
  margin: 20px;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 60%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

export const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const ProductDetails = styled.View`
  align-items: center;
  height: 15%;
  padding: 10px;
`;

export const ProductTitle = styled.Text`
  font-family: "open-sans-bold";
  font-size: 18px;
  margin: 0 2px;
`;

export const ProductPrice = styled.Text`
  font-family: "open-sans";
  font-size: 14px;
  color: gray;
`;

export const ProductActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 25%;
  padding: 0 20px;
`;
