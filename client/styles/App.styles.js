import { StyleSheet, Dimensions } from "react-native"

const win = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  textH1: {
    fontSize: 30,
  },
  textH2: {
    fontSize: 25,
  },
  textH3: {
    fontSize: 20,
  },
  lightText: {
    color: "#97CAEF",
    fontWeight: "500",
    fontSize: 16,
  },
  separator: {
    width: "100%",
    height: 2,
    marginVertical: 5,
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
    height: win.height,
  },
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
    padding: 30,
    alignItems: "center",
  },
  buttons3rdPartyLogin: {
    flex: 1.2,
    justifyContent: "center",
    width: "100%",
    maxHeight: 100,
  },
  button3rdPartyLogin: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    maxHeight: 40,
  },
  button3rdPartyLoginText: {
    fontWeight: "bold",
  },
  loginForm: {
    flex: 1.2,
    width: "100%",
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
    maxHeight: 50,
  },
  formSubmissionError: {
    flex: 0.5,
  },
  chooseAccountTypeArea: {
    flex: 3,
    alignItems: 'center',
    padding: 30,
    maxHeight: 400,
  },
  chooseAccountTypeButtons: {
    flex: 0.7,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
  },
  accountTypeChoice: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: '100%',
  },
  chooseAccountTypeButton: {
    width: 80,
    height: 80,
    borderColor: "#97CAEF",
    borderWidth: 2,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  chosenAccountTypeButton: {
    shadowColor: "#97CAEF",
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowRadius: 5,
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  accountTypeIcon: {
    height: "70%",
    width: "70%",
  },
  accountTypeIconOwner: {
    marginRight: "5%",
  },
  createAccountButton: {
    marginTop: 25,
    width: "100%",
    flex: 0.25,
    maxHeight: 50,
  }
});
