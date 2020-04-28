/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
import { pushLoginScreen } from 'src/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont()

Navigation.events().registerAppLaunchedListener(() => pushLoginScreen());
