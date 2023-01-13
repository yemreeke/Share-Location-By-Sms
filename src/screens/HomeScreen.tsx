import { Text, View } from "react-native";
import BottomBar from "../components/BottomBar";
import LocationScreen from "./LocationScreen";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, }}>
      <Text style={{ fontSize: 30, }}>hi</Text>
      <LocationScreen></LocationScreen>
      <BottomBar />
    </View >
  )
}
export default HomeScreen;