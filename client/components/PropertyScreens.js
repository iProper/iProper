import {
  Text,
  View,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Picker } from "@react-native-picker/picker";
import { getPropertyById, updateProperty } from "../queries/queries";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "../styles/App.styles";
import ownerStyles from "../styles/OwnerScreens.styles";
import propertyStyles from "../styles/PropertyScreens.styles";

const Tabs = createBottomTabNavigator();

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

export const AddHome = (props) => {
  return (
    <View style={[styles.container, propertyStyles.homeContainer]}>
       <View style={propertyStyles.renterHomeHeader}>
       <Text style={styles.textH2}> Home </Text>
       <View style={[styles.separatorLine, styles.separatorBlue]}>
      </View>
       </View>

       <View style={propertyStyles.rectangleContainerMiddle}>
        <Pressable style={[propertyStyles.window, styles.buttonOff, propertyStyles.rectangleContainer]}>
       

      <View style={propertyStyles.middleHeader}>
            <Text style={[styles.textH3]}>You have not been added yet to your new home</Text>
          </View>

          <View style={propertyStyles.centerHeader}>
            <Text style={[styles.textH4]}>Enter property code to be added to the property(ask property owner)</Text>
          </View>

          <View style={[propertyStyles.centerseparatorLine, styles.separatorBlue]}>
          </View>

          <View style={propertyStyles.codeText}>
            <Text style={[styles.textH4]}>Code</Text>
          </View>

          <Pressable style={[propertyStyles.Passbuttons, styles.buttonOff]}>
            <Text style={[propertyStyles.buttonTextProperty, propertyStyles.passOffTextProperty]}>Password</Text>
          </Pressable>

          <Pressable style={[propertyStyles.adds]}>
            <Text style={[propertyStyles.buttonTextAdds]}>Add me to the property</Text>
          </Pressable>

          <View style = {propertyStyles.fd}>
          <View style={[propertyStyles.firstseparatorLine, styles.separatorBlue]}>

          <View style={propertyStyles.codeText}>
            <Text style={[styles.textH4]}>Or</Text>
          </View>

          <View style={[propertyStyles.secondseparatorLine, styles.separatorBlue]}>
          </View>

          </View>

        </View>

        <Pressable style={[propertyStyles.adds]}>
            <Text style={[propertyStyles.buttonTextAdds]}>Scan QR code</Text>
          </Pressable>
          </Pressable>
      </View>
    </View>
  );
};

