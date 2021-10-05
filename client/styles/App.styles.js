import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerAlignCenterTop: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textH1: {
    fontSize: 30,
  },
  textH2: {
    fontSize: 25,
  },
  textH3: {
    fontSize: 20,
  },
  textH4: {
    fontSize: 15,
  },
  lightText: {
    color: "#97CAEF",
    fontWeight: "500",
    fontSize: 16,
    marginVertical: 5,
  },
  alarmText: {
    color: "#FC4445",
    fontSize: 12,
    marginLeft: 15,
  },
  separator: {
    width: "100%",
    height: 2,
    marginVertical: 5,
    backgroundColor: "#aaa",
  },
  separatorVertical: {
    height: "60%",
    width: 2,
  },
  separatorRed: {
    backgroundColor: "#FC4445",
  },
  separatorBlue: {
    backgroundColor: "#97CAEF",
  },
  separator60: {
    width: "60%",
  },
  button: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FC4445",
    backgroundColor: "#FC4445",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
  buttonOffText: {
    color: "#FC4445",
    fontSize: 15,
  },
  buttonOff: {
    backgroundColor: "#fff",
  },
  buttonBig: {
    padding: 10,
  },
  buttonTextBig: {
    fontSize: 25,
  },

  formBox: {
    alignItems: "flex-start",
  },

  formLabel: {
    paddingLeft: 10,
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

  logo: {
    width: "100%",
    height: "90%",
  },

  App: {
    height: "100%",
    backgroundColor: "#fff",
    marginTop: 25,
  },

  navigationHeaderArea: {
    marginBottom: 15,
  },
  navigationHeader: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  navigationHeaderArrow: {
    color: "#97CAEF",
    fontSize: 35,
  },
  navigationHeaderText: {
    fontSize: 25,
  },

  loadingView: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 50,
    height: 50,
    transform: [{ rotate: "50deg" }],
  },
  loadingText: {
    fontSize: 18,
  },

  homeScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
});
