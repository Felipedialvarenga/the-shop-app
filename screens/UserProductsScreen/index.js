import React from "react";
import { FlatList, TouchableOpacity, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem, MenuBar, HeaderRightButton } from "../../components";
import Colors from "../../constants/Colors";
import { deleteCartProduct } from "../../store/Cart";
import { deleteProduct } from "../../store/Products";
import { Ionicons } from "@expo/vector-icons";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
            color={Colors.primary}
          />
          <Button
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id));
              dispatch(deleteCartProduct(itemData.item.id));
            }}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => (
      <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
        <MenuBar />
        <MenuBar />
        <MenuBar />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navData.navigation.navigate("EditProduct")}
      >
        <HeaderRightButton>
          <Ionicons name="md-create" size={23} color="white" />
        </HeaderRightButton>
      </TouchableOpacity>
    ),
  };
};

export default UserProductsScreen;
