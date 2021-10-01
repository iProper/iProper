import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
})