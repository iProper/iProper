import { Text, View, Pressable, TextInput, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";

import ownerStyles from "../../styles/OwnerScreens.styles";

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
          placeholder='Enter rule...'
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
              source={require("../../assets/tick-red.png")}
              resizeMode={"center"}
            />
          ) : (
            <Image
              style={ownerStyles.ruleEditIcon}
              source={require("../../assets/pen-red.png")}
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
            source={require("../../assets/garbage-can-red.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Rule;
