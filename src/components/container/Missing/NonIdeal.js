import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MissingNonIdeal = () => {
  const navigation = useNavigation();

  const handleReportMissingPerson = () => {
    navigation.navigate('found');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Are you looking for a missing person? Report here
      </Text>
      <Button
        title="Report the missing person"
        onPress={handleReportMissingPerson}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default MissingNonIdeal;
