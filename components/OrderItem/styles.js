import styled from "styled-components/native";
import { Card } from "../UI/Card/styles";

export const ItemContainer = styled(Card)`
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
