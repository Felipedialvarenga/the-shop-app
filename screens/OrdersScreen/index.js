import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { OrderItem } from "../../components";
import { MenuBar } from "../../components/UI/MenuBar/styles";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

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
