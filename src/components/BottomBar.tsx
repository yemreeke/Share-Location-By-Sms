import { Text, TouchableOpacity, View } from "react-native"
interface Props {
  onPress?: () => void
  disable?: boolean
  text: string
}
const BottomBar = (props: Props) => {
  const { onPress, disable, text } = props;
  const disableColor = "#8c9da8";
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
      <TouchableOpacity disabled={disable} onPress={onPress} style={{ height: 50, width: "94%", margin: "3%", borderRadius: 10, backgroundColor: disable ? disableColor : "#5aa8da", alignItems: "center", justifyContent: "center", }}>
        <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default BottomBar;