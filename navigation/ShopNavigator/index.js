import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Colors from "../../constants/Colors";
import ProductsOverViewScreen from "../../screens/ProductsOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverViewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: "white",
    },
  }
);

export default createAppContainer(ProductsNavigator);
