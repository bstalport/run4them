import {StyleSheet} from 'react-native';

export const ColorPalette = {
    colorLevel1: '#141a30', // dark blue
    colorLevel2: '#fac42a', // yellow
    textLevel1: '#ffffff', // white
    textLevel2: '#141a30', // dark blue
    textLevel3: '#333333', // dark grey
    textLevel4: '#999999', // light grey
    backgroundLevel1:'#141a30', // dark blue
    backgroundLevel2:'#eeeeee', // light grey
    backgroundLevel3:'#ffffff', // white
    critial:'#df0709', // red
    strava:'#fc5200' // orange Strava

}

export const StylesGlobal = StyleSheet.create({
  responseLight: {
    textAlign: 'center',
    color: ColorPalette.critial,
  },
  container:{
    flex:1,
    margin:10
  },

  text:{
    margin:5,
    color:ColorPalette.textLevel3
  },

  errorMessage: {
    backgroundColor: ColorPalette.critial,
    color:ColorPalette.textLevel1,
    borderRadius:15,
    padding:10,
    textAlign:"center"
  },
  labelLight:{
      paddingTop:20,
      color :ColorPalette.textLevel1,
  },
  title1:{
      color:ColorPalette.textLevel2,
      fontSize:20,
      fontWeight:"bold",
      textAlign:"center",
      margin:15,
  }
});
