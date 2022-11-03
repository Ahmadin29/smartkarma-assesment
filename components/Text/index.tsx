import * as React from "react";
import { Text as TextNative } from "react-native";
import Colors from "../../constants/colors";
import { TextStyle } from "react-native";

interface TextProps {
  children :any,
  weight?  : 'regular' | 'bold' | 'thin' | 'medium' | 'semi',
  family?  : string,
  size?    : number,
  elipsis? : number,
  style?   : TextStyle[] | TextStyle,
  color?   : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',
  copy?    : boolean,
}

const Text = (props : TextProps) =>{
  let family = "poppins";
  let weight = "regular";

  if (props.family) {
    family = props.family;
  }

  if (props.weight) {
    weight = props.weight;
  }

  let font = family + "-" + weight;

  return (
    <TextNative
      {...props}
      numberOfLines={props.elipsis ? props.elipsis : 0}
      style={[
        props.style,
        {
          fontSize: props.size ? props.size : 14,
          fontFamily: font,
          color: props.color ? Colors[props.color] : Colors.text,
          marginBottom:-3.5,
        },
      ]}
      selectable={props.copy ? true : false}
    />
  );
}

export default Text;