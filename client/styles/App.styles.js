import { StyleSheet, Dimensions } from "react-native"

const win = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  lightText: {
    color: "#97CAEF",
    fontWeight: "500",
    fontSize: 16,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#aaa"
  },
  separatorVertical: {
    height: "60%",
    width: 2,
  },
  separatorRed: {
    backgroundColor: "#FC4445",
  },
  separator60: {
    width: "60%",
  },
  button: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FC4445",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15
  },
  buttonOffText: {
    color: "#FC4445",
    fontSize: 15
  },
  buttonOff: {
    backgroundColor: "#fff",
  },
  buttonBig: {
  },
  buttonTextBig: {
    fontSize: 25,
  },
  formInput: {
    height: 35,
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
  },
  formSubmissionError: {
    color: "#FC4445"
  },
  logo: {
    width: "100%",
    height: "90%"
  },
  App: {
    padding: 20,
  },
  loginScreen: {
    flex: 1,
  },
  loginScreenHeader: {
    alignItems: "center",
  },
  chooseLoginScreenButtons: {
    marginTop: 25,
    marginBottom: 5,
    flex: 0.55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  chooseLoginScreenButton: {
    height: 60,
    margin: 8,
    flex: 1,
  },
  loginFormArea: { 
    flex: 3,
    padding: 25,
    alignItems: "center",
  },
  buttons3rdPartyLogin: {
    flex: 1.2,
    justifyContent: "space-around",
    marginBottom: 15,
    width: "100%",
  },
  button3rdPartyLogin: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  button3rdPartyLoginText: {
    fontWeight: "bold",
  },
  loginForm: {
    flex: 1.2,
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-around"
  },
  forgotPassword: {
    flex: 0.5,
    marginTop: 9,
  },
  loginButton: {
    flex: 0.7,
    width: "100%",
  },
  formSubmissionError: {
    flex: 1
  },
  chooseAccountTypeArea: {
    flex: 3,
    paddingVertical: 25,
  }
});
