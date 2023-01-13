import { Text, TouchableOpacity, View } from "react-native"
const BottomBar = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <TouchableOpacity style={{ height: 50, width: "94%", margin: "3%", borderRadius: 10, backgroundColor: "#5aa8da", alignItems: "center", justifyContent: "center", }}>
        <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>İlerle</Text>
      </TouchableOpacity>
    </View>
  )
}
export default BottomBar;