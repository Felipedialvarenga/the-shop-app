import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Colors from "../../constants/Colors";
import ProductsOverViewScreen from "../../screens/ProductsOverviewScreen";
import ProductDetailScreen from "../../screens/ProductDetailScreen";
import CartScreen from "../../screens/CartScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
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
    },
  }
);

export default createAppContainer(ProductsNavigator);
