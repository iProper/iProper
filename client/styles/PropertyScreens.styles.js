import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "top",
  },
  
  buttons: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#FC4445",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
  },

  buttonsReport: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#FC4445",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 1,
  },

  buttonTextProperty: {
    color: "#fff",
    fontSize: 18,
  },
  buttonOffTextProperty: {
    color: "#FC4445",
    fontSize: 18,
  },

  renterHomeHeader: {
    alignItems: "center",
    width: "100%",
    padding: 5,
  },

  dueTodayHeader: {
    alignItems: "center",
    width: "100%",
    padding: 5,
    marginTop: 8,
  },

  renterDueToday: {
    alignItems: "center",
    width: "100%",
    padding: 145,
  },

  payRentButton: {
    width: "50%",
    marginLeft: -10,
  },

  reportIssueButton: {
    width: "50%",
    marginLeft: 10,
  },

  reportCompletionButton: {
    width: "65%",
    marginLeft: 110,
    marginTop: 8,
  },

  rectangleContainer: {
    width: "100%",
    marginTop: 5,
  },

  bottomContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },

  bottomRectangle: {
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: "#97CAEF",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 1,
    padding: 10,
    
  },
  
  renterHomeHeaderButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 25, 
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