import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackHeader from "components/BackHeader";
import global from "../../styles/global";
import Gift from "assets/icons/gift.svg";
import Coin from "assets/icons/coin.svg";
import { images } from "../../constants/img";
import { LightTheme } from "../../utils/theme";
import { hp } from "../../constants/Dimenstions";
import { useTranslation } from "react-i18next";

const Rewards = () => {
  const data = [
    { id: "#8956985698523", status: "10 coins credited", debit: false },
    { id: "Referal Credit", status: "10 coins credited", debit: false },
    { id: "#8956985698523", status: "10 coins debited", debit: true },
  ];
  const { t } = useTranslation();
  return (
    <View style={[global.wrap, { padding: 30 }]}>
      <Image
        source={images.HEADER}
        resizeMode="stretch"
        style={[
          global.greenShder,
          { right: 0, transform: [{ rotateY: "180deg" }] },
        ]}
      />
      <BackHeader  iconStyle={undefined}  RightIcon={<Gift />} title={t("REWARDS.REWARDS")} goback={undefined} rightIconOnPress={undefined} />
      <View style={styles.coinWrap}>
        <Coin />
        <Text style={styles.coin}>22 coins</Text>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item, index }) => (
          <View style={styles.rewardWrap} key={index}>
            <Text style={styles.refId}>{item?.id}</Text>
            <Text
              style={[
                styles.refId,
                {
                  color: item?.debit
                    ? LightTheme.colors.red_1
                    : LightTheme.colors.green_3,
                },
              ]}
            >
              {item?.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  coinWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(4),
  },
  coin: {
    fontSize: 24,
    fontFamily: LightTheme.fontFamily.semiBold,
    color: LightTheme.colors.headerTextColor_2,
    marginLeft: 15,
  },
  rewardWrap: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: LightTheme.colors.booking_border,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  refId: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.textColor1,
  },

  rewardStatus: {
    fontSize: 12,
    fontFamily: LightTheme.fontFamily.medium,
    color: LightTheme.colors.green_3,
  },
});
