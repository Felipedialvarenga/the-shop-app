import React from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CartItem } from "../../components/CartItem";
import Colors from "../../constants/Colors";
import { Amount, Screen, Summary, SummaryText } from "./styles";

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const arrCartItems = [];
    for (const key in state.cart.items) {
      arrCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return arrCartItems;
  });

  return (
    <Screen>
      <Summary>
        <SummaryText>
          Total: <Amount>${cartTotalAmount.toFixed(2)}</Amount>
        </SummaryText>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={!!!cartItems.length}
        />
      </Summary>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {}}
          />
        )}
      />
    </Screen>
  );
};

export default CartScreen;
