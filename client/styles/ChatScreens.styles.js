import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 3,
    borderColor: "#97CAEF",
    borderRadius: 60,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "#fff",

    shadowRadius: 5,
  },
  chatRoomName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  //Chat Room
  CT_Body: {
    flex: 1,

    padding: 20,
    borderColor: "#97CAEF",
    
    shadowRadius: 5,
  },
  CT_TextInput: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "#97CAEF",
    borderRadius: 50,
    shadowRadius: 5,
    
    borderWidth: 2,
    fontSize: 15,
  },
  messageArea: {
    width: "90%",
  },
  messageHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  messageBody: {
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#97CAEF",
    borderRadius: 8,
    marginVertical: 3,
    marginRight: 0,
    backgroundColor: "#fff",
  },
  firstMessage: {
    borderTopLeftRadius: 0,
  },
  YouBody: {
    padding: 10,
    borderWidth: 3,
    width: 250,
    borderColor: "#97CAEF",
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: 50,
    backgroundColor: "#fff",
    backgroundColor: "lightblue",
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  chatArea: {
    width: "100%",
  },
  Right: {
    borderTopRightRadius: 0,
  },
});
