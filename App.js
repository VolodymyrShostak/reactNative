
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Home } from "./Screens/main/Home";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        });
        SplashScreen.hideAsync();
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    }
    loadFonts();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
