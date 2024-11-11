import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ContextMenuProps = {
  visible: boolean;
  options: { label: string; onPress: () => void }[];
  onClose: () => void;
  position: { x: number; y: number };
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  visible,
  options,
  onClose,
  position,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View
          style={[styles.menu, { top: position.y, left: position.x - 150 }]}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                option.onPress();
                onClose();
              }}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    padding: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default ContextMenu;
