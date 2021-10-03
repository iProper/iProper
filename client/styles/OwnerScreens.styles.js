import { StyleSheet } from "react-native";

export default StyleSheet.create({
  ownerDashboard: {
    padding: 30
  }, 
  ownerDashboardHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  ownerDashboardProperties: {
    paddingVertical: 30,
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
    borderWidth: 5,
    borderColor: "#ddd",
    borderRadius: 50,
    borderColor: "#FC4445",
  },
  addNewPropertyButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: "100%",
  },

  addPropertyScreen: {
    padding: 30
  }
});