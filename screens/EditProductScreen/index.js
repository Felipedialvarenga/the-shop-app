import React, { useCallback, useEffect, useReducer } from "react";
import { TouchableOpacity, ScrollView, Alert, Text } from "react-native";
import { HeaderRightButton } from "../../components";
import { Form, FormControl, Input, Label } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../store/Products";
import { formReducer, FORM_UPDATE } from "../../utils";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const selectedProd = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: selectedProd ? selectedProd.title : "",
      imageUrl: selectedProd ? selectedProd.imageUrl : "",
      description: selectedProd ? selectedProd.description : "",
      price: "",
    },
    inputValidities: {
      title: selectedProd ? true : false,
      imageUrl: selectedProd ? true : false,
      description: selectedProd ? true : false,
      price: selectedProd ? true : false,
    },
    formIsValid: selectedProd ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    if (selectedProd) {
      dispatch(
        updateProduct({
          id: prodId,
          title: formState.inputValues.title,
          imageUrl: formState.inputValues.imageUrl,
          description: formState.inputValues.description,
        })
      );
    } else {
      dispatch(
        createProduct({
          title: formState.inputValues.title,
          imageUrl: formState.inputValues.imageUrl,
          description: formState.inputValues.description,
          price: formState.inputValues.price,
        })
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (input, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_UPDATE,
      value: text,
      isValid,
      input,
    });
  };

  return (
    <ScrollView>
      <Form>
        <FormControl>
          <Label>Title</Label>
          <Input
            value={formState.inputValues.title}
            onChangeText={(text) => textChangeHandler("title", text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid text.</Text>
          )}
        </FormControl>
        <FormControl>
          <Label>Image URL</Label>
          <Input
            value={formState.inputValues.imageUrl}
            onChangeText={(text) => textChangeHandler("imageUrl", text)}
          />
          {!formState.inputValidities.imageUrl && (
            <Text>Please enter a valid image url.</Text>
          )}
        </FormControl>
        {!selectedProd && (
          <FormControl>
            <Label>Price</Label>
            <Input
              value={formState.inputValues.price}
              onChangeText={(text) => textChangeHandler("price", text)}
              keyboardType="decimal-pad"
            />
            {!formState.inputValidities.price && (
              <Text>Please enter a valid price.</Text>
            )}
          </FormControl>
        )}
        <FormControl>
          <Label>Description</Label>
          <Input
            value={formState.inputValues.description}
            onChangeText={(text) => textChangeHandler("description", text)}
          />
          {!formState.inputValidities.description && (
            <Text>Please enter a valid description.</Text>
          )}
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
