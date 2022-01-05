import React,{useState,useEffect} from 'react';
import {
    TouchableOpacity,ActivityIndicator,Text
} from 'react-native';
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'

const TextButton = ({label,buttonContainerStyle,onPress,disabled,labelStyle,isLoading})=>{
    return(
        <TouchableOpacity
           onPress={onPress}
           disabled={disabled}
           style={{
               justifyContent:'center',
               alignItems:'center',
               backgroundColor:COLORS.primaryALS,
               ...buttonContainerStyle
           }} 
        >
          <Text
            style={{
               color:COLORS.white,
               ...FONTS.h3,
               ...labelStyle 
            }}
          >{label}</Text>
        </TouchableOpacity>
    )
}
export default TextButton;