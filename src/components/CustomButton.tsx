import { Text, TouchableOpacity } from "react-native"
interface Props {
  onPress?: () => void
  disable?: boolean
  text: string,
  width?: string
}
const CustomButton = (props: Props) => {
  const { onPress, disable, text, width } = props;
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={{ height: 50, width: width ? width : "100%", maxWidth: "94%", margin: "3%", borderRadius: 10, backgroundColor: disable ? "#8c9da8" : "#5aa8da", alignItems: "center", justifyContent: "center", }}>
      <Text style={{ fontSize: 25, color: "white", textAlign: "center" }}>{text}</Text>
    </TouchableOpacity>
  )
}
export default CustomButton;