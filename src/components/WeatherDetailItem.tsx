import React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

type Props = {
  title: string;
  value: number | string;
  unit?: string;
  icon: string;
};

const WeatherDetailItem = ({title, value, unit = '', icon}: Props) => {
  const displayValue = value === undefined ? 'N/A' : `${value}${unit}`;

  return (
    <List.Item
      title={title}
      description={displayValue}
      left={props => <List.Icon {...props} icon={icon} />}
      titleStyle={styles.title}
      descriptionStyle={styles.description}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
});

export default WeatherDetailItem; 