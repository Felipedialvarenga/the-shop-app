import styled from "styled-components/native";
import { Card } from "../../components";
import Colors from "../../constants/Colors";

export const Screen = styled.View`
  margin: 20px;
`;

export const Summary = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
`;

export const SummaryText = styled.Text`
  font-family: "open-sans-bold";
  font-size: 18px;
`;

export const Amount = styled.Text`
  color: ${Colors.primary};
`;
