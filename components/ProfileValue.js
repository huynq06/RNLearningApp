import React,{useState,useEffect} from 'react';
import {
    TouchableOpacity,ActivityIndicator,Text,View,Image
} from 'react-native';
import { ClipPath } from 'react-native-svg';
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'
import { connect } from 'react-redux';
const ProfileValue = ({icon,label,value,onPress,appTheme})=>{
    return(
        <TouchableOpacity
            style={{
                flexDirection:'row',
                height:80,
                alignItems:'center'
            }}
        >
            {/* icon */}
            <View
                style={{
                    width:40,
                    height:40,
                    justifyContent:'center',
                    borderRadius:20,
                    backgroundColor:appTheme?.backgroundColor3
                }}
            >
                <Image
                    source={icon}
                    resizeMode='contain'
                    style={{
                        width:25,
                        height:25,
                        tintColor: COLORS.primary
                    }}
                />
            </View>
            {/* Label and value */}
            <View
                style={{
                    flex:1,
                    marginLeft: SIZES.radius
                }}
            >
                {label && <Text
                    style={{
                        color: COLORS.gray30,
                        ...FONTS.body3
                    }}
                >{label}</Text>}
                <Text
                    style={{
                        color:appTheme?.textColor,
                        ...FONTS.h3
                    }}
                >{value}</Text>
            </View>
            {/* icon */}
            <Image
                source={icons.right_arrow}
                style={{
                    width:15,
                    height:15,
                    tintColor:appTheme?.tintColor,
                }}
            />
        </TouchableOpacity>
    )
}
function mapStateToProps(state){
    return{
        appTheme: state.appTheme,
        error: state.error
    }
}
function mapDispatchToProps(dispatch){
    return{
        toggleTheme:(themeType)=>{
            return dispatch(toggleTheme(themeType))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfileValue);