import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductItem, MenuBar, HeaderRightButton } from "../../components";
import Colors from "../../constants/Colors";
import { deleteCartProduct } from "../../store/Cart";
import { deleteProduct } from "../../store/Products";
import { Ionicons } from "@expo/vector-icons";
import { CenteredView } from "../EditProductScreen/styles";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert(
      "Are you Sure?",
      "Do you really want to delete permanently this item?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async() => {
            setError(null);
            setIsLoading(true);
            try {
              await dispatch(deleteProduct(id));
              await dispatch(deleteCartProduct(id));
            } catch (err) {
              setError(err.message);
            }
            setIsLoading(false);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color={Colors.primary} />
      </CenteredView>
    );
  }

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
            onPress={() => deleteHandler(itemData.item.id)}
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
