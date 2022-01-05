import React,{useState,useRef,useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Animated,{Extrapolate,interpolate,useAnimatedScrollHandler,useAnimatedStyle,useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import IconButton from './IconButton';
import IconLabel from './IconLabel';    
import TextButton from './TextButton';
import LineDivider from './LineDivider';
import { COLORS,FONTS,SIZES,icons,constants } from '../constants';
import TwoPointSlider from './TwoPointSlider';

const ClassTypeOption = ({containerStyle,classType,onPress,isSelected})=>{
    return(
        <TouchableOpacity
            style={{
                flex:1,
                height:100,
                alignItems:'center',
                justifyContent:'center',
                paddingHorizontal:SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor:isSelected? COLORS.primary3: COLORS.additionalColor9,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={classType.icon}
                resizeMode='contain'
                style={{
                    width:40,
                    height:40,
                    tintColor: isSelected? COLORS.white: COLORS.gray80
                }}
            />
            <Text
                style={{
                    marginTop:SIZES.base,
                    color:isSelected? COLORS.white: COLORS.gray80,
                    ...FONTS.h3
                }}
            >{classType.label}</Text>
        </TouchableOpacity>
    )
}
const ClassLevelOption = ({containerStyle,classLevel,isLasstItem,isSelected,onPress})=>{
    return(
        <>
            <TouchableOpacity
                style={{
                    flexDirection:'row',
                    height:50,
                    alignItems:'center',
                    ...containerStyle
                }}
                onPress={onPress}
            >
                <Text
                    style={{
                        flex:1,
                        ...FONTS.body3
                    }}
                >{classLevel.label}</Text>
                <Image
                    source={isSelected? icons.checkbox_on : icons.checkbox_off}
                    resizeMode='contain'
                    style={{
                        width:20,
                        height:20
                    }}
                />
            </TouchableOpacity>
            {!isLasstItem && <LineDivider
                lineStyle={{
                    height:1
                }}
            />}
        </>
    )
}
const FilterModal = ({filterModalSharedValue1,filterModalSharedValue2}) =>{
    const [selectedClassType,setSelectedClassType] =useState('')
    const [selectedClassLevel,setSelectedClassLevel] = useState('')
    const [selectedCreatedWithin,setSelectedCreatedWihin]= useState('')
    const filterModalContainerAniamtedStyle =  useAnimatedStyle(()=>{
        return{
            opacity: interpolate(filterModalSharedValue1.value,[SIZES.height,0],[0,1]),
            transform:[
                {
                    translateY:filterModalSharedValue1.value
                }
            ]
        }
    }) 
    const filterModalBackgroundAniamtedStyle =  useAnimatedStyle(()=>{
        return{
            opacity: interpolate(filterModalSharedValue2.value,[SIZES.height,0],[0,1]),
        }
    })      
    const filterModalContentAniamtedStyle =  useAnimatedStyle(()=>{
        return{
            opacity: interpolate(filterModalSharedValue2.value,[SIZES.height,0],[0,1]),
            transform:[
                {
                    translateY:filterModalSharedValue2.value
                }
            ]
        }
    })
    function renderFooter(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    height:40,
                    marginBottom:30,
                    paddingHorizontal:SIZES.padding
                }}
            >
                {/* Reset */}
                <TextButton
                    buttonContainerStyle={{
                        flex:1,
                        borderRadius:SIZES.radius,
                        borderWidth:1,
                        backgroundColor:null
                    }}
                    label="Reset"
                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                />
                {/* Apply */}
                  <TextButton
                    buttonContainerStyle={{
                        flex:1,
                        borderRadius:SIZES.radius,
                        marginLeft:SIZES.radius,
                        borderColor:COLORS.primary,
                        borderWidth:1,
                        backgroundColor:COLORS.primary
                    }}
                    label="Apply"
                    labelStyle={{
                        color: COLORS.black,
                        ...FONTS.h3
                    }}
                />
            </View>
        )
    }
    return(
      //Main Conatainer
        <Animated.View
            style={[{
                position:'absolute',
                bottom:0,
                height:SIZES.height,
                width:SIZES.width
            },filterModalContainerAniamtedStyle]}
        >
            {/* BackGround Container */}
            <Animated.View
                style={[{
                    flex:1,
                    height:SIZES.height,
                    width:SIZES.width,
                    backgroundColor:COLORS.transparentBlack7
                },filterModalBackgroundAniamtedStyle]}
            >
  {/* Content Container */}
                <Animated.View
                    style={[{
                        position:'absolute',
                        bottom:0,
                        height:SIZES.height*0.9,
                        width:SIZES.width,
                        borderTopLeftRadius:30,
                        borderTopRightRadius:30,
                        backgroundColor:COLORS.white
                    },filterModalContentAniamtedStyle]}
                >
                    {/* Header */}
                    <View
                        style={{
                            marginTop:SIZES.padding,
                            flexDirection:'row',
                            paddingHorizontal:SIZES.padding
                        }}
                    >
                        <View
                            style={{
                                width:60
                            }}
                        >
                           
                       
                        </View>
                        <Text
                            style={{
                                flex:1,
                                textAlign:'center',
                                ...FONTS.h1
                            }}
                        >Filter</Text>
                        <TextButton
                            label="Cancel"
                            buttonContainerStyle={{
                                width:60,
                                backgroundColor:null
                            }}
                            labelStyle={{
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            onPress={()=>{
                                filterModalSharedValue2.value = withTiming(SIZES.height,{
                                    duration:500
                                })
                                filterModalSharedValue1.value = withDelay(500,withTiming(SIZES.height,{
                                    duration:100
                                }))
                            }}
                        />
                    </View>
                    {/* Content */}
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal:SIZES.padding,
                            paddingBottom:SIZES.base
                        }}
                    >
                        {/* Class Type */}
                        <View
                            style={
                                {marginTop:SIZES.radius}
                            }
                        >
                           <Text
                            style={{
                                ...FONTS.h3
                            }}
                           >
                               Class Type
                           </Text>
                           <View
                            style={{
                                flexDirection:'row',
                                marginTop:SIZES.radius,

                            }}
                           >
                               {constants.class_types.map((item,index)=>{
                                   return(
                                       <ClassTypeOption
                                            key={`ClassType-${index}`}
                                            classType={item}
                                            isSelected={selectedClassLevel==item?.id}
                                            containerStyle={{
                                                marginLeft: index==0? 0 :SIZES.base
                                            }}
                                            onPress={()=>{
                                                setSelectedClassLevel(item.id)
                                            }}
                                       />
                                   )
                               })}
                           </View>
                        </View>
                        {/* Class level */}
                        <View
                            style={
                                {
                                    marginTop:SIZES.padding
                                }
                            }
                        >
                            <Text
                                style={{
                                    ...FONTS.h3
                                }}
                            >Class Level</Text>
                            <View
                            
                            >

                                {constants.class_levels.map((item,index)=>{
                                    return(
                                        <ClassLevelOption
                                            key={`ClassType - ${index}`}
                                            classLevel={item}
                                            isLasstItem={index==constants.class_levels.length-1}
                                            isSelected={selectedClassLevel==item?.id}
                                            onPress={()=>{
                                                setSelectedClassLevel(item.id)
                                            }}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                        {/* Created Within */}
                        <View
                            style={{
                                marginTop:SIZES.radius
                            }}
                        >
                             <Text
                                style={{
                                    ...FONTS.h3
                                }}
                            >Class Within</Text>
                            <View
                                style={{
                                    flex:1,
                                    flexDirection:'row',
                                    flexWrap:'wrap'
                                }}
                            >
                               
                               {constants.created_within.map((item,index)=>{
                                    return(
                                        <TextButton
                                            key={`CreatedWithin - ${index}`}
                                           label={item?.label}
                                           buttonContainerStyle={{
                                            height:45,
                                            paddingHorizontal:SIZES.radius,
                                            marginLeft: index%3==0? 0: SIZES.radius,
                                            marginTop:SIZES.radius,
                                            borderRadius: SIZES.radius,
                                            borderWidth: 1,
                                            borderColor: COLORS.gray20,
                                            backgroundColor: item?.id==selectedCreatedWithin ? COLORS.primary3: null
                                           }}
                                           labelStyle={{
                                               color:  item?.id==selectedCreatedWithin ? COLORS.white: COLORS.black,
                                               ...FONTS.body3
                                           }}
                                           onPress={()=>{
                                               setSelectedCreatedWihin(item.id)
                                           }}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                        {/* Class Lenght */}
                        <View
                            style={{
                                marginTop:SIZES.padding
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.h3
                                }}
                            >Class Lenght</Text>
                            <View
                                style={{
                                    alignItems:'center'
                                }}
                            >
                                <TwoPointSlider
                                    values={[20,50]}
                                    min={15}
                                    max={60}
                                    postfix="min"
                                    onValueChange={(value)=>{console.log(value)}}
                                
                                />
                            </View>
                        </View>
                    </ScrollView>
                    {/* Footer  */}
                    {renderFooter()}
                </Animated.View>
            </Animated.View>
          
        </Animated.View>
    )
}
export default FilterModal;
