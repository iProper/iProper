import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  pinnedNoteTextInput: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#97CAEF",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 8,
    paddingHorizontal: 20,
    width: "100%",
  },
  noteButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  propertyHomeIcon: {
    width: 20,
    height: 20,
  },
  tenantText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 4,
    marginBottom: 4,
  },
  responsibility: {
    backgroundColor: "red",
  },
  QRcode: {
    width: 350,
    height: 350,
  },
});
