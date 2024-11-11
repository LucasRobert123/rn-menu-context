import React, { useRef } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Menu, MenuHandles } from "./src/components/Menu";
import { ButtonMenu } from "./src/components/ButtonMenu";

export default function App() {
  return (
    <FlatList
      data={Array.from({ length: 10 })}
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => <ButtonMenu />}
      scrollEventThrottle={16}
    />
  );
}
