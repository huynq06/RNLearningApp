import React, { useState, useEffect } from "react";
import { TouchableNativeFeedback, View, TextInput, StyleSheet,TouchableOpacity,Image,ImageBackground ,Text} from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons } from "../constants";
import {SharedElement} from 'react-navigation-shared-element'
const CategoryCard = ({sharedElementPrefix,category,containerStyle,onPress}) =>{
    return(
        <TouchableOpacity
        style={{
            height:150,
            width:200,
            ...containerStyle
        }}
            onPress={onPress}
        >
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
            <Image
                source={category?.thumbnail}
                resizeMode="cover"
                style={{
                    width:'100%',
                    height:'100%',
                    borderRadius:SIZES.radius
                }}
            />
            </SharedElement>
            {/* Title */}
            <View
                style={{
                    position:'absolute',
                    bottom:50,
                    left:5
                }}
            >
                  <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                 <Text  style={{
                        position:'absolute',
                        color:COLORS.white,
                        ...FONTS.h2
                    }}>{category?.title}</Text>
            </SharedElement>
               
            </View>
          
            {/* <ImageBackground
                source={category?.thumbnail}
                resizeMode="cover"
                style={{
                    height:150,
                    width:200,
                    paddingVertical:SIZES.padding,
                    paddingHorizontal:SIZES.radius,
                    justifyContent:'flex-end',
                    ...containerStyle
                }}
                imageStyle={{
                    borderRadius:SIZES.radius
                }}
            >
                <Text
                    style={{
                        color:COLORS.white,
                        ...FONTS.h2
                    }}
                >{category?.title}</Text>
            </ImageBackground> */}
        </TouchableOpacity>
    )
}
export default CategoryCard