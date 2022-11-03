import * as React from 'react';
import { ActivityIndicator, GestureResponderEvent, TouchableOpacity, View, ViewStyle } from "react-native";
import Colors from "../../constants/colors";
import Text from "../Text";

interface ButtonProps {
    rounded?     : 'small' | 'medium' | 'large' | 'x-large',
    onPress?     : (e:GestureResponderEvent)=>void,
    style?       : ViewStyle,
    color?       : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',
    textColor?   : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',
    bordered?    : boolean,
    label?       : string | any,
    size?        : 'small' | 'medium' | 'large' | 'x-large',
    block?       : boolean,
    icon?        : any,
    disabled?    : boolean,
    left?        : boolean,
    loading?     : boolean,
}

export default function Button (props:ButtonProps){

    const rounded = {
        small       : 5,
        medium      : 10,
        large       : 15,
        'x-large'   : 100,
    }

    const size = {
        small       : 12,
        medium      : 14,
        large       : 18,
        'x-large'   : 24,
    }

    const paddingSize = {
        small       : 5,
        medium      : 10,
        large       : 15,
        'x-large'   : 20,
    }

    const propsStyle:ViewStyle = {
        borderRadius        : props.rounded     ? rounded[props.rounded] : rounded['x-large'],
        backgroundColor     : props.disabled    ? Colors.grey1 : props.color       ? props.bordered ? 'transparent' : Colors[props.color] : props.bordered ? 'transparent' : Colors.primary,
        borderWidth         : props.bordered    ? 1.5 : 0,
        borderColor         : props.color       ? Colors[props.color] : Colors.primary,
        padding             : props.size        ? paddingSize[props.size] : 13,
        paddingHorizontal   : 30,
        flexDirection       : props.icon        ? 'row' : 'column',
        justifyContent      : props.left        ? props.icon ? "flex-start" : "center" : "center",
        alignItems          : props.left        ? props.icon ? "flex-start" : "flex-start" : "center"
    }

    const textColor = props.textColor ? props.textColor : props.bordered ? props.color ? props.color : 'primary' : 'white';

    const fontSize  = props.size && size[props.size];

    return(
        <View style={{
            flexDirection:props.block ? 'row' : 'column',
        }} >
            <TouchableOpacity
                {...props}
                style={[
                    props.style,
                    propsStyle,
                ]}
                onPress={props.onPress}
            >
                {
                    props.icon &&
                    <View style={{
                        marginRight:10,
                        marginTop:-2.5,
                    }} >
                        {props.icon}
                    </View>
                }
                {
                    !props.loading ?
                    <Text color={textColor} size={fontSize} weight="semi" >{props.label}</Text> :
                    <ActivityIndicator size={20} color={Colors.white} />
                }
            </TouchableOpacity>
        </View>
    )
}