import React,{useState,useEffect} from 'react';
import {
    TouchableOpacity,ActivityIndicator,Text,View,Image,Animated
} from 'react-native';
import { ClipPath } from 'react-native-svg';
import {dummyData,COLORS,SIZES,FONTS,icons} from '../constants'
import { connect } from 'react-redux';
const ProfileRadioButton = ({icon,label,isSelected,onPress,appTheme})=>{

    const radioAnim = React.useRef(new Animated.Value(0)).current
    const circleColorAnim = radioAnim.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.gray40,COLORS.primary]
    })
    const lineColorAnim = radioAnim.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.additionalColor4,COLORS.additionalColor13]
    })
    useEffect(()=>{
        if(isSelected){
            Animated.timing(radioAnim,{
                toValue:17,
                duration:300,
                useNativeDriver:false
            }).start();
        }else{
            Animated.timing(radioAnim,{
                toValue:0,
                duration:300,
                useNativeDriver:false
            }).start();
        }
    },[isSelected])

    return(
        <View
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
                    alignItems:'center',
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
                <Text
                    style={{
                        color:appTheme?.textColor,
                        ...FONTS.h3
                    }}
                >{label}</Text>
            </View>
            {/* Radio button */}
            <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    alignItems:'center',
                    justifyContent:'center'
                }}
                onPress={onPress}
            >
                <Animated.View
                    style={{
                        width:'100%',
                        height:5,
                        borderRadius:3,
                        backgroundColor:lineColorAnim
                    }}
                />
                <Animated.View
                    style={{
                        position:'absolute',
                        left:radioAnim,
                        width:25,
                        height:25,
                        borderRadius:15,
                        borderWidth:5,
                        borderColor:circleColorAnim,
                        backgroundColor:appTheme?.backgroundColor1
                    }}
                />         
              </TouchableOpacity>
        </View>
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
export default connect(mapStateToProps,mapDispatchToProps)(ProfileRadioButton);