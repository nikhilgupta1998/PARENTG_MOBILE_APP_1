import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  Alert,
} from "react-native";
//@ts-ignore
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/FontAwesome";
import Orientation from "react-native-orientation-locker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Props = {
  source: { uri: string };
  poster: string;
  top: number;
  left: number;
  updateFullScreen:(val:boolean)=>void
};

const VideoPlayer: React.FC<Props> = ({ source, poster, top, left ,updateFullScreen}) => {
  const videoRef = useRef<Video>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [rotate, setRotate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const backAction = () => {
    if (fullscreen) {
      toggleFullscreen();
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    
    updateFullScreen(fullscreen);
    return () => backHandler.remove();
  }, [fullscreen]);

  const togglePlay = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const toggleFullscreen = () => {
    toggleRotate();
    setFullscreen(!fullscreen);
  };

  const toggleRotate = () => {
    setRotate((prevRotate) => {
      if (!prevRotate) {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
      return !prevRotate;
    });
  };

  const toggleSpeed = () => {
    setSpeed((prevSpeed) => {
      const newSpeed = prevSpeed === 1 ? 1.5 : 1;
      if (videoRef.current) {
        videoRef.current.rate = newSpeed;
      }
      return newSpeed;
    });
  };

  const onProgress = (data: {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  }) => {
    const { currentTime: newCurrentTime } = data;
    setCurrentTime(newCurrentTime);
  };

  const onLoad = (data: { duration: number }) => {
    const { duration: newDuration } = data;
    setDuration(newDuration);
    setLoading(false);
  };

  const onEnd = () => {
    setPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.seek(0);
    }
    if (fullscreen) {
      setFullscreen(!fullscreen);
    }
    if (rotate) {
      toggleRotate();
    }
  };

  const onBuffer = (data: { isBuffering: boolean }) => {
    const { isBuffering } = data;
    setLoading(isBuffering);
  };

  const onSliderValueChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.seek(value);
    }
  };

  const onSeekStart = () => {
    setPlaying(false);
  };

  const onSeekComplete = () => {
    setPlaying(true);
  };
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.ceil(secs - minutes * 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  const [hideBottem, setHideBottem] = useState(false);
  useEffect(() => {
    
    setHideBottem(!hideBottem);
    return () => {};
  }, [fullscreen]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setHideBottem(!hideBottem);
      }}
      style={{  position: "absolute",}}
    >
      <View
        style={[
          styles.container,
          fullscreen
            ? rotate
              ? {
                  position: "absolute",
                  width: Platform.OS=="android"? screenHeight:screenHeight-100,
                  height: Platform.OS=="android"? screenWidth +10:screenWidth ,
                  zIndex: 300000,
                  top: top,
                  left: left,
                }
              : {
                  position: "absolute",
                  width: 100,
                  height: 100,
                  zIndex: 300000,
                  top: top,
                  left: left,
                }
            : {},
        ]}
      >
        <Video
          ref={videoRef}
          source={source}
          style={[styles.video, fullscreen ? styles.fullscreenVideo : null]}
          posterResizeMode={"cover"}
          resizeMode={"contain"}
          rate={speed}
          paused={!playing}
          onProgress={onProgress}
          onLoad={onLoad}
          poster={poster}
          onEnd={onEnd}
          onBuffer={onBuffer}
          
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
        {!hideBottem && (
          <View style={styles.controls}>
            <TouchableWithoutFeedback
              style={styles.controlIconContainer}
              // onPress={togglePlay}
            >
              <Icon name={playing ? "pause" : "play"} size={20} color="#fff"  onPress={togglePlay} />
            </TouchableWithoutFeedback>
            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              thumbTintColor="#fff"
              value={currentTime}
              onValueChange={onSliderValueChange}
              onSlidingStart={onSeekStart}
              onSlidingComplete={onSeekComplete}
            />
            <TouchableOpacity
              style={styles.controlIconContainer}
              onPress={toggleSpeed}
            >
              <Text style={styles.controlIcon}>{`x${speed}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlIconContainer}
              onPress={toggleFullscreen}
            >
              <MaterialCommunityIcons
                name={fullscreen ? "fullscreen-exit" : "fullscreen"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
        )}

        {fullscreen && (
          <View style={styles.fullscreenOverlay}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleFullscreen}
            >
              <MaterialCommunityIcons name={"close"} size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
        {rotate && <StatusBar hidden={fullscreen} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: screenWidth * 0.5625, // 16:9 aspect ratio
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  fullscreenVideo: {
    height: "100%",
    width:  "100%",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    width:'100%',height:'100%',
    zIndex:9999999999
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 80,
    height: 80,
    marginLeft: -40,
    marginTop: -40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 40,
    zIndex: 1,
  },
  controls: {
    position: "absolute",
    bottom:0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    zIndex:99999999999
  },
  controlIconContainer: {
    marginHorizontal: 5,
  },
  controlIcon: {
    width: 20,
    height: 20,
    // fontFamily: Fonts.LIGHT,
    fontSize: 10,
    color: "#fff",
  },
  timeText: {
    color: "#fff",
    marginLeft: 5,
    marginRight: 10,
  },
  slider: {
    flex: 1,
    marginLeft: 5,
    marginRight: 10,
  },
  fullscreenOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  rotateButton: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    zIndex: 1,
  },
  rotateIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    zIndex: 1,
  },
  closeIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#fff",
  },
});

export default VideoPlayer;
