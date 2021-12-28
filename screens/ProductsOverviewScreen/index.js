import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderRightButton, ProductItem } from "../../components";
import { MenuBar } from "../../components/UI/MenuBar/styles";
import { addToCart } from "../../store/Cart";
import Colors from "../../constants/Colors";
import { getProducts } from "../../store/Products";
import { CenteredView } from "./styles";

const ProductsOverViewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(getProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
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

  if (error) {
    return (
      <CenteredView>
        <Text>An error ocurred!</Text>
        <Button
          title="Try Again"
          onPress={loadProducts}
          color={Colors.primary}
        />
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

  if (!isLoading && products.length === 0) {
    return (
      <CenteredView>
        <Text>No products found. Maybe try adding some!</Text>
      </CenteredView>
    );
  }

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
