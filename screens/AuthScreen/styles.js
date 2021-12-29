import styled from "styled-components/native";
import { Card } from "../../components";

export const Screen = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #ffe3ed;
`;

export const AuthContainer = styled(Card)`
  width: 80%;
  max-width: 400px;
  max-height: 400px;
  padding: 20px;
`;

export const ButtonContainer = styled.View`
  margin-top: 15px;
`;
