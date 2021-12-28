import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { FormInput, HeaderRightButton } from "../../components";
import { CenteredView, Form } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../store/Products";
import { formReducer, FORM_UPDATE } from "../../utils";
import Colors from "../../constants/Colors";

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      if (selectedProd) {
        await dispatch(
          updateProduct({
            id: prodId,
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
          })
        );
      } else {
        await dispatch(
          addProduct({
            title: formState.inputValues.title,
            imageUrl: formState.inputValues.imageUrl,
            description: formState.inputValues.description,
            price: formState.inputValues.price,
          })
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (input, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color={Colors.primary} />
      </CenteredView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView>
        <Form>
          <FormInput
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={selectedProd ? selectedProd.title : ""}
            initallyValid={!!selectedProd}
            required
          />
          <FormInput
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={selectedProd ? selectedProd.imageUrl : ""}
            initallyValid={!!selectedProd}
            required
          />
          {!selectedProd && (
            <FormInput
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <FormInput
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={selectedProd ? selectedProd.description : ""}
            initallyValid={!!selectedProd}
            required
            minLength={5}
          />
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
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
