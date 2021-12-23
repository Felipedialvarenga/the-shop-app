import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { HeaderRightButton } from "../../components";
import { Form, FormControl, Input, Label } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../store/Products";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProd = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [title, setTitle] = useState(selectedProd ? selectedProd.title : "");
  const [imageUrl, setImageUrl] = useState(
    selectedProd ? selectedProd.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    selectedProd ? selectedProd.description : ""
  );

  const submitHandler = useCallback(() => {
    if (selectedProd) {
      dispatch(updateProduct({ id: prodId, title, imageUrl, description }));
    } else {
      dispatch(createProduct({ title, imageUrl, description, price }));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <Form>
        <FormControl>
          <Label>Title</Label>
          <Input
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
          />
        </FormControl>
        <FormControl>
          <Label>Image URL</Label>
          <Input value={imageUrl} onChangeText={(text) => setImageUrl(text)} />
        </FormControl>
        {!selectedProd && (
          <FormControl>
            <Label>Price</Label>
            <Input
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </FormControl>
        )}
        <FormControl>
          <Label>Description</Label>
          <Input
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </FormControl>
      </Form>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam("submit");

  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <TouchableOpacity onPress={submitFn}>
        <HeaderRightButton>
          <Ionicons name="md-checkmark" size={23} color="white" />
        </HeaderRightButton>
      </TouchableOpacity>
    ),
  };
};

export default EditProductScreen;
