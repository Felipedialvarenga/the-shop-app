import React, { useState, useEffect } from "react";
import { Button, FlatList, ActivityIndicator, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "../../components/CartItem";
import Colors from "../../constants/Colors";
import { removeFromCart, clearCart } from "../../store/Cart";
import { addOrder } from "../../store/Orders";
import { Amount, Screen, Summary, SummaryText } from "./styles";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
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

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const sendOrderHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        addOrder({ items: cartItems, totalAmount: cartTotalAmount })
      );
      dispatch(clearCart());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Screen>
      <Summary>
        <SummaryText>
          Total: <Amount>${cartTotalAmount.toFixed(2)}</Amount>
        </SummaryText>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={!!!cartItems.length}
            onPress={sendOrderHandler}
          />
        )}
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
            onRemove={() => dispatch(removeFromCart(itemData.item.productId))}
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
