import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  DeleteButton,
  ItemContainer,
  ItemData,
  MainText,
  Quantity,
} from "./styles";

export const CartItem = (props) => {
  return (
    <ItemContainer>
      <ItemData>
        <Quantity>{props.quantity} </Quantity>
        <MainText>{props.title}</MainText>
      </ItemData>
      <ItemData>
        <MainText>${props.amount.toFixed(2)}</MainText>
        {props.deletable && (
          <DeleteButton onPress={props.onRemove}>
            <Ionicons name="ios-trash" size={23} color="red" />
          </DeleteButton>
        )}
      </ItemData>
    </ItemContainer>
  );
};
