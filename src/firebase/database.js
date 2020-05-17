/**
 * @class Database
 */

import firestore from '@react-native-firebase/firestore';

class Database {
 

  static createUserProfile(userId, hasAcceptedUserPublication, lastPosition, hasSeenTutorial ,fnSuccess, fnError){
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        hasAcceptedUserPublication: hasAcceptedUserPublication,
        lastPosition: new firestore.GeoPoint(lastPosition.latitude, lastPosition.longitude),
        hasSeenTutorial: hasSeenTutorial,
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getUserProfile(userId,fnSuccess, fnError, _this){
    firestore()
    .collection('Users')
    .doc(userId)
    .get()
    .then((DocReference) => {
      fnSuccess(DocReference.data(),_this);
    })
    .catch((error) => {
      fnError(error);
    });
  }

  static getSponsors(fnSuccess, fnError){
    firestore()
    .collection('Sponsors')
    .get()
    .then((querySnapshot) => {
      fnSuccess(querySnapshot);
    })
    .catch((error) => {
      fnError(error);
    });
  }

  static getActivities(fnSuccess, fnError){
    firestore()
    .collection('Activities')
    .get()
    .then((querySnapshot) => {
      fnSuccess(querySnapshot);
    })
    .catch((error) => {
      fnError(error);
    });
  }

  static createActivity(userId, sponsorId, starttime, endtime, source, distance, speed, creationTime ,fnSuccess, fnError){
    firestore()
      .collection('Activities')
      .add({
        userId: userId,
        sponsorId: sponsorId,
        startTime: starttime,
        endTime:endtime,
        source:source,
        distance:distance,
        speed:speed,
        creationTime:creationTime,
        status:'pending'
      })
      .then((DocReference) => {
        fnSuccess(DocReference);
      })
      .catch((error) => {
        fnError(error);
      });
  }


  static getCharities(fnSuccess, fnError){
    firestore()
    .collection('Charities')
    .get()
    .then((querySnapshot) => {
      fnSuccess(querySnapshot);
    })
    .catch((error) => {
      fnError(error);
    });
  }

  static getTotals(fnSuccess, fnError){
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
