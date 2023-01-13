import { useState } from "react";
import { Alert, Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import { Contact, selectContact } from "react-native-select-contact";

const ContactScreen = () => {
  const [selected, setSelected] = useState<Contact>();
  const selectPerson = async () => {
    if (await ContactPermission()) {
      const selectedPerson = await selectContact();
      if (selectedPerson) {
        setSelected(selectedPerson);
        const name = selectedPerson?.name;
        const phone = selectedPerson?.phones[0]?.number;
        console.log("Contcact:", selectedPerson);
        console.log('Name:', name);
        console.log('Phone:', phone);
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

  return (
    <View style={{ alignItems: "center", backgroundColor: "white" }}>
      <View style={{ marginTop: 40, width: "50%" }}>
        <Button
          onPress={selectPerson} title="Kişi Seç" />
      </View>
      {
        selected &&
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={styles.title}>Seçilen Kişi</Text>
          <Text style={styles.header} >Ad Soyad</Text>
          <Text style={styles.text} >{selected.name}</Text>
          <Text style={styles.header} >Numara</Text>
          <Text style={styles.text} >{selected.phones[0].number}</Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "black",
    fontSize: 25,
  },
  header: {
    color: "black",
    fontSize: 22,
  },
  text: {
    color: "black",
    fontSize: 18,
  }
})

export default ContactScreen;
