import * as React from "react";
import * as Font from "expo-font";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          "poppins-thin"    : require("../assets/fonts/poppins/Poppins-Thin.ttf"),
          "poppins-regular" : require("../assets/fonts/poppins/Poppins-Regular.ttf"),
          "poppins-medium"  : require("../assets/fonts/poppins/Poppins-Medium.ttf"),
          "poppins-semi"    : require("../assets/fonts/poppins/Poppins-SemiBold.ttf"),
          "poppins-bold"    : require("../assets/fonts/poppins/Poppins-Bold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}