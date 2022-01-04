import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CenteredView } from "../ProductsOverviewScreen/styles";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/Auth";
import Colors from "../../constants/Colors";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      dispatch(authenticate({ token, userId, expirationTime }));
      props.navigation.navigate("Shop");
    };

    tryLogin();
  }, [dispatch]);

  return (
    <CenteredView>
      <ActivityIndicator size="large" color={Colors.primary} />
    </CenteredView>
  );
};

export default StartupScreen;
