import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { OrderItem } from "../../components";
import { MenuBar } from "../../components/UI/MenuBar/styles";
import { getOrders } from "../../store/Orders";
import Colors from "../../constants/Colors";
import { CenteredView } from "../EditProductScreen/styles";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(getOrders(userId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setError, setIsLoading]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (error) {
    return (
      <CenteredView>
        <Text>An error ocurred!</Text>
        <Button title="Try Again" onPress={loadOrders} color={Colors.primary} />
      </CenteredView>
    );
  }

  if (isLoading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color={Colors.primary} />
      </CenteredView>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <CenteredView>
        <Text>No orders found. Maybe try adding some!</Text>
      </CenteredView>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.date}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
        <MenuBar />
        <MenuBar />
        <MenuBar />
      </TouchableOpacity>
    ),
  };
};

export default OrdersScreen;
