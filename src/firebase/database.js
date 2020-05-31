/**
 * @class Database
 */

import firestore from '@react-native-firebase/firestore';
import Authentication from 'src/firebase/authentication';

class Database {

  static updateUserProfileLastPosition(
    userId,
    lastPosition,
    fnSuccess,
    fnError,
  ) {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        lastPosition: new firestore.GeoPoint(
          lastPosition.latitude,
          lastPosition.longitude,
        ),
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }


  static updateUserProfileAcceptedUserPublication(
    userId,
    hasAcceptedUserPublication,
    fnSuccess,
    fnError,
  ) {
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        hasAcceptedUserPublication: hasAcceptedUserPublication,
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getUserProfile(userId, fnSuccess, fnError) {
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then((DocReference) => {
        fnSuccess(DocReference.data());
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getSponsors(fnSuccess, fnError) {
    firestore()
      .collection('Sponsors')
      .get()
      .then((querySnapshot) => {
        let docs = [];
        querySnapshot.docs.forEach((doc) => {
          docs.push({
            ...doc.data(),
            sponsorId: doc.id,
          });
        });
        fnSuccess(docs);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getActivities(fnSuccess, fnError) {
    //const user = Authentication.getCurrentUser();
    let today = new Date();
    firestore()
      .collection('Activities')
      .where('creationTime', '<=', today)
      .get()
      .then((querySnapshot) => {
        fnSuccess(querySnapshot);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static listenUserProfile(fnSuccess, fnError) {
    firestore().collection('Activities').onSnapshot(fnSuccess, fnError);
  }

  static createActivity(data, fnSuccess, fnError) {
    firestore()
      .collection('Activities')
      .add({
        ...data,
        creationTime: firestore.Timestamp.now(),
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static createHealthKitUnregisteredActivitiy(data, fnSuccess, fnError) {
    firestore()
      .collection('healthKitUnregisteredActivities')
      .add({
        ...data,
        creationTime: firestore.Timestamp.now(),
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  /*static getCharities(fnSuccess, fnError){
    firestore()
    .collection('Charities')
    .get()
    .then((querySnapshot) => {
      fnSuccess(querySnapshot);
    })
    .catch((error) => {
      fnError(error);
    });
  }*/

  static getTotals(fnSuccess, fnError) {
    firestore()
      .collection('Totals')
      .get()
      .then((querySnapshot) => {
        fnSuccess(querySnapshot);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  /*
  static createNewRace(userId,fnSuccess, fnError) {
     firestore()
      .collection('Races')
      .add({
        uid: userId._user.uid,
        createTime: firestore.Timestamp.now()
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }

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
  }*/
}

module.exports = Database;
