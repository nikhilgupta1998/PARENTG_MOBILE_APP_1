import {
  Alert,
  AppState,
  AppStateStatus,
  I18nManager,
  NativeModules,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { configureAppStore } from "./App/services/store";
import { Provider } from "react-redux";
import RootStack from "./App/Navigations/RootStack";
import storage from "./App/utils/local-storage";
import RNRestart from "react-native-restart";
import Orientation from "react-native-orientation-locker";
const { store } = configureAppStore();
import "./App/locales/i18n";

import { firebase } from "@react-native-firebase/analytics";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
// import { CacheManager } from '@georstat/react-native-image-cache';
// import { Dirs } from 'react-native-file-access';

// CacheManager.config = {
//   baseDir: `${Dirs.CacheDir}/images_cache/`,
//   blurRadius: 15,
//   cacheLimit: 0,
//   maxRetries: 3,
//   retryDelay: 3000,
//   sourceAnimationDuration: 1000,
//   thumbnailAnimationDuration: 1000,
// };
const App = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    const deviceLanguage =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    __DEV__ && console.log("Device default language--->>", deviceLanguage);

    if (Platform.OS === "ios") {
      if (deviceLanguage && deviceLanguage.startsWith("ar")) {
        __DEV__ && console.log("ios true-------");
        I18nManager.forceRTL(true);
        i18n.changeLanguage("ar");
        storage.set("languageCode", "ar");
        if (!I18nManager.isRTL) {
          RNRestart.Restart();
        }
      } else {
        storage.get("languageCode").then((lang) => {
          if (lang == "hi") {
            I18nManager.forceRTL(false);
            i18n.changeLanguage("hi");
            if (I18nManager.isRTL) {
              RNRestart.Restart();
            }
          } else {
            __DEV__ && console.log("false-------");
            I18nManager.forceRTL(false);
            i18n.changeLanguage("en");
            storage.set("languageCode", "en");
            if (I18nManager.isRTL) {
              RNRestart.Restart();
            }
          }
        });
      }
    } else {
      if (deviceLanguage && deviceLanguage === "ar_AA") {
        __DEV__ && console.log("false-------");
        I18nManager.forceRTL(true);
        i18n.changeLanguage("ar");
        storage.set("languageCode", "ar");
        if (!I18nManager.isRTL) {
          RNRestart.Restart();
        }
      } else {
        storage.get("languageCode").then((lang) => {
          if (lang == "hi") {
            I18nManager.forceRTL(false);
            i18n.changeLanguage("hi");
            if (I18nManager.isRTL) {
              RNRestart.Restart();
            }
          } else {
            __DEV__ && console.log("false-------");
            I18nManager.forceRTL(false);
            i18n.changeLanguage("en");
            storage.set("languageCode", "en");
            if (I18nManager.isRTL) {
              RNRestart.Restart();
            }
          }
        });
      }
    }
  }, []);
  useEffect(() => {
    Orientation.configure({ disableFaceUpDown: true });
    Orientation.lockToPortrait();
    return () => {};
  }, []);
  useEffect(() => {
    if (Platform.OS !== "ios") {
      firebase.analytics().setAnalyticsCollectionEnabled(true);
      return; // don't create listeners on other platforms
    }

    const requestPermission = () => {
      request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
        .then(async (result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              await firebase.analytics().setAnalyticsCollectionEnabled(false);
              break;
            case RESULTS.DENIED:
              storage.set("TRACKING_TRANSPARENCY", result);
              await firebase.analytics().setAnalyticsCollectionEnabled(false);
              break;
            case RESULTS.LIMITED:
              storage.set("TRACKING_TRANSPARENCY", result);
              await firebase.analytics().setAnalyticsCollectionEnabled(true);
              break;
            case RESULTS.GRANTED:
              storage.set("TRACKING_TRANSPARENCY", result);
              await firebase.analytics().setAnalyticsCollectionEnabled(true);
              break;
            case RESULTS.BLOCKED:
              storage.set("TRACKING_TRANSPARENCY", result);
              await firebase.analytics().setAnalyticsCollectionEnabled(false);
              break;
          }
        })
        .catch((error) => console.log(error));
    };
    const checkPermission = () => {
      storage.get("TRACKING_TRANSPARENCY").then((val) => {
        if (!val) {
          check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
            .then(async (result) => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  await firebase
                    .analytics()
                    .setAnalyticsCollectionEnabled(true);
                  break;
                case RESULTS.DENIED:
                  requestPermission();
                  break;
                case RESULTS.LIMITED:
                  requestPermission();
                  break;
                case RESULTS.GRANTED:
                  await firebase
                    .analytics()
                    .setAnalyticsCollectionEnabled(true);
                  break;
                case RESULTS.BLOCKED:
                  requestPermission();
                  break;
              }
            })
            .catch((error) => console.log(error));
        }
      });
    };
    // if the app is active when the effect is fired, request immediately
    if (AppState.currentState === "active") {
      return checkPermission();
    }

    // otherwise setup a listener…
    const listener = AppState.addEventListener("change", (status) => {
      if (status === "active") {
        // …which will perform the request once the app is active
        checkPermission();
      }
    });

    return listener.remove;
  }, []);
  // const handleAppStateChange = async () => {
  //   check(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
  //     .then(async (result) => {
  //       Alert.alert(result)

  //     })
  //     .catch((error: any) => {
  //       console.log("error in request tracking permissions: ", error);
  //     });
  // };

  const appTracking = async () => {
    if (Platform.OS == "android") {
      await firebase.analytics().setAnalyticsCollectionEnabled(true);
    } else {
      // await handleAppStateChange();
    }
  };
  useEffect(() => {
    appTracking();
    return () => {};
  }, []);
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
