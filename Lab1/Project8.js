import React from 'react';
import {
  SectionList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  name: {
    fontSize: 16,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 1,
  },
  sectionHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'rgb(170, 170, 170)',
  },
});

const groupPeopleByLastName = (_data) => {
  const groupedData = _data.reduce((acc, item) => {
    const group = item.name.last[0].toUpperCase();  
    if (!acc[group]) {
      acc[group] = { title: group, data: [] };
    }
    acc[group].data.push(item);
    return acc;
  }, {});

  return Object.values(groupedData).sort((a, b) =>
    a.title.localeCompare(b.title)  
  );
};

const PEOPLE = [
  { name: { title: 'Ms', first: 'Maeva', last: 'Scott' } },
  { name: { title: 'Ms', first: 'Maëlle', last: 'Henry' } },
  { name: { title: 'Mr', first: 'Mohamoud', last: 'Faaij' } },
];

export default function Project8() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SectionList
        sections={groupPeopleByLastName(PEOPLE)}  
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}  
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}  
      />
    </SafeAreaView>
  );
}
