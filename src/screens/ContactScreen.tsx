import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform, Text, View } from "react-native";
import { Contact, selectContact, } from "react-native-select-contact";
import BottomBar from "../components/BottomBar";
import CustomButton from "../components/CustomButton";
import SendSMS from "react-native-sms";
interface Props {
  navigation: any,
  route: any
}
const ContactScreen = (props: Props) => {
  const [mapUrl, setMapsUrl] = useState("")
  const [selected, setSelected] = useState<Contact>();

  useEffect(() => {
    if (props.route.params.url) {
      setMapsUrl(props.route.params.url)
    }
  }, [])

  const selectPerson = async () => {
    if (await ContactPermission()) {
      const selectedPerson = await selectContact();
      if (selectedPerson) {
        setSelected(selectedPerson);
      }
    }
  };

  const ContactPermission = async () => {
    if (Platform.OS === 'android') {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (request === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert("Permission Denied");
        return false;
      }
      else if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert("Permission Denied");
        return false;
      }
    }
    return true;
  };

  const smsGonder = () => {
    if (selected) {
      const number = selected.phones[0].number.toString();
      SendSMS.send(
        {
          body: mapUrl,
          recipients: [number],
          successTypes: ['sent', 'queued'],
        },
        (completed, cancelled, error) => {
          if (completed) {
            Alert.alert('SMS başarıyla gönderilmiştir.');
          } else if (cancelled) {
            Alert.alert('SMS gönderilmekten vazgeçilmiştir');
          } else if (error) {
            Alert.alert('Sms gönderme hatası oluştu');
          }
        },
      );
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", paddingTop: 30, }}>
      <Text style={{ color: "black", fontSize: 22, }} >Sms Gönderilecek Kişiyi Seçiniz</Text>
      <CustomButton text="Kişi Seç" width="50%" onPress={selectPerson} />
      <View style={{ width: "100%", marginTop: 30, alignItems: "center" }}>
        {
          selected ?
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ color: "black", fontSize: 25, marginBottom: 10, }}>Kişi Bilgileri</Text>
              <Text style={{ color: "black", fontSize: 22, }} >Ad Soyad : {selected.name}</Text>
              <Text style={{ color: "black", fontSize: 22, }} >Numara : {selected.phones[0].number}</Text>
            </View>
            :
            <Text style={{ color: "red", fontSize: 24, }}>Kişi Seçilmemiştir!</Text>
        }
      </View>
      <BottomBar disable={selected == undefined} text="Sms Gönder" onPress={smsGonder} />
    </View>
  )
}
export default ContactScreen;
