import React from "react";
import { View, Image, TouchableOpacity, Linking } from "react-native";
import { hp } from "../../constants/Dimenstions";

const YoutubeThumbnail = ({ videoUrl, size }: any) => {
  const getThumb = (url: any, size: any) => {
    if (url === null || url == undefined || url == "") {
      return "";
    }
    const results = url?.match("[\\?&]v=([^&#]*)");
    const video = results === null ? url : results[1];

    if (size === "small") {
      return `http://img.youtube.com/vi/${video}/2.jpg`;
    }
    return `http://img.youtube.com/vi/${video}/0.jpg`;
  };

  const thumbnailUrl = getThumb(videoUrl, size);

  const handlePress = async() => {
    const supported = await Linking.canOpenURL(videoUrl);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(videoUrl);
    } 
    // Open the YouTube video in the default browser or YouTube app
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        <Image
          source={{ uri: thumbnailUrl }}
          style={{ width: "100%", height: hp(23), borderRadius: 12 }}
        />
      </View>
    </TouchableOpacity>
  );
};

// Example of usage:
const YoutubeVideo = ({ videoUrl }: any) => {
  return (
    <View>
      <YoutubeThumbnail videoUrl={videoUrl} />
    </View>
  );
};

export default YoutubeVideo;
