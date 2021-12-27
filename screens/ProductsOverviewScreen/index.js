import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderRightButton, ProductItem } from "../../components";
import { MenuBar } from "../../components/UI/MenuBar/styles";
import { addToCart } from "../../store/Cart";
import Colors from "../../constants/Colors";
import { getProducts } from "../../store/Products";

const ProductsOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const viewDetailHandler = (productId, productTitle) => {
    props.navigation.navigate("ProductDetail", {
      productId,
      productTitle,
    });
  };

  const addToCartHandler = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            viewDetailHandler(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            title="View Details"
            onPress={() =>
              viewDetailHandler(itemData.item.id, itemData.item.title)
            }
            color={Colors.primary}
          />
          <Button
            title="To Cart"
            onPress={() => addToCartHandler(itemData.item)}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverViewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: () => (
      <TouchableOpacity onPress={() => navData.navigation.toggleDrawer()}>
        <MenuBar />
        <MenuBar />
        <MenuBar />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => navData.navigation.navigate("Cart")}>
        <HeaderRightButton>
          <Ionicons name="md-cart" size={23} color="white" />
        </HeaderRightButton>
      </TouchableOpacity>
    ),
  };
};

export default ProductsOverViewScreen;
