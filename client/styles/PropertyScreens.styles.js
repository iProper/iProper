import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeContainer: {
    padding: 30,
    alignItems: "center",
    justifyContent: "top",
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
  }
})