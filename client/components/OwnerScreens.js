import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  Linking,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/App.styles";
import { useMutation, useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { addProperty, getOwnerProperties } from "../queries/queries";
import { PropertyHome } from "./PropertyHome";
import ownerStyles from "../styles/OwnerScreens.styles";

const PropertyCard = ({ property }) => {
  return (
    <View style={[styles.card]}>
      <View style={[ownerStyles.propertyCard]}>
        <View style={[ownerStyles.propertyCardHeader]}>
          <Text style={ownerStyles.propertyCardAddress}>
            {property.address1}
          </Text>
          <Text style={ownerStyles.propertyCardTenantsNum}>
            {property.residents.length}/{property.numOfRooms}
          </Text>
        </View>
        <View style={[styles.separator, styles.separatorBlue]} />
        <View style={[ownerStyles.propertyCardMain]}>
          <View style={ownerStyles.propertyCardPaidBar}>
            <View
              style={[
                ownerStyles.propertyCardPaidBarProgress,
                {
                  height:
                    (property.residents.length / property.numOfRooms) * 100 +
                    "%",
                  opacity: property.residents.length / property.numOfRooms,
                },
              ]}
            ></View>
          </View>
          <View style={ownerStyles.propertyCardStatuses}>
            <View style={ownerStyles.propertyCardReportMsg}>
              <Text style={ownerStyles.propertyCardReportMsgText}>
                {property.report?.msg
                  ? `${property.report.sender} says: ${property.report.msg}`
                  : "Nothing happened..."}
              </Text>
            </View>
            <Text style={styles.lightText}>
              {property.residents.length
                ? property.residents.find((tenant) => tenant.isResponsible)
                    .name + " is responsible this week"
                : "Oh no, there are no tenants!"}
            </Text>
          </View>
          <View style={ownerStyles.propertyCardButtons}>
            <Pressable style={ownerStyles.propertyCardReportStatusBtn}>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "center",
                  color: "#ddd",
                  fontFamily: Platform.OS == "ios" ? "Courier" : "monospace",
                }}
              >
                i
              </Text>
            </Pressable>
            <Pressable style={ownerStyles.propertyCardChatBtn}>
              <Image
                style={ownerStyles.propertyCardChatBtn}
                source={require("../assets/chat-red.png")}
                resizeMode="center"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const Rule = ({ rule, index, setRule, deleteRule }) => {
  const [edit, setEdit] = useState(false);
  const [inputText, changeInputText] = useState(rule);

  const textInputRef = useRef();

  useEffect(() => {
    if (edit) {
      textInputRef.current.focus();
    }
  }, [edit]);

  return (
    <View style={[ownerStyles.rule]}>
      {edit ? (
        <TextInput
          ref={textInputRef}
          style={ownerStyles.ruleTextInput}
          onChangeText={changeInputText}
          value={inputText}
          placeholder="Enter rule..."
          onBlur={() => {
            if (edit) setRule(index, inputText);
            setEdit(false);
          }}
        />
      ) : (
        <Text style={ownerStyles.ruleText}>
          {index + 1}. {rule}
        </Text>
      )}
      <View style={ownerStyles.ruleButtons}>
        <Pressable
          style={ownerStyles.ruleEditBtn}
          onPress={() => {
            if (edit) setRule(index, inputText);
            setEdit(!edit);
          }}
        >
          {edit ? (
            <Image
              style={ownerStyles.ruleSaveIcon}
              source={require("../assets/tick-red.png")}
              resizeMode={"center"}
            />
          ) : (
            <Image
              style={ownerStyles.ruleEditIcon}
              source={require("../assets/pen-red.png")}
              resizeMode={"center"}
            />
          )}
        </Pressable>
        <Pressable
          style={ownerStyles.ruleDeleteBtn}
          onPress={() => deleteRule(index)}
        >
          <Image
            style={ownerStyles.ruleDeleteIcon}
            resizeMode={"center"}
            source={require("../assets/garbage-can-red.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export function OwnerDashboard({ navigation, userData, jwtToken }) {
  const [searchText, changeSearchText] = useState("");

  const { loading, error, data, refetch } = useQuery(getOwnerProperties, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refetch();
    });

    return unsubscribe;
  }, [navigation]);

  let properties = [];

  if (searchText)
    properties = data.getProperties.filter((property) => {
      return property.address1.toLowerCase().includes(searchText.toLowerCase());
    });
  else properties = data?.getProperties;

  return loading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={[styles.container, ownerStyles.ownerDashboard]}>
      <View style={ownerStyles.ownerDashboardHeader}>
        <Text style={styles.textH2}>Your Properties</Text>
        <View style={[styles.separator, styles.separatorBlue]} />
      </View>
      <View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/search.png")}
          resizeMode={"center"}
        />
        <TextInput
          onChangeText={changeSearchText}
          style={styles.searchTextInput}
          placeholder="Search property..."
          value={searchText}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[ownerStyles.ownerDashboardProperties]}
      >
        {properties?.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
        <View style={{ flex: 1, height: 150 }} />
      </ScrollView>

      <Pressable
        onPress={() => {
          navigation.navigate("PropertyHome", {
            title: "Property Home",
            //jwtToken,
          });
        }}
        style={[
          styles.button,
          styles.buttonBig,
          ownerStyles.PropertyHomeButton,
        ]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Property Home
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("AddProperty", {
            title: "Add new property",
            jwtToken,
          });
        }}
        style={[
          styles.button,
          styles.buttonBig,
          ownerStyles.addNewPropertyButton,
        ]}
      >
        <Text style={[styles.buttonText, styles.buttonTextBig]}>
          Add new property
        </Text>
      </Pressable>
    </View>
  );
}

