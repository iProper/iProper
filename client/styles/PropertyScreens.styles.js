import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeContainer: {
    padding: 30,
    alignItems: "center"
  },

  renterHomeHeader: {
    alignItems: "center",
    width: "100%",
    padding: 15,
  },

  renterDueToday: {
    alignItems: "center",
    width: "100%",
    padding: 145,
  },

  reportCompletionButton: {
    flexDirection: "row",
    width: "100%",
  },

  renterHomeHeaderButtons: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
  tenantsList: {
    width: "104%",
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
