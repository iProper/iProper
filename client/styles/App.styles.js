import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerAlignCenterTop: {
    alignItems: "center",
    justifyContent: "flex-start",
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
  textH4: {
    fontSize: 15,
  },
  lightText: {
    color: "#97CAEF",
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 5,
  },
  alarmText: {
    color: "#FC4445",
    fontSize: 12,
    marginLeft: 15,
    lineHeight: 12,
    height: 12,
  },
  separator: {
    width: "100%",
    height: 2,
    marginVertical: 5,
    backgroundColor: "#aaa",
  },
  separatorVertical: {
    height: "60%",
    width: 2,
  },
  separatorRed: {
    backgroundColor: "#FC4445",
  },
  separatorBlue: {
    backgroundColor: "#97CAEF",
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
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
  buttonOffText: {
    color: "#FC4445",
    fontSize: 15,
  },
  buttonOff: {
    backgroundColor: "#fff",
  },
  buttonBig: {
    padding: 10,
  },
  buttonTextBig: {
    fontSize: 25,
  },
  formBox: {
    alignItems: "flex-start",
  },
  formLabel: {
    paddingLeft: 10,
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
  logo: {
    width: "100%",
    height: "90%",
  },
  App: {
    height: "100%",
    backgroundColor: "#fff",
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
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttons3rdPartyLogin: {
    justifyContent: "center",
    width: "100%",
  },
  button3rdPartyLogin: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    height: 40,
  },
  button3rdPartyLoginText: {
    fontWeight: "bold",
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
  chooseAccountTypeArea: {
    flex: 3,
    alignItems: "center",
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
    height: "100%",
  },
  chooseAccountTypeButton: {
    width: 80,
    height: 80,
    borderColor: "#97CAEF",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  chosenAccountTypeButton: {
    shadowColor: "#97CAEF",
    shadowOffset: {
      width: 4,
      height: 4,
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
  },
  navigationHeaderArea: {
    marginBottom: 15,
  },
  navigationHeader: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  navigationHeaderArrow: {
    color: "#97CAEF",
    fontSize: 35,
  },
  navigationHeaderText: {
    fontSize: 25,
  },
  registerForm: {
    padding: 30,
  },
  nextStepBtn: {
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  nextStepText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },

  confirmPhoneNumberScreen: {
    padding: 30,
  },
  requestBtn: {
    padding: 10,
    width: "75%",
    alignSelf: "center",
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: "#FC4445",
    marginTop: 15,
  },
  confirmInput: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  uploadDocumentScreen: {
    padding: 30,
  },
  uploadDocumentsArea: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },
});
