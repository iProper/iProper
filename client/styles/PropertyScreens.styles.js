import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeScreenOwner: {
    padding: 30,
  },
  homeScreen: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  noPropertyHome: {
    justifyContent: "center",
    alignItems: "center",
  },

  QRCodeScanner: {
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
  QRCodeScannerHeader: {
    width: "100%",
    margin: 30,
    width: "80%",
    padding: 5,
    paddingRight: 10,
    alignItems: "center",
    backgroundColor: "#1a3345",
    borderRadius: 10,
  },
  QRCodeScannerHeaderBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  QRCodeBackArrow: {
    color: "#fff",
    fontSize: 32,
  },
  QRCodeScannerMessage: {
    padding: 10,
    width: "70%",
    backgroundColor: "#1a3345",
    borderRadius: 10,
  },

  renterHomeHeader: {
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  noPropertyCard: {
    width: "75%",
    height: 350,
    alignItems: "center",
  },
  enterPropertyButtons: {
    marginVertical: 5,
    width: "100%",
    justifyContent: "space-between",
  },

  renterHomeHeaderButtons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },

  duesTodayArea: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 30,
  },
  dueTodayHeader: {
    alignItems: "center",
    width: "100%",
    margin: 8,
  },
  duesToday: {
    alignItems: "center",
  },

  renterHomeNote: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    bottom: 10,
    width: "85%",
    height: 40,
    borderWidth: 2,
    borderColor: "#97CAEF",
    borderStyle: "solid",
    borderRadius: 5,
  },

  note: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#97CAEF",

    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 10,
    paddingLeft: 20,
    marginVertical: 4,

    height: 45,
    width: "100%",
  },
  addNoteButton: {
    width: "100%",
    height: 45,
    marginVertical: 4,
    borderWidth: 3,
  },
  pinnedNoteTextInput: {
    fontSize: 15,
  },
  noteText: {
    fontSize: 15,
  },
  noteButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  tenantText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 4,
  },
  tenantsListArea: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  tenantsList: {
    width: "105%",
    flexGrow: 1,
  },
  responsibility: {
    backgroundColor: "red",
  },
  QRcode: {
    height: "50%",
    width: "100%",
  },

  propertyAboutScreen: {
    padding: 30,
  },
  aboutEditBtn: {
    position: "absolute",
    right: 15,
    top: 8,
  },
  aboutEditIcon: {
    width: 30,
    height: 30,
  },
  infoField: {
    marginVertical: 7,
  },
  descText: {
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#000",
  },
  editAboutInput: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,

    padding: 0,
    paddingHorizontal: 8,
    marginRight: 1,
    textAlign: "right",
    width: "50%",
  },
  numOfRoomsPicker: {
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    width: 60,
    height: 28,
  },

  scheduleScreen: {
    padding: 30,
  },

  responsibilityOrder: {
    width: "150%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    borderColor: "#97CAEF",
    flexDirection: "row",
    marginHorizontal: 30,
  },

  responsibilityName: {
    backgroundColor: "#999",
    borderRadius: 50,
    paddingHorizontal: 5,
    marginRight: 2,
  },

  residentColor1: {
    borderColor: "#FC4445",
    backgroundColor: "#FC4445",
    color: "#fff",
  },
  residentColor2: {
    borderColor: "#b6dffc",
    backgroundColor: "#b6dffc",
    color: "#000",
  },
  residentColor3: {
    borderColor: "#ACF000",
    backgroundColor: "#ACF000",
    color: "#000",
  },
  residentColor4: {
    borderColor: "#6aa2fc",
    backgroundColor: "#6aa2fc",
    color: "#fff",
  },
  residentColor5: {
    borderColor: "#ff96ee",
    backgroundColor: "#ff96ee",
    color: "#fff",
  },
  residentColor6: {
    borderColor: "#ffdc5c",
    backgroundColor: "#ffdc5c",
    color: "#000",
  },
  residentColor7: {
    borderColor: "#ff8800",
    backgroundColor: "#ff8800",
    color: "#fff",
  },
  residentColor8: {
    borderColor: "#8b59ff",
    backgroundColor: "#8b59ff",
    color: "#fff",
  },
  residentColor9: {
    borderColor: "#c90024",
    backgroundColor: "#c90024",
    color: "#fff",
  },
  residentColor10: {
    borderColor: "#00ff9d",
    backgroundColor: "#00ff9d",
    color: "#000",
  },
  residentColor11: {
    borderColor: "#9afcfb",
    backgroundColor: "#9afcfb",
    color: "#000",
  },
  residentColor12: {
    borderColor: "#00694d",
    backgroundColor: "#00694d",
    color: "#fff",
  },

  scheduleWrapper: {
    width: "100%",
    marginVertical: 15,
    paddingHorizontal: 30,
  },
  schedule: {
    borderWidth: 2,
    borderColor: "#97CAEF",
    borderRadius: 5,
    height: 400,
  },

  scheduleHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#97CAEF",
  },
  scheduleDayOfWeek: {
    overflow: "hidden",
    borderRightWidth: 2,
    borderColor: "#97CAEF",
    height: 25,
    justifyContent: "center",
    margin: 0,
    width: 150,
  },
  scheduleDayOfWeekName: {
    textAlign: "center",
  },

  scheduleDayColumns: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
  },
  scheduleDayColumn: {
    width: 150,
    height: 371,
    borderRightWidth: 2,
    borderColor: "#97CAEF",
  },

  scheduleEvent: {
    position: "absolute",
    width: "97%",
    margin: 2,
    borderWidth: 3,
    borderRadius: 7,
    height: 25,
    backgroundColor: "#0000"
  },
  scheduleEventText: {
    paddingLeft: 2,
    position: "absolute",
    backgroundColor: "#0000",
  },
  scheduleEventBackground: {
    height: "100%",
    opacity: 0.7,
  },

  scheduleBackground: {
    position: "absolute",
    paddingVertical: 10,
    overflow: "hidden",
  },

  scheduleBackgroundRow: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderRadius: 1,
    borderColor: "#97CAEF",
    width: 1050,
    height: 93,
  },
  scheduleBackgroundTime: {
    backgroundColor: "#fff",
    color: "#97CAEF",
    top: -10,
    textAlign: "center",
    alignSelf: "flex-start",
    padding: 2,
    fontSize: 12,
  },

  duesTodaySchedule: {
    paddingHorizontal: 30,
  },

  scheduleButtons: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 20,
  },
});
