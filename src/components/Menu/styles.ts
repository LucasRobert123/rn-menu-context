import { Platform, StyleSheet } from "react-native";

export const WIDTH_MENU = 160;

export default StyleSheet.create({
  menuContainerShadow: {
    width: WIDTH_MENU,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 2,
    opacity: 0,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0.3 * 5, height: 0.5 * 5 },
        shadowOpacity: 0.2,
        shadowRadius: 0.7 * 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  menuBackdrop: StyleSheet.absoluteFill,
  menuContainer: {
    overflow: "hidden",
    backgroundColor: "green",
  },
  divider: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
    marginHorizontal: 20,
  },
  item: {
    height: 48,
    justifyContent: "center",
    maxWidth: 248,
    minWidth: 124,
  },
  title: {
    fontSize: 14,
    paddingHorizontal: 20,
    textAlign: "left",
  },
});
