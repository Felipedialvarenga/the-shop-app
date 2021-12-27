import styled from "styled-components/native";

export const FormControl = styled.View`
  width: 100%;
`;

export const Label = styled.Text`
  font-family: "open-sans-bold";
  margin: 8px 0;
`;

export const Input = styled.TextInput`
  padding: 5px 2px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

export const ErrorContainer = styled.View`
  margin: 5px 0;
`;

export const ErrorText = styled.Text`
  font-family: "open-sans";
  color: red;
  font-size: 14px;
`;
