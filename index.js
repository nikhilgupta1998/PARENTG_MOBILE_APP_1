


/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Bugsnag from "@bugsnag/react-native";
import 'react-native-gesture-handler';
AppRegistry.registerComponent(appName, () => App);
Bugsnag.start();
