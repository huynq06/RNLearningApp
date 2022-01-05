import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback, View, TextInput, StyleSheet,TouchableOpacity,Image } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons,Text } from "../constants";

const IconButton = ({containerStyle,icon,iconStyle,onPress})=>{
    return (
        <TouchableOpacity
            style={{
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image source={icon}
            resizeMode="contain"
            style={{
                width:30,
                height:30,
                tintColor:COLORS.gray80,
                ...iconStyle
            }}/>
        </TouchableOpacity>
    )
}
export default IconButton