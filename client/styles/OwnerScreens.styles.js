import { StyleSheet } from "react-native";

export default StyleSheet.create({
  ownerDashboard: {
    padding: 30,
    paddingBottom: 0,
  }, 
  ownerDashboardHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  ownerDashboardProperties: {
    marginTop: 5,
    flexGrow: 1,
  },
  propertyCard: {
    height: 150,
  },
  propertyCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  propertyCardAddress: {
    fontSize: 18,
  },
  propertyCardTenantsNum: {
    fontSize: 18,
  },
  propertyCardMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingVertical: 10,
  },
  propertyCardPaidBar: {
    borderWidth: 1,
    height: "100%",
    width: 15,
    justifyContent: "flex-end",
  },
  propertyCardPaidBarProgress: {
    width: "100%",
    backgroundColor: "#FC4445"
  },
  propertyCardStatuses: {
    flex: 1,
    marginHorizontal: 10,
  },
  propertyCardReportMsg: {
    borderWidth: 1,
    borderRadius: 5,
    height: "75%",
    padding: 5, 
  },
  propertyCardButtons: {
    width: "17%",
    justifyContent: "space-between",
  },
  propertyCardReportStatusBtn: {
    width: 45,
    height: 45,
    borderWidth: 5,
    borderColor: "#ddd",
    borderRadius: 50,
  },
  propertyCardChatBtn: {
    width: 45,
    height: 45,
  },
  addNewPropertyButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: "100%",
  },

  addPropertyScreen: {
    padding: 30,
    backgroundColor: "white",
  },
  chooseNumOfRoomsArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  chooseNumOfRooms: {
    marginVertical: 5,
  },

  rulesList: {
    paddingVertical: 5,
    alignItems: "center",
    width: "100%",
    
  },
  rulesListHeader: {
    margin: 5,
  },
  rule: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#97CAEF",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    padding: 8,
    paddingHorizontal: 20,
    width: "100%",
    marginVertical: 4,
  },
  ruleTextInput: {
    fontSize: 15,
  },
  ruleText: {
    fontSize: 15,
  },
  ruleButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  ruleEditBtn: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  ruleSaveIcon: {
    width: 25,
    height: 25,
  }, 
  ruleEditIcon: {
    width: 25,
    height: 25,
  },
  ruleDeleteBtn: {
    width: 25,
    height: 25,
  },
  ruleDeleteIcon: {
    width: 25,
    height: 25,
  },
  addNewRuleBtn: {
    width: "100%",
    
    padding: 12,
    marginVertical: 4,
  },


  editPropertyDesc: {
    alignItems: "center",
  },
  descTextInput: {
    fontSize: 15,
    width: 330,
    textAlignVertical: "top",
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 5,
    minHeight: 60,
    margin: 10,
  },

  uploadPropertyDocumentArea: {
    paddingVertical: 10,
    alignItems: "center"
  },
});
