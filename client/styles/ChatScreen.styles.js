import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  top: {
    marginTop: 100,
  },
  UserInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserImgWrapper: {
    paddingTop: 15,
    paddingBottom: 10,
  },
  UserImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  Card: {
    padding: 10,
    borderWidth: 3,
    borderColor: "#97CAEF",
    borderRadius: 60,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",

    shadowRadius: 5,
  },
  TextSection: {
    padding: 6,
    paddingLeft: 0,
    marginLeft: 10,
    width: 300,
  },
  UserInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",

    flexWrap: "wrap",
  },
  UserName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  TimePosted: {
    fontSize: 12,
    color: "#666",
  },
  TextMessage: {
    fontSize: 14,
    color: "#333333",
  },

  //Chat Room
  CT_TextInput: {
    borderWidth: 3,
    borderColor: "#97CAEF",
    borderRadius: 60,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    shadowRadius: 5,
    marginTop: 10,

    height: 40,
    borderWidth: 2,
  },
  CT_Body: {
    padding: 20,
    paddingTop: 20,
    paddingBottom: 500,
    borderWidth: 3,
    borderColor: "#97CAEF",
    borderRadius: 30,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",

    shadowRadius: 5,
  },
  TextBody: {
    padding: 10,
    borderWidth: 3,
    width: 250,
    borderColor: "#97CAEF",
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 0,
    backgroundColor: "#fff",
  },
  YouBody: {
    padding: 10,
    borderWidth: 3,
    width: 250,
    borderColor: "#97CAEF",
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: 50,
    backgroundColor: "#fff",
    backgroundColor: "lightblue",
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  KeyboardAvoidingView: {
    left: 0,
    right: 0,
    bottom: 15,
    paddingTop: 30,

    // borderWidth: 3,
    // borderColor: "#97CAEF",
    // borderRadius: 60,
    // marginVertical: 5,
    // marginHorizontal: 10,
    // backgroundColor: "#fff",
    // shadowRadius: 5,
    // marginTop: 40,
    // marginRight: 15,

    // borderWidth: 2,
  },
  Right: {
    borderTopRightRadius: 0,
  },
  Left: {
    borderTopLeftRadius: 0,
  },

  //   Left:after {
  //   Left: 0,
  //   transform: translateX(-100%);
  //  // background: radial-gradient(circle at 0 0, transparent, transparent 72%, darkseagreen 72%);
  // },
  // &:after {
  //   Right: 0,
  //   transform: translateX(100.%),
  //   //background: radial-gradient(circle at 100% 0, transparent, transparent 72%, darkseagreen 72%);
  // },
});
