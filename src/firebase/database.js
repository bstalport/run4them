/**
 * @class Database
 */

import firestore from '@react-native-firebase/firestore';

class Database {
  /**
   * Sets a users mobile number
   * @param userId
   * @param mobile
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */

  
  static setUserProfile(userId, email, name) {
     firestore()
      .collection('UsersExtentedInformation')
      .add({
        userId: userId,
        email: email,
        name: name,
      })
      .then(() => {
        console.log('User added!');
      })
      .catch((error) => {
        console.error(error.toString());
      });
  }

  /**
   * Listen for changes to a users mobile number
   * @param userId
   * @param callback Users mobile number
   */
  static listenUserProfile(userId, callback) {
    firestore()
      .collection('UsersExtentedInformation')
      .doc(userId)
      .onSnapshot(
        (documentSnapshot) => {
          console.log('User data: ', documentSnapshot);
          callback(documentSnapshot.id,documentSnapshot.data());
        },
        (error) => console.error(error),
      );
  }
}

module.exports = Database;
