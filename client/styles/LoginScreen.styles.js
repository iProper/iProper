import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loginScreen: {
    flex: 1,
    maxHeight: 500,
  },
  loginScreenHeader: {
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
    maxHeight: 200,
  },
  chooseLoginScreenButtons: {
    marginVertical: 5,
    flex: 0.55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    maxHeight: 100,
  },
  chooseLoginScreenButton: {
    height: 60,
    margin: 8,
    flex: 1,
  },
  loginFormArea: {
    flex: 3,
    maxHeight: 400,
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttons3rdPartyLogin: {
    justifyContent: "center",
    width: "100%",
  },
  button3rdPartyLogin: {
    height: 40,
    borderStyle: "solid",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    flexDirection: "row",
    alignItems: "center",

    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  button3rdPartyLoginText: {
    fontWeight: "bold",
    color: "#555",
  },
  loginForm: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  forgotPassword: {
    flex: 0.5,
    marginTop: 9,
  },
  loginButton: {
    width: "100%",
    maxHeight: 50,
  },
  formSubmissionError: {
    flex: 0.5,
  },
});
