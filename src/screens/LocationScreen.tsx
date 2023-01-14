import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BottomBar from '../components/BottomBar';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../navigation/navigation';
import openMap, { createMapLink } from "react-native-open-maps";

const LocationScreen = () => {
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [locationStatus, setLocationStatus] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Konum izni gerekli',
              message: 'Uygulamanın konuma erişmesi için izin vermeniz gerekmektedir.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Konum İzni Verilmedi');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Konum Algılanıyor...');
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus('Konum Başarıyla Algılanmıştır');
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
        const provider = Platform.OS == "ios" ? "apple" : "google";
        const url = createMapLink({ query: currentLatitude + "," + currentLongitude, provider: provider },)
        setMapsUrl(url)
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('Konum Başarıyla Algılanmıştır');
        console.log(position);
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <Image
        source={require("../assets/img/location.png")}
        style={{ marginTop: 20, width: 100, height: 100 }}
      />
      <Text style={{
        fontSize: 25,
        color: 'red',
        marginVertical: 16,
        textAlign: 'center'
      }}>
        {locationStatus}
      </Text>
      <CustomButton onPress={getOneTimeLocation} text="Yenile" width='40%' />
      <CustomButton
        disable={locationStatus == "Konum Algılanıyor..."}
        onPress={() => {
          openMap({ query: currentLatitude + "," + currentLongitude })
        }}
        text="Haritada Gör" width='80%'
      />
      <BottomBar disable={locationStatus == "Konum Algılanıyor..."} text="İlerle" onPress={() => navigation.navigate(SCREENS.ContactScreen, { url: mapsUrl })} />
    </SafeAreaView>
  );
};

export default LocationScreen;