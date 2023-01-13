import { Text, TouchableOpacity, View } from "react-native"
interface Props {
  type: "ONE" | "TWO"
  onPress?: () => void
  disable?: boolean
  nextDisable?: boolean
  backDisable?: boolean
  onNext?: () => void
  onBack?: () => void
}
const BottomBar = (props: Props) => {
  const { type, onPress, onBack, onNext, disable, nextDisable, backDisable } = props;
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
      {type == "ONE"
        ?
        <TouchableOpacity disabled={disable} onPress={onPress} style={{ height: 50, width: "94%", margin: "3%", borderRadius: 10, backgroundColor: disable ? disableColor : "#5aa8da", alignItems: "center", justifyContent: "center", }}>
          <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>İlerle</Text>
        </TouchableOpacity>
        :
        <>
          <TouchableOpacity disabled={backDisable} onPress={onBack} style={{ height: 50, width: "44%", margin: "3%", borderRadius: 10, backgroundColor: disable ? disableColor : "#5aa8da", alignItems: "center", justifyContent: "center", }}>
            <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>İlerle</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={nextDisable} onPress={onNext} style={{ height: 50, width: "44%", margin: "3%", borderRadius: 10, backgroundColor: disable ? disableColor : "#5aa8da", alignItems: "center", justifyContent: "center", }}>
            <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>İlerle</Text>
          </TouchableOpacity>
        </>
      }
    </View>
  )
}
export default BottomBar;