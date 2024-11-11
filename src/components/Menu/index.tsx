import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Separator from "./Separator";
import Item from "./Item";

import styles, { WIDTH_MENU } from "./styles";

export type MenuHandles = {
  show: () => void;
  hide: () => void;
};
interface MenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

const STATES = {
  HIDDEN: "HIDDEN",
  ANIMATING: "ANIMATING",
  SHOWN: "SHOWN",
};
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;
const ANIMATION_DURATION = 50;

export const Menu = forwardRef((props: MenuProps, ref) => {
  const container = useRef<View>();
  const innerRef = useRef<View>();

  const [state, setState] = useState({
    menuState: STATES.HIDDEN,

    top: 0,
    left: 0,

    menuWidth: 0,
    menuHeight: 0,

    buttonWidth: 0,
    buttonHeight: 0,
  });

  const menuSizeXAnimation = useSharedValue(0);
  const menuSizeYAnimation = useSharedValue(0);
  const opacityAnimation = useSharedValue(0);

  const menuSize = useAnimatedStyle(() => {
    return {
      width: menuSizeXAnimation.value,
      height: menuSizeYAnimation.value,
    };
  });
  const menuContainerShadowStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimation.value,
    };
  }, [state]);

  const dimensions = Dimensions.get("window");
  const { width: windowWidth } = dimensions;
  const windowHeight = dimensions.height - (StatusBar.currentHeight || 0);
  const { menuWidth, menuHeight, buttonWidth, buttonHeight } = state;

  let { left, top } = state;

  const transforms = [];

  if (left + menuWidth > windowWidth - SCREEN_INDENT) {
    transforms.push({
      translateX: menuSizeXAnimation.value * -1,
    });

    left = Math.min(windowWidth - SCREEN_INDENT, left + buttonWidth);
  } else if (left < SCREEN_INDENT) {
    left = SCREEN_INDENT;
  }

  if (top > windowHeight - menuHeight - SCREEN_INDENT) {
    transforms.push({
      translateY: menuSizeYAnimation.value * -1,
    });

    top = windowHeight - SCREEN_INDENT;
    top = Math.min(windowHeight - SCREEN_INDENT, top + buttonHeight);
  } else if (top < SCREEN_INDENT) {
    top = SCREEN_INDENT;
  }

  const extraStyles = {
    transform: transforms,
    top,
    left,
  };

  const { menuState } = state;
  const animationStarted = menuState === STATES.ANIMATING;
  const modalVisible = menuState === STATES.SHOWN || animationStarted;

  useEffect(() => {
    if (menuState === STATES.ANIMATING) {
      menuSizeXAnimation.value = withTiming(state.menuWidth, {
        duration: ANIMATION_DURATION * 2,
        easing: EASING,
      });
      menuSizeYAnimation.value = withTiming(state.menuHeight, {
        duration: ANIMATION_DURATION,
        easing: EASING,
      });
      opacityAnimation.value = withTiming(1, {
        duration: ANIMATION_DURATION + 25,
        easing: EASING,
      });
    }
  }, [state]);

  const hide = () => {
    opacityAnimation.value = withTiming(0, {
      duration: ANIMATION_DURATION,
      easing: EASING,
    });

    setTimeout(() => {
      setState((state) => {
        return {
          ...state,
          menuState: STATES.HIDDEN,
        };
      });

      menuSizeXAnimation.value = 0;
      menuSizeYAnimation.value = 0;
      opacityAnimation.value = 0;
    }, ANIMATION_DURATION);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        show: () => {
          container.current?.measureInWindow(
            (left, top, buttonWidth, buttonHeight) => {
              setState((state) => {
                return {
                  ...state,
                  buttonHeight,
                  buttonWidth,
                  left: left - WIDTH_MENU - buttonWidth,
                  menuState: STATES.SHOWN,
                  top,
                };
              });
            }
          );
        },

        hide: hide,
      };
    },
    [hide, container, WIDTH_MENU]
  );

  const onLayout = (e: LayoutChangeEvent) => {
    if (state.menuState === STATES.ANIMATING) {
      return;
    }

    const { width, height } = e.nativeEvent.layout;

    setState((state) => {
      return {
        ...state,
        menuState: STATES.ANIMATING,
        menuWidth: width,
        menuHeight: height,
      };
    });
  };

  return (
    <View ref={container} collapsable={false}>
      <View>{props.button}</View>
      <Modal visible={modalVisible} onRequestClose={hide} transparent>
        <TouchableWithoutFeedback onPress={hide} accessible={false}>
          <View style={[styles.menuBackdrop]}>
            <Animated.View
              onLayout={onLayout}
              style={[
                styles.menuContainerShadow,
                menuContainerShadowStyle,
                extraStyles,
              ]}
            >
              <Animated.View
                style={[styles.menuContainer, animationStarted && menuSize]}
              >
                {props.children}
              </Animated.View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
});

Menu.Item = Item;
Menu.Separator = Separator;
