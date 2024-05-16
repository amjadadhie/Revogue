import * as Font from "expo-font";

// Load the DM Sans font
async function loadFonts() {
  await Font.loadAsync({
    "DM Sans": require("./path/to/DM_Sans.ttf"),
  });
}

loadFonts();