export function AddProperty({ route, navigation }) {
  const { title, jwtToken } = route.params;
  const [submitProperty] = useMutation(addProperty);

  const [address1, changeAddress1] = useState("");
  const [address2, changeAddress2] = useState("");
  const [city, changeCity] = useState("");
  const [province, changeProvince] = useState("");
  const [postalCode, changePostalCode] = useState("");
  const [description, changeDescription] = useState("");

  /* const [cityMsg, setCityMsg] = useState("");
  const [provinceMsg, setProvinceNameMsg] = useState("");
  const [postalCodeMsg, setPostalCodeMsg] = useState("");
  const [streetNumMsg, setStreetNumMsg] = useState(""); */

  const [numOfRooms, setNumOfRooms] = useState(3);
  const pickerRef = useRef();

  const [rules, setRules] = useState([]);

  const submitPropertyForm = () => {
    submitProperty({
      context: {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      },
      variables: {
        address1,
        address2,
        city,
        province,
        postalCode,
        rules,
        description,
        numOfRooms,
      },
    })
      .then((result) => navigation.goBack())
      .catch((err) => console.log(err));
  };

  const addNewRule = () => {
    setRules((rules) => {
      let newRules = rules.map((r) => r);
      newRules.push("");
      return newRules;
    });
  };

  const setRule = (index, newRule) => {
    setRules((rules) => {
      let newRules = rules.map((r) => r);
      newRules[index] = newRule;
      return newRules;
    });
  };

  const deleteRule = (index) => {
    setRules((rules) => {
      return rules.filter((r, i) => i !== index);
    });
  };

  return (
    <View style={[styles.container, ownerStyles.addPropertyScreen]}>
      <View style={styles.navigationHeaderArea}>
        <View style={styles.navigationHeader}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.navigationHeaderArrow}>{"< "}</Text>
          </Pressable>
          <Text style={styles.navigationHeaderText}>{title}</Text>
        </View>
        <View style={[styles.separator, styles.separatorBlue]} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={ownerStyles.addPropertyScreenForm}
      >
        <View>
          <View style={styles.formBox}>
            <Text style={[styles.textH4, styles.formLabel]}>
              Address Line 1
            </Text>
            <TextInput
              onChangeText={changeAddress1}
              style={styles.formInput}
              value={address1}
              autoCompleteType="street-address"
            />
            <Text style={styles.alarmText}>{}</Text>
          </View>

          <View style={styles.formBox}>
            <Text style={[styles.textH4, styles.formLabel]}>
              Address Line 2
            </Text>
            <TextInput
              onChangeText={changeAddress2}
              style={styles.formInput}
              value={address2}
            />
            <Text style={styles.alarmText}>{}</Text>
          </View>

          <View style={[styles.formBox]}>
            <Text style={[styles.textH4, styles.formLabel]}>City</Text>
            <TextInput
              onChangeText={changeCity}
              style={styles.formInput}
              value={city}
            />
            <Text style={styles.alarmText}>{}</Text>
          </View>

          <View style={styles.formRowContainer}>
            <View style={[styles.formBox, styles.formBoxSize1]}>
              <Text style={[styles.textH4, styles.formLabel]}>Province</Text>
              <TextInput
                onChangeText={changeProvince}
                style={styles.formInput}
                value={province}
              />
              <Text style={styles.alarmText}>{}</Text>
            </View>

            <View style={styles.formRowSpace} />

            <View style={[styles.formBox, styles.formBoxSize1]}>
              <Text style={[styles.textH4, styles.formLabel]}>Postal Code</Text>
              <TextInput
                onChangeText={changePostalCode}
                style={styles.formInput}
                value={postalCode}
              />
              <Text style={styles.alarmText}>{}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.chooseNumOfRoomsArea}>
          <Text style={[ownerStyles.chooseNumOfRooms, styles.textH3]}>
            Number of rooms
          </Text>
          <Pressable
            onPress={() => {
              pickerRef.current.focus();
            }}
            style={styles.formPicker}
          >
            <Text style={[styles.formPickerValue]}>{numOfRooms}</Text>
            <Picker
              ref={pickerRef}
              style={styles.formPickerButton}
              selectedValue={numOfRooms}
              onValueChange={(itemValue) => {
                setNumOfRooms(itemValue);
              }}
            >
              {(() => {
                let items = [];
                for (let i = 1; i < 13; i++)
                  items.push(<Picker.Item value={i} label={`${i}`} key={i} />);
                return items;
              })()}
            </Picker>
          </Pressable>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.rulesList}>
          <Text style={[styles.textH3, ownerStyles.rulesListHeader]}>
            Rules
          </Text>
          {rules.map((rule, index) => {
            return (
              <Rule
                key={index}
                rule={rule}
                index={index}
                setRule={setRule}
                deleteRule={deleteRule}
              />
            );
          })}
          <Pressable
            onPress={() => {
              addNewRule();
            }}
            style={[
              styles.button,
              styles.buttonRound,
              ownerStyles.addNewRuleBtn,
            ]}
          >
            <Text style={styles.buttonText}>Add new rule</Text>
          </Pressable>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.editPropertyDesc}>
          <Text style={styles.textH3}>Description</Text>

          <TextInput
            onChangeText={changeDescription}
            style={ownerStyles.descTextInput}
            placeholder="Enter description"
            value={description}
            multiline={true}
          />
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={ownerStyles.uploadPropertyDocumentArea}>
          <Text style={[styles.textH3, { textAlign: "center" }]}>
            Please, provide evidence of rental property ownership
          </Text>
          <Text
            style={[styles.lightText]}
            onPress={() =>
              Linking.openURL(
                "https://www.ontario.ca/page/register-land-documents-electronically"
              )
            }
          >
            Check viable proof of ownership.
          </Text>
          <View style={[styles.flexRow, { margin: 10 }]}>
            <Pressable
              onPress={() => {}}
              style={[styles.button, styles.flexSize1]}
            >
              <Text style={styles.buttonText}>Upload document</Text>
            </Pressable>
            <Text
              style={[styles.textH4, styles.flexSize1, { textAlign: "center" }]}
            >
              No document
            </Text>
          </View>

          <View style={[styles.separator, styles.separatorBlue]} />
        </View>

        <Pressable
          onPress={() => submitPropertyForm()}
          style={[styles.button, styles.buttonBig]}
        >
          <Text style={[styles.buttonText, styles.buttonTextBig]}>
            Add new property
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
/* if (!postalCode) {
        setPostalCodeMsg("Address required.");
      } else if (/d{1,5}\s\w.\s(\b\w*\b\s){1,2}\w*\./.test(postalCode)) {
        setPostalCodeMsg("Address should only contain Letters and Numbers.");
      } else if (!/^[A-Za-z]{7}$/.test(postalCode)) {
        setPostalCodeMsg("First name should be 7 letters long.");
      } else {
        setPostalCodeMsg("");
        accept++;
      }

      if (!num) {
        setstreetNumMsg("Address required.");
      } else if (/^[0-9]*$/.test(num)) {
        setstreetNumMsg("Street Number should only contain Numbers.");
      } else if (!/^[0-9]{7}$/.test(num)) {
        setstreetNumMsg("Street Number should be 7 Nubmbers long.");
      } else {
        setstreetNumMsg("");
        accept++;
      }

      if (!city) {
        setCityMsg("City name required.");
      } else if (!/^[A-Za-z]+$/.test(city)) {
        setCityMsg("City should only have letters");
      } else if (!/^[A-Za-z]{2,50}$/.test(city)) {
        setCityMsg("City should be from 2 to 50 letters long.");
      } else {
        setCityMsg("");
        accept++;
      }

      if (!province) {
        setProvinceNameMsg("Province name required.");
      } else if (!/^[A-Za-z]+$/.test(province)) {
        setProvinceNameMsg("City should only have letters");
      } else if (!/^[A-Za-z]{2,50}$/.test(province)) {
        setProvinceNameMsg("Province should be from 2 to 50 letters long.");
      } else {
        setProvinceNameMsg("");
        accept++;
      }
 */
