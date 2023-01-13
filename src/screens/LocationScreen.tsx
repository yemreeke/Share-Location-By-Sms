import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, PermissionsAndroid, Platform, Button, TouchableOpacity, Linking, ScrollView, } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const LocationScreen = () => {
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

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
        setLocationStatus('Konum Algılandı');
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
        setLocationStatus('Konum Algılandı');
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.container}>
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.boldText}>
              {locationStatus}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              Longitude: {currentLongitude}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
              }}>
              Latitude: {currentLatitude}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Button
                title="Refresh"
                onPress={getOneTimeLocation}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => Linking.openURL('https://www.google.com/maps/place/' + currentLatitude + ',' + currentLongitude)}>
            <Text style={{
              borderWidth: 3,
              borderColor: "blue",
              borderRadius: 20,
              padding: 20,
              fontSize: 25,
              color: 'red',
              marginVertical: 16,
              textAlign: 'center'
            }}>Haritaya Git</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
    textAlign: 'center'
  },
});

export default LocationScreen;