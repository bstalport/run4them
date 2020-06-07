/**
 * @class Database
 */

import firestore from '@react-native-firebase/firestore';
import Authentication from 'src/firebase/authentication';
import auth from '@react-native-firebase/auth';

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

  static getUsersList(fnSuccess, fnError) {
    firestore()
      .collection('Users')
      .get()
      .then((DocReference) => {
        let aRes = [];
        DocReference.docs.map((act) =>
          aRes.push({
            id: act.id,
            ...act.data(),
          }),
        );
        fnSuccess(aRes);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static listenUsersList(fnSuccess, fnError) {
      firestore()
        .collection('Users')
        .onSnapshot(fnSuccess, fnError);
  }

  static getSponsors(fnSuccess, fnError) {
    firestore()
      .collection('Campains')
      .get()
      .then((campSnashot) => {
        firestore()
          .collection('Sponsors')
          .get()
          .then((sponsorSnapshot) => {
            let docs = [];
            sponsorSnapshot.docs.forEach((doc) => {
              // for each sponsor, find the related campain
              let campain = null;
              campSnashot.docs.forEach((camp) => {
                if (campain === null) {
                  var today = new Date();
                  var c = camp.data();
                  if (
                    c.sponsorId === doc.id &&
                    c.startDate.toDate() <= today &&
                    c.endDate.toDate() >= today &&
                    c.totalBudget - c.budgetUsed > 0
                  ) {
                    campain = {
                      ...c,
                      campainId: camp.id,
                    };
                  }
                }
              });
              if (campain)
                docs.push({
                  ...doc.data(),
                  sponsorId: doc.id,
                  campain: campain,
                });
            });
            fnSuccess(docs);
          })
          .catch((error) => {
            fnError(error);
          });
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static getActivities(fnSuccess, fnError, uId) {
    let userId = '';
    if (uId) {
      userId = uId;
    } else {
      userId = auth().currentUser ? auth().currentUser.uid : '';
    }
    const user = auth().currentUser; //Authentication.getCurrentUser();
    if (user && userId != '') {
      
      firestore()
        .collection('Activities')
        .where('userId', '==', userId)
        .get()
        .then((querySnapshotActivity) => {
        
          firestore()
            .collection('Sponsors').get()
            .then((querySnapshotSponsor) => {

              let array = [];
              let dataActivity = querySnapshotActivity.docs;    
              let dataSponsor = querySnapshotSponsor.docs;
              
              dataActivity.forEach((element) => {
                const data = element.data();
                const sponsor = dataSponsor.filter((item) => 
                  item.id === data.sponsorId
                );

                array.push({
                  id: element.id,
                  ...data,
                  sponsor: (sponsor.length > 0) ? sponsor[0].data() : null,
                });
              });
              fnSuccess(array);
            })
            .catch((error) => {
              fnError(error);
            });
        })
        .catch((error) => {
          fnError(error);
        });
    }
  }

  static listenUserProfile(fnSuccess, fnError) {
    const user = auth().currentUser; //Authentication.getCurrentUser();
    if (user) {
      firestore()
        .collection('Activities')
        .where('userId', '==', user.uid)
        .onSnapshot(fnSuccess, fnError);
    }
  }


  static deleteAllActivities(aActivityList){
    aActivityList.forEach((item) => {
      firestore()
      .collection('Activities')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Activity deleted:',item.id);
      });
    })
  }

  static createActivity(data, fnSuccess, fnError) {
    delete data.sponsor;
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
      .collection('Totals').doc('totals')
      .get()
      .then((docSnapshot) => {
        fnSuccess(docSnapshot);
      })
      .catch((error) => {
        fnError(error);
      });
  }

  static listenTotals(fnSuccess, fnError) {
    firestore()
      .collection('Totals').doc('totals')
      .onSnapshot(fnSuccess, fnError);
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
