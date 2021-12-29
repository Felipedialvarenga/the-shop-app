import React, { useReducer, useCallback } from "react";
import { Button, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { FormInput } from "../../components";
import Colors from "../../constants/Colors";
import { AuthContainer, ButtonContainer, Screen } from "./styles";
import { signup } from "../../store/Auth";
import { formReducer, FORM_UPDATE } from "../../utils";

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const signupHandler = () => {
    dispatch(
      signup({
        email: formState.inputValues.email,
        password: formState.inputValues.password,
      })
    );
  };

  const inputChangeHandler = useCallback(
    (input, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input,
      });
    },
    [dispatchFormState]
  );

  return (
    <Screen>
      <AuthContainer>
        <ScrollView>
          <FormInput
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <FormInput
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <ButtonContainer>
            <Button
              title="login"
              color={Colors.primary}
              onPress={signupHandler}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title="Switch to Sign Up"
              color={Colors.accent}
              onPress={() => {}}
            />
          </ButtonContainer>
        </ScrollView>
      </AuthContainer>
    </Screen>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

export default AuthScreen;
