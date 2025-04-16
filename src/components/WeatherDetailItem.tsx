import React, { useCallback, useMemo } from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

type Props = {
  title: string;
  value?: number | string;
  unit?: string;
  icon: string;
};

const WeatherDetailItem = ({title, value, unit = '', icon}: Props) => {
  const displayValue = useMemo(
    () => (value === undefined ? 'N/A' : `${value}${unit}`),
    [value, unit],
  );

  const left = useCallback((props: {color: string, style: Style}) => <List.Icon {...props} icon={icon} />, [icon]);

  return (
    <List.Item
      title={title}
      description={displayValue}
      left={left}
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
