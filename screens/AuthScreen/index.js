import React, { useReducer, useCallback, useState, useEffect } from "react";
import { Button, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { FormInput } from "../../components";
import Colors from "../../constants/Colors";
import { AuthContainer, ButtonContainer, Screen } from "./styles";
import { signup, login } from "../../store/Auth";
import { formReducer, FORM_UPDATE } from "../../utils";
import { authenticate } from "../../store/Auth";

const AuthScreen = (props) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    let result;
    if (isSignup) {
      result = await dispatch(
        signup({
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        })
      );
    } else {
      result = await dispatch(
        login({
          email: formState.inputValues.email,
          password: formState.inputValues.password,
        })
      );
    }

    if (result.error) {
      setError(result.error.message);
      setIsLoading(false);
    } else {
      props.navigation.navigate("Shop");
    }
  });

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
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </ButtonContainer>
          <ButtonContainer>
            <Button
              title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
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
