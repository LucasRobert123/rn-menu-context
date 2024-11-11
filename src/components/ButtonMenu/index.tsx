import { useRef } from "react";
import { Menu, MenuHandles } from "../Menu";
import { TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export const ButtonMenu = () => {
  const menuRef = useRef<MenuHandles>();

  const handleHideMenu = () => {
    menuRef.current?.hide();
  };

  const handleShowMenu = () => {
    menuRef.current?.show();
  };
  return (
    <View
      style={{
        padding: 16,
        width: "100%",
        height: 200,
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "red",
        marginBottom: 16,
      }}
    >
      <Menu
        ref={menuRef}
        button={
          <TouchableOpacity onPress={() => handleShowMenu()}>
            <FontAwesome5 name="ellipsis-v" size={24} color="black" />
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={() => handleHideMenu()}>Editar produto</Menu.Item>
        <Menu.Separator />
        <Menu.Item onPress={() => handleHideMenu()}>Alterar valor</Menu.Item>
        <Menu.Separator />
        <Menu.Item onPress={() => handleHideMenu()}>
          Histórico de valor
        </Menu.Item>
      </Menu>
    </View>
  );
};
