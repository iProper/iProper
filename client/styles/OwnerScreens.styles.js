import { WHEN_UNLOCKED_THIS_DEVICE_ONLY } from "expo-secure-store";
import { StyleSheet } from "react-native";

export const ownerStyleSheet = StyleSheet.create({
  ownerDashboard: {
    padding: 30,
  },

  addPropertyScreen: {
    //padding: 100,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    height: "100%",
  },
  lineSeparator: {
    backgroundColor: "#97CAEF",

    padding: 1,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 10,
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
  streetNumberInput: {
    height: 35,
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
  },
  streetInput: {
    height: 35,
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
    marginLeft: 15,
  },
  cityInput: {
    height: 35,
    width: "55%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
  },
  provinceInput: {
    height: 35,
    width: "40%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
    marginLeft: 15,
  },
  postalCodeInput: {
    height: 35,
    width: "33%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
  },
  ownerIdInput: {
    height: 35,
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    marginVertical: 5,
    marginLeft: 23,
  },
  NumberOfRooms: {
    marginRight: 10,
    borderRadius: 6,
  },
  addNewRuleBtn: {
    padding: 12,
    width: "75%",
    borderRadius: 10,
    backgroundColor: "red",

    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  addNewRuleText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  DescTextInput: {
    width: 330,
    paddingBottom: 60,
    backgroundColor: "#DCDCDC",
    borderRadius: 3,
  },
  RegistrationProofOfOwnership: {
    color: "blue",
    margin: 10,
    fontSize: 15,
    backgroundColor: "white",
    textAlign: "left",
  },
  uploadDocText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  createPropertyBtn: {},
  createPropertyBtnPressed: {
    width: 310,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "red",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  createPropertyText: {
    margin: 10,
    fontSize: 25,
    marginLeft: 40,
    textAlign: "left",
    color: "white",
  },
  uploadDocumentsBtn: {
    padding: 10,
    width: 160,
    borderRadius: 10,
    backgroundColor: "red",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 8,
    marginRight: 150,
  },
  addressRow: {
    flexDirection: "row",
  },
});
