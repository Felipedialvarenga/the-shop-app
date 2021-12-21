import React from "react";
import { Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "../../components/CartItem";
import Colors from "../../constants/Colors";
import { removeFromCart, clearCart } from "../../store/Cart";
import { addOrder } from "../../store/Orders";
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
  const dispatch = useDispatch();

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
          onPress={() => {
            dispatch(
              addOrder({ items: cartItems, totalAmount: cartTotalAmount })
            );
            dispatch(clearCart());
          }}
        />
      </Summary>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            deletable
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </Screen>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

export default CartScreen;
