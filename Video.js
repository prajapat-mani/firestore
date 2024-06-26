import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker, Switch, StyleSheet, Alert } from 'react-native';
import { startRecording } from 'react-native-video-capture'; // Assuming this is the native module
import BackgroundFetch from 'react-native-background-fetch';

const VideoCaptureComponent = () => {
  const [frameRate, setFrameRate] = useState(5);
  const [resolution, setResolution] = useState('1280x720');
  const [stabilization, setStabilization] = useState(false);

  const handleStartRecording = async () => {
    try {
      const result = await startRecording(frameRate, resolution, stabilization);
      Alert.alert('Recording started', JSON.stringify(result));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const configureBackgroundFetch = () => {
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // Fetch interval in minutes
    }, async (taskId) => {
      console.log('[BackgroundFetch] taskId: ', taskId);
      // Perform your background task here, e.g., saving captured images to persistent storage

      BackgroundFetch.finish(taskId);
    }, (error) => {
      console.log('[BackgroundFetch] failed to start');
    });

    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });
  };

  useEffect(() => {
    configureBackgroundFetch();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Frame Rate:</Text>
      <Picker
        selectedValue={frameRate}
        style={styles.picker}
        onValueChange={(itemValue) => setFrameRate(itemValue)}
      >
        <Picker.Item label="5 FPS" value={5} />
        <Picker.Item label="8 FPS" value={8} />
        <Picker.Item label="10 FPS" value={10} />
      </Picker>

      <Text style={styles.label}>Select Resolution:</Text>
      <Picker
        selectedValue={resolution}
        style={styles.picker}
        onValueChange={(itemValue) => setResolution(itemValue)}
      >
        <Picker.Item label="1280x720" value="1280x720" />
        <Picker.Item label="1920x1080" value="1920x1080" />
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Enable Image Stabilization:</Text>
        <Switch
          value={stabilization}
          onValueChange={(value) => setStabilization(value)}
        />
      </View>

      <Button title="Start Recording" onPress={handleStartRecording} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default VideoCaptureComponent;
