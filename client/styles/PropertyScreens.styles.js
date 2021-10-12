import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "top",
  },

  separatorVert: {
    width: "100%",
    height: 15,
    width: 1,
    marginVertical: 1,
    backgroundColor: "#aaa",
    marginTop: 5,
    marginRight: 290,
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

  Passbuttons: {
    width: "75%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#C0C0C0",
    backgroundColor: "#C0C0C0",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    marginLeft: 10,
  },

  passOffTextProperty: {
    color: "#C0C0C0",
    fontSize: 14,
    marginLeft: 5,
  },

  fd: {
    justifyContent: "center",
  },

  adds: {
    width: "75%",
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#FC4445",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    padding: 6,
    marginTop: 10,
    marginLeft: 10,
  },

  buttonTextAdds: {
    color: "#fff",
    fontSize: 16,
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

  rectangleContainerMiddle: {
    width: "100%",
    marginTop: 120,
  },

  windowContainer: {
    width: "100%",
    marginTop: 5,
  },

  window: {
    borderStyle: "solid",
    borderWidth: 4,
    borderColor: "#97CAEF",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 1,
    padding: 15,
    paddingTop: 140,
  },

  middleHeader: {
    textAlign: 'center',
  },

  centerHeader: {
    textAlign: 'center',
    marginTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },

  centerseparatorLine: {
    width: "65%",
    height: 2,
    marginVertical: 1,
    backgroundColor: "#aaa",
    marginTop: 15,
  },

  firstseparatorLine: {
    width: "30%",
    height: 2,
    backgroundColor: "#aaa",
    marginTop: 25,
    marginLeft: -120,
  },

  secondseparatorLine: {
    width: "30%",
    height: 2,
    backgroundColor: "#aaa",
    marginTop: 25,
    marginRight: 40,
  },

  codeText: {
    marginRight: 210,
    marginTop: 12,
  },

  bottomContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },

  bottomRectangle: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#97CAEF",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 4,
    padding: 15,
    marginTop: 300,
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