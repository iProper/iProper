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
    fontSize: 14,
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
  separator20: {
    width: "20%",
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
  buttonTextBlue: {
    color: "#97CAEF",
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
  buttonRound: {
    borderRadius: 50,
  },
  buttonBlue: {
    backgroundColor: "#97CAEF",
    borderColor: "#97CAEF",
  },

  formBox: {
    alignItems: "flex-start",
  },
  formRowContainer: {
    flexDirection: "row",
  },
  formRowSpace: {
    width: 10,
  },
  formBoxSize1: {
    flex: 1,
  },
  formBoxSize2: {
    flex: 2,
  },
  formBoxSize3: {
    flex: 3,
  },
  formBoxSize4: {
    flex: 4,
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
  formPicker: {
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: "solid",
    width: 70,
    height: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    alignItems: "center",
    position: "relative",
  },
  formPickerValue: {
    fontSize: 20,
  },

  flexSize1: {
    flex: 1,
  },
  flexSize2: {
    flex: 2,
  },

  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },

  searchContainer: {
    backgroundColor: "#eee",
    borderRadius: 5,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchIcon: {
    width: 18,
    height: 18,
    margin: 5,
    opacity: 0.5,
  },
  searchTextInput: {
    fontSize: 18,
  },

  logo: {
    width: "100%",
    height: "90%",
  },

  iconS: {
    width: 25,
    height: 25,
  },
  iconM: {
    width: 32,
    height: 32,
  },
  iconL: {
    width: 48,
    height: 48,
  },

  card: {
    padding: 10,
    borderWidth: 4,
    borderColor: "#97CAEF",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",

    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 10,
  },

  App: {
    height: "100%",
    backgroundColor: "#fff",
  },

  navigationHeader: {
    height: 40,
    width: "100%",
    marginBottom: 20,
  },
  navigationHeaderBackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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

  sideMenuDrawer: {
    height: "100%",
    flex: 1,
  },
  sideMenu: {
    height: "100%",
    backgroundColor: "#97CAEF",
    flex: 1,
  },
  sideMenuHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20,
    borderRadius: 10,
  },
  sideMenuLogo: {
    width: "80%",
    height: 80,
  },
  sideMenuWelcomeMessage: {
    marginVertical: 10,
    fontSize: 20,
  },
  sideMenuItem: {
    borderBottomWidth: 1,
    borderColor: "#97CAEF",
  },
});
