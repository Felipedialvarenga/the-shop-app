import styled from "styled-components/native";

export const ItemContainer = styled.View`
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: white;
  padding: 10px;
  margin: 20px;
  align-items: center;
`;

export const Summary = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 5px;
`;

export const TotalAmount = styled.Text`
  font-family: "open-sans-bold";
  font-size: 16px;
`;

export const OrderDate = styled.Text`
  font-size: 14px;
  font-family: "open-sans";
  color: #888;
`;

export const DetailsItems = styled.View`
  width: 100%;
`;
