import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeScreen: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
  },
  noPropertyHome: {
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "space-between"
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
    width: 350,
    height: 350,
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
});