export const Home = (props) => {
  return (
    <View style={[styles.container, propertyStyles.homeContainer]}>
      <View style={propertyStyles.renterHomeHeader}>
        <Text style={styles.textH2}> Home </Text>
        <View style={propertyStyles.renterHomeHeaderButtons}>
          <Pressable style={[propertyStyles.buttons, propertyStyles.payRentButton]}>
            <Text style={[propertyStyles.buttonTextProperty]}>Pay rent</Text>
          </Pressable>
          <Pressable style={[propertyStyles.buttons, styles.buttonOff, propertyStyles.reportIssueButton]}>
            <Text style={[propertyStyles.buttonTextProperty, propertyStyles.buttonOffTextProperty]}>Report issue</Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.separatorLine, styles.separatorBlue]}>
      </View>

      <View style={propertyStyles.dueTodayHeader}>
        <Text style={styles.textH2}>Due Today</Text>
      </View>

      <View style={propertyStyles.rectangleContainer}>
        <Pressable style={[styles.rectangle, styles.buttonOff, propertyStyles.rectangleContainer]}>
          <View style={styles.textStuff}>
            <Text style={[styles.textH4]}>Do This and also that and those stuff</Text>
          </View>

          <View style={[styles.separatorLine2, styles.separatorBlue]}>
          </View>

          <Pressable style={[propertyStyles.buttonsReport, propertyStyles.reportCompletionButton, propertyStyles]}>
            <Text style={[propertyStyles.buttonTextProperty]}>Report Completion</Text>
          </Pressable>

        </Pressable>
      </View>

      <View style={propertyStyles.bottomContainer}>
        <Pressable style={[propertyStyles.bottomRectangle, styles.buttonOff, propertyStyles.bottomContainer]}>
        <View style={[propertyStyles.separatorVert, styles.separatorBlue]}>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export function AboutScreen({
  navigation,
  property,
  route,
  userData,
  jwtToken,
}) {
  const [submitUpdatedProperty] = useMutation(updateProperty);
  const [edit, setEdit] = useState(false);

  const [address1, changeAddress1] = useState(property.address1);
  const [address2, changeAddress2] = useState(property.address2 || "");
  const [city, changeCity] = useState(property.city);
  const [province, changeProvince] = useState(property.province);
  const [postalCode, changePostalCode] = useState(property.postalCode);
  const [description, changeDescription] = useState(property.description || "");

  const [numOfRooms, setNumOfRooms] = useState(property.numOfRooms);
  const pickerRef = useRef();

  const [rules, setRules] = useState(property.rules);

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

  useEffect(() => {
    if (!edit) {
      submitUpdatedProperty({
        context: {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        },
        variables: {
          id: property.id,
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
        .then((result) => { })
        .catch((err) => console.log(err));
    }
  }, [edit]);

  return (
    <View style={[styles.container, propertyStyles.propertyAboutScreen]}>
      <View style={styles.navigationHeaderArea}>
        <View style={styles.navigationHeader}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.navigationHeaderArrow}>{"< "}</Text>
          </Pressable>
          <Text style={styles.navigationHeaderText}>About</Text>
          <Pressable
            style={propertyStyles.aboutEditBtn}
            onPress={() => {
              setEdit(!edit);
            }}
          >
            {edit ? (
              <Image
                style={propertyStyles.aboutEditIcon}
                source={require("../assets/tick-red.png")}
                resizeMode={"center"}
              />
            ) : (
              <Image
                style={propertyStyles.aboutEditIcon}
                source={require("../assets/pen-red.png")}
                resizeMode={"center"}
              />
            )}
          </Pressable>
        </View>
        <View style={[styles.separator, styles.separatorBlue]} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={propertyStyles.generalInfo}>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Owner:</Text>
            <Text style={styles.textH4}>
              {userData.firstName} {userData.lastName}
            </Text>
          </View>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={propertyStyles.propertyInfo}>
          <Text style={[styles.textH3, { textAlign: "center" }]}>
            Property Information
          </Text>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Address 1:</Text>
            {!edit ? (
              <Text style={styles.textH4}>{address1}</Text>
            ) : (
              <TextInput
                onChangeText={changeAddress1}
                style={propertyStyles.editAboutInput}
                value={address1}
              />
            )}
          </View>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Address 2:</Text>
            {!edit ? (
              <Text style={styles.textH4}>{address2 || "~"}</Text>
            ) : (
              <TextInput
                onChangeText={changeAddress2}
                style={propertyStyles.editAboutInput}
                value={address2}
              />
            )}
          </View>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>City:</Text>
            {!edit ? (
              <Text style={styles.textH4}>{city}</Text>
            ) : (
              <TextInput
                onChangeText={changeCity}
                style={propertyStyles.editAboutInput}
                value={city}
              />
            )}
          </View>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Province:</Text>
            {!edit ? (
              <Text style={styles.textH4}>{province}</Text>
            ) : (
              <TextInput
                onChangeText={changeProvince}
                style={propertyStyles.editAboutInput}
                value={province}
              />
            )}
          </View>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Postal Code:</Text>
            {!edit ? (
              <Text style={styles.textH4}>{postalCode}</Text>
            ) : (
              <TextInput
                onChangeText={changePostalCode}
                style={propertyStyles.editAboutInput}
                value={postalCode}
              />
            )}
          </View>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Rooms:</Text>
            {!edit ? (
              <Text style={styles.textH4}>
                {property.residents.length}/{numOfRooms}
              </Text>
            ) : (
              <Pressable
                onPress={() => {
                  pickerRef.current.focus();
                }}
                style={[styles.formPicker, propertyStyles.numOfRoomsPicker]}
              >
                <Text style={[styles.textH4]}>{numOfRooms}</Text>
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
                      items.push(
                        <Picker.Item value={i} label={`${i}`} key={i} />
                      );
                    return items;
                  })()}
                </Picker>
              </Pressable>
            )}
          </View>
        </View>

        <View style={[styles.separator, styles.separatorBlue]} />

        <View style={propertyStyles.contactInfo}>
          <Text style={[styles.textH3, { textAlign: "center" }]}>
            Contact Information
          </Text>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Phone:</Text>
            <Text style={styles.textH4}>{userData.phoneNumber}</Text>
          </View>
          <View style={[styles.flexRow, propertyStyles.infoField]}>
            <Text style={styles.textH4}>Email:</Text>
            <Text style={styles.textH4}>{userData.email}</Text>
          </View>
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
            style={edit ? ownerStyles.descTextInput : propertyStyles.descText}
            placeholder="Enter description..."
            value={description}
            multiline={true}
            editable={edit}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export function PropertyTabs({ navigation, route, userData, jwtToken }) {
  let propertyId = 0;
  if (userData.isOwner === "true") {
    propertyId = route.params.id;
  }

  const { loading, error, data } = useQuery(getPropertyById, {
    context: {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    },
    variables: {
      id: propertyId,
    },
  });

  let property = data?.getProperty || null;

  return loading ? (
    <Tabs.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Tabs.Screen name="loading">
        {(props) => (
          <View {...props}>
            <Text>Loading...</Text>
          </View>
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  ) : (
    <Tabs.Navigator screenOptions={{ headerShown: false, animation: "none" }}>
      <Tabs.Screen name="Add Home">
        {(props) => (
          <AddHome
            {...props}
            property={property}
            jwtToken={jwtToken}
            userData={userData}
          />
        )}
      </Tabs.Screen>

      <Tabs.Screen name="About">
        {(props) => (
          <AboutScreen
            {...props}
            property={data?.getProperty}
            jwtToken={jwtToken}
            userData={userData}
          />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
