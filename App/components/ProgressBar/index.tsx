import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


const PercentageBar = ({
  percentage,
  primaryColor,
  question,
  answare,
}: {
  percentage: number;
  primaryColor: string;
  question: number;
  answare: number;
}) => {

  return (
    <View>
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
          width: '90%',
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={['#fff', primaryColor]}
          style={{
            width: `${percentage}%`,
            height: 5,
            marginVertical: 10,
            borderRadius: 5,
          }}></LinearGradient>

        <Text
          style={{
            color: primaryColor,
            fontSize: 10,
            marginLeft: 10,
          }}>
          {answare}/{question}
        </Text>
      </View>
    </View>
  );
};
export default PercentageBar;
