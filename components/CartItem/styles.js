import styled from "styled-components/native";

export const ItemContainer = styled.View`
  padding: 10px;
  background-color: white;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px;
`;

export const ItemData = styled.View`
  flex-direction: row;
  align-items: center;

`;

export const Quantity = styled.Text`
    font-family: 'open-sans';
    color: #888;
    font-size: 16px;
`;

export const MainText = styled.Text`
    font-family: 'open-sans-bold';
    font-size: 16px;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-left: 20px;
`;
