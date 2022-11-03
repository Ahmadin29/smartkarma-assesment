import * as React from 'react';
import { KeyboardTypeOptions, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import Text from "../Text";
import Colors from "../../constants/colors";

interface InputProps {
    containerStyle? : ViewStyle,
    inputStyle?     : ViewStyle,
    labelStyle?     : TextStyle,
    messageStyle?    : TextStyle,
    
    label?          : string,
    message?        : string,
    value?          : string,
    icon?           : any,
    placeholder?     : string,
    color?          : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',

    onChangeText?    : (e:any)=>void,
    disabled?        : boolean,
    keyboardType?    : KeyboardTypeOptions
}

export default function Input(props:InputProps) {

    return(
        <View style={[
            props.containerStyle
        ]} >
            <Text style={[props.labelStyle,{}]} weight="medium" color={props.color ? props.color : "text"} size={10} >{props.label}</Text>
            <TextInput
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                style={[
                    props.inputStyle,
                    {
                        borderBottomWidth:1,
                        borderBottomColor:props.color ? Colors[props.color] : Colors.grey1,
                        paddingBottom:5,
                        fontFamily:'poppins-regular',
                        color:props.disabled ? Colors.textSecondary : Colors.text,
                    }
                ]}
                keyboardType={props.keyboardType}
                editable={!props.disabled}
            />
            {
                props.message &&
                <View style={{
                    marginTop:5,
                }} >
                    <Text size={10} style={[props.messageStyle,{}]} color={props.color ? props.color : "textSecondary"} >{props.message}</Text>
                </View>
            }
        </View>
    )
}