import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Colors from "../../constants/Colors";
import ProductsOverViewScreen from "../../screens/ProductsOverviewScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import CartScreen from "../../screens/CartScreen";
import OrdersScreen from "../../screens/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../../screens/UserProductsScreen";
import EditProductScreen from "../../screens/EditProductScreen";
import AuthScreen from "../../screens/AuthScreen";
import StartupScreen from "../../screens/StartupScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      itemsContainerStyle: {
        paddingTop: 35,
      },
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
