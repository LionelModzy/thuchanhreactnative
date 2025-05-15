import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useMyContextController, logout } from '../store';
import { useNavigation, CommonActions } from '@react-navigation/native';

const CustomerProfile = () => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const navigation = useNavigation();

  // Kiểm tra userLogin trước khi render
  if (!userLogin) {
    return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Loading...</Text></View>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    fullName: userLogin.fullName,
    phone: userLogin.phone,
    address: userLogin.address
  });

  // Đồng bộ lại editedProfile khi userLogin thay đổi
  useEffect(() => {
    setEditedProfile({
      fullName: userLogin?.fullName || '',
      phone: userLogin?.phone || '',
      address: userLogin?.address || ''
    });
  }, [userLogin]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateProfile = async () => {
    try {
      await firestore()
        .collection('USERS')
        .doc(userLogin.email)
        .update({
          fullName: editedProfile.fullName,
          phone: editedProfile.phone,
          address: editedProfile.address,
          updatedAt: firestore.FieldValue.serverTimestamp()
        });

      // Update local state
      dispatch({
        type: "USER_LOGIN",
        value: {
          ...userLogin,
          ...editedProfile
        }
      });

      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const credential = auth.EmailAuthProvider.credential(
        userLogin.email,
        currentPassword
      );
      await auth().currentUser.reauthenticateWithCredential(credential);
      await auth().currentUser.updatePassword(newPassword);
      await firestore()
        .collection('USERS')
        .doc(userLogin.email)
        .update({
          password: newPassword,
          updatedAt: firestore.FieldValue.serverTimestamp()
        });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      Alert.alert('Success', 'Password changed successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.title}>Profile Management</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        {!isEditing ? (
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userLogin.fullName}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userLogin.email}</Text>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{userLogin.phone}</Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{userLogin.address}</Text>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => {
                setIsEditing(true);
                setEditedProfile({
                  fullName: userLogin.fullName,
                  phone: userLogin.phone,
                  address: userLogin.address
                });
              }}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.editForm}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedProfile.fullName}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, fullName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={editedProfile.phone}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={editedProfile.address}
              onChangeText={(text) => setEditedProfile({ ...editedProfile, address: text })}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.saveButton]}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        <View style={styles.passwordForm}>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity 
            style={[styles.button, styles.changePasswordButton]}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#f44336', marginTop: 20 }]}
        onPress={async () => {
          await logout(dispatch);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
        }}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  profileInfo: {
    gap: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  editForm: {
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  changePasswordButton: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  passwordForm: {
    gap: 10,
  },
});

export default CustomerProfile; 