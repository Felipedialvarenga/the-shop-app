import React, { useState } from "react";
import { Button } from "react-native";
import Colors from "../../constants/Colors";
import {
  OrderDate,
  ItemContainer,
  Summary,
  TotalAmount,
  DetailsItems,
} from "./styles";
import { CartItem } from "../CartItem";

export const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const orderDate = props.date.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ItemContainer>
      <Summary>
        <TotalAmount>${+props.amount.toFixed(2)}</TotalAmount>
        <OrderDate>{orderDate}</OrderDate>
      </Summary>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <DetailsItems>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              amount={cartItem.sum}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
            />
          ))}
        </DetailsItems>
      )}
    </ItemContainer>
  );
};
