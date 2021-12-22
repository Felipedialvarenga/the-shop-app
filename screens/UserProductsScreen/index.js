import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { ProductItem, MenuBar } from "../../components";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetails={() => {}}
          onAddToCart={() => {}}
        />
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
  };
};

export default UserProductsScreen;
