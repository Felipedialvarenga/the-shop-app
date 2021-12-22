import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { HeaderRightButton } from "../../components";
import { Form, FormControl, Input, Label } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProd = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const [title, setTitle] = useState(selectedProd ? selectedProd.title : "");
  const [image, setImage] = useState(selectedProd ? selectedProd.imageUrl : "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    selectedProd ? selectedProd.description : ""
  );

  const submitHandler = useCallback(() => {
    console.log("submitting");
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <Form>
        <FormControl>
          <Label>Title</Label>
          <Input value={title} onChangeText={(text) => setTitle(text)} />
        </FormControl>
        <FormControl>
          <Label>Image URL</Label>
          <Input value={image} onChangeText={(text) => setImage(text)} />
        </FormControl>
        {!selectedProd && (
          <FormControl>
            <Label>Price</Label>
            <Input value={price} onChangeText={(text) => setPrice(text)} />
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
