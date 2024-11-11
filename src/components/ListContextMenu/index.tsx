import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";

import ContextMenu from "./ContextMenu";

type Item = {
  id: string;
  label: string;
};

const items: Item[] = [
  { id: "1", label: "Item 1" },
  { id: "2", label: "Item 2" },
  { id: "3", label: "Item 3" },
  { id: "4", label: "Item 4" },
  { id: "5", label: "Item 5" },
  { id: "6", label: "Item 6" },
  { id: "7", label: "Item 7" },
  { id: "8", label: "Item 8" },
  { id: "9", label: "Item 9" },
];

export const ListContextMenu = () => {
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const buttonRefs = useRef<Record<string, any>>({});

  const openContextMenu = (item: Item, buttonId: string) => {
    setSelectedItem(item);

    const button = buttonRefs.current[buttonId];
    button?.measure(
      (
        fx: number,
        fy: number,
        width: number,
        height: number,
        px: number,
        py: number
      ) => {
        const windowHeight = Dimensions.get("window").height;
        const spaceBelow = windowHeight - (py + height);
        const spaceAbove = py;

        if (spaceBelow < 100 && spaceAbove > 100) {
          setMenuPosition({ x: px, y: py - 100 });
        } else {
          setMenuPosition({ x: px, y: py + height });
        }

        setContextMenuVisible(true);
      }
    );
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
    setSelectedItem(null);
  };

  const handleOptionPress = (optionLabel: string) => {
    Alert.alert(
      `Opção selecionada: ${optionLabel} para ${selectedItem?.label}`
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: 60,
    offset: 60 * index,
    index,
  });

  const renderItem = ({ item }: { item: Item }) => {
    const buttonId = `button-${item.id}`;

    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.label}</Text>
        <TouchableOpacity
          ref={(ref) => (buttonRefs.current[buttonId] = ref)}
          style={styles.optionsButton}
          onPress={() => openContextMenu(item, buttonId)}
        >
          <Text style={styles.optionsButtonText}>Opções</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <ContextMenu
        visible={contextMenuVisible}
        onClose={closeContextMenu}
        options={[
          { label: "Editar", onPress: () => handleOptionPress("Editar") },
          { label: "Excluir", onPress: () => handleOptionPress("Excluir") },
        ]}
        position={menuPosition}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 200,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 16,
  },
  optionsButton: {
    padding: 8,
    backgroundColor: "#007BFF",
    borderRadius: 4,
  },
  optionsButtonText: {
    color: "#fff",
  },
});
