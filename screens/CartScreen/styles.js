import styled from "styled-components/native";
import Colors from "../../constants/Colors";

export const Screen = styled.View`
  margin: 20px;
`;

export const Summary = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: "white";
`;

export const SummaryText = styled.Text`
  font-family: "open-sans-bold";
  font-size: 18px;
`;

export const Amount = styled.Text`
  color: ${Colors.primary};
`;
