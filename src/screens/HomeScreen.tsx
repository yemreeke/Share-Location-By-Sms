import { useNavigation } from "@react-navigation/native";
import { Alert, Image, Text, View } from "react-native";
import BottomBar from "../components/BottomBar";
import { SCREENS } from "../navigation/navigation";

const HomeScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
      <Image style={{ marginTop: 30, height: 200, width: 200 }} source={require("../assets/img/logo.jpeg")} />
      <Text style={{ marginTop: 10, fontSize: 30, color: "blue" }}>TRAKYA ÜNİVERSİTESİ</Text>
      <Text style={{ marginTop: 10, fontSize: 26, color: "#000" }}>Bilgisayar Mühendisliği</Text>
      <Text style={{ marginTop: 10, fontSize: 24, color: "#000" }}>Mobil Uygulama Dersi</Text>
      <Text style={{ marginTop: 10, fontSize: 18, color: "#000" }}>Konum Öğrenip Sms İle Paylaşma Uygulaması</Text>
      <Text style={{ marginTop: 20, fontSize: 26, color: "#000" }}>DOĞUKAN SONGÜR</Text>
      <Text style={{ marginTop: 10, fontSize: 26, color: "#000" }}>1171602024</Text>
      <BottomBar type="ONE"
        onPress={() => {
          navigation.navigate(SCREENS.LocationScreen);
        }}
      />
    </View >
  )
}
export default HomeScreen;