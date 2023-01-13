import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image, PermissionsAndroid, Platform, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import BottomBar from '../components/BottomBar';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../navigation/navigation';

const LocationScreen = () => {
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState("");
  const [currentLatitude, setCurrentLatitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");

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
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
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
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
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
      <CustomButton disable={locationStatus == "Konum Algılanıyor..."} onPress={() => {
        if (Platform.OS == "ios") {
          Linking.openURL('https://maps.apple.com/?daddr=' + currentLatitude + ',' + currentLongitude)
        }
        else {
          Linking.openURL('https://www.google.com/maps/place/' + currentLatitude + ',' + currentLongitude)
        }
      }} text="Haritada Gör" width='80%' />
      <BottomBar disable={locationStatus == "Konum Algılanıyor..."} type='ONE' onPress={() => navigation.navigate(SCREENS.ContactScreen)} />
    </SafeAreaView>
  );
};

export default LocationScreen;