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

// Cập nhật hàm groupPeopleByLastName để đảm bảo dữ liệu trả về đúng
const groupPeopleByLastName = (_data) => {
  const groupedData = _data.reduce((acc, item) => {
    const group = item.name.last[0].toUpperCase();  // Giả sử ta nhóm theo chữ cái đầu của last name
    if (!acc[group]) {
      acc[group] = { title: group, data: [] };
    }
    acc[group].data.push(item);
    return acc;
  }, {});

  return Object.values(groupedData).sort((a, b) =>
    a.title.localeCompare(b.title)  // Đảm bảo rằng chúng ta so sánh các chữ cái đúng cách
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
        sections={groupPeopleByLastName(PEOPLE)}  // Đảm bảo dữ liệu đã được nhóm đúng cách
        keyExtractor={(item) => `${item.name.first}-${item.name.last}`}  // Khóa duy nhất cho mỗi item
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
        ItemSeparatorComponent={() => <View style={styles.separator} />}  // Thêm ngăn cách giữa các items
      />
    </SafeAreaView>
  );
}
