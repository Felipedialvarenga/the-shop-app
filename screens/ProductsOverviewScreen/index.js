import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem } from "../../components";
import { addToCart } from "../../store/Cart";

const ProductsOverViewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

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
          onViewDetail={() =>
            viewDetailHandler(itemData.item.id, itemData.item.title)
          }
          onAddToCart={() => addToCartHandler(itemData.item)}
        />
      )}
    />
  );
};

ProductsOverViewScreen.navigationOptions = {
  headerTitle: "All Products",
};

export default ProductsOverViewScreen;
