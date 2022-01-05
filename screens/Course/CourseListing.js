import React, { useReducer, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    FlatList,
    StyleSheet,
    BackHandler
} from 'react-native';
import Animated,{Extrapolate,interpolate,useAnimatedScrollHandler,useAnimatedStyle,useSharedValue,withDelay,withTiming,runOnJS, event} from 'react-native-reanimated';
import {constants,dummyData,icons,images,theme,COLORS, SIZES,FONTS} from '../../constants'
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import VeticalCourseCard from '../../components/VerticalCourseCard';
import IconLabel from '../../components/IconLabel';
import LineDivider from '../../components/LineDivider';
import CategoryCard from '../../components/CategoryCard';
import HorizontalCourseCard from '../../components/HorizontalCourseCard';
import {SharedElement} from 'react-native-shared-element'
import FilterModal from '../../components/FilterModal';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const HEADER_HEIGHT = 250;
const CourseListing = ({navigation,route})=>{
    const {category,sharedElementPrefix} = route.params
    const flatListRef = useRef()
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((event)=>{
        scrollY.value = event.contentOffset.y
    })
    const headerShareValue = useSharedValue(80)
    const filterModalSharedValue1 = useSharedValue(SIZES.height)
    const filterModalSharedValue2 = useSharedValue(SIZES.height)
    const backHandler=() =>{
        navigation.goBack()
    }
    function renderHeader(){
        const inputRange = [0,HEADER_HEIGHT-50]
        headerShareValue.value = withDelay(500,
            withTiming(0,{
                duration:500
            }))
        const headerFadeAnimeStyle = useAnimatedStyle(()=>{
            return{
                opacity: interpolate(headerShareValue.value,[80,0],[0,1])
            }
        })    
        const headerTranslateAnimStyle = useAnimatedStyle(()=>{
            return{
                transform:[
                    {
                        translateY:headerShareValue.value
                    }
                ]
            }
        })
        const headerHightAnimatedStyle =  useAnimatedStyle(()=>{
            return{
                height: interpolate(scrollY.value,inputRange,[HEADER_HEIGHT,120],Extrapolate.CLAMP)
            }
        })   
        const headerHildeOnScrollAnimatedStyle  = useAnimatedStyle(()=>{
            return{
                opacity: interpolate(scrollY.value,[80,0],[0,1],Extrapolate.CLAMP),
                transform:[
                    {
                        translateY:interpolate(scrollY.value,inputRange,[0,200],Extrapolate.CLAMP),
                    }
                ]
            }
        })  
        const headerShowOnScrollAnimatedStyle  = useAnimatedStyle(()=>{
            return{
                opacity: interpolate(scrollY.value,[80,0],[1,0],Extrapolate.CLAMP),
                transform:[
                    {
                        translateY:interpolate(scrollY.value,inputRange,[50,130],Extrapolate.CLAMP),
                    }
                ]
            }
        })    
        return(
            <Animated.View
                style={[{
                    position:'absolute',
                    top:0,
                    left:0,
                    right:0,
                    height:250,
                    overflow:'hidden'
                },headerHightAnimatedStyle]}
            >
                {/* Background Image */}
                <SharedElement
                       id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                       style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={category?.thumbnail}
                        resizeMode="cover"
                        style={{
                            height:'100%',
                            width:'100%',
                            borderBottomLeftRadius:60
                        }}
                    />
                </SharedElement>
                {/* Title */}
                <Animated.View
                    style={[{
                        position:'absolute',
                        top:-80,
                        left:0,
                        right:0
                    },headerShowOnScrollAnimatedStyle]}
                >
                    <Text
                        style={{
                            textAlign:'center',
                            color:COLORS.white,
                            ...FONTS.h2
                        }}
                    >{category?.title}</Text>
                </Animated.View>
               <Animated.View
                style={[{
                    position:'absolute',
                    bottom:70,
                    left:30
                },headerHildeOnScrollAnimatedStyle]}
               >
                    <SharedElement
                       id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                       style={[StyleSheet.absoluteFillObject]}
                >
                    <Text
                        style={{
                            position:'absolute',
                            color: COLORS.white,
                            ...FONTS.h1
                        }}
                    >{category?.title}</Text>
                </SharedElement>
               </Animated.View>
               {/* Back */}
               <Animated.View
               style={headerFadeAnimeStyle}
               >
                   <IconButton
                    icon={icons.back}
                    iconStyle={{
                        tintColor:COLORS.black
                    }}
                    containerStyle={{
                        position:'absolute',
                        top:40,
                        left:20,
                        width:50,
                        height:50,
                        alignItems:'center',
                        justifyContent:'center',
                        borderRadius:25,
                        backgroundColor:COLORS.white
                    }}
                    onPress={()=>{
                        if(scrollY.value > 0 && scrollY.value <= 200){
                            flatListRef.current?.scrollToOffset({
                                offset:0,
                                animated: true
                            })
                            setTimeout(()=>{
                                headerShareValue.value = withTiming(80,{
                                    duration:500
                                },()=>{
                                    runOnJS(backHandler)()
                                })
                            },100)
                        }else{
                            backHandler()
                        }
                       
                        //backHandler()
                    }}
                   />
               </Animated.View>
               {/* Category Image */}
               <Animated.Image
                source={images.mobile_image}
                resizeMode="contain"
                style={[{
                    position:'absolute',
                    right:40,
                    bottom:-40,
                    width:100,
                    height:200                                                                            
                },headerFadeAnimeStyle,headerTranslateAnimStyle,headerHildeOnScrollAnimatedStyle]}
               />
            </Animated.View>
        )
    }
    function renderResults(){
        return(
            <AnimatedFlatList
                ref={flatListRef}
                data={dummyData.courses_list_2}
                keyExtractor={item=>`Results-${item.id}`}
                contentContainerStyle={{
                    paddingHorizontal:SIZES.padding
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode='on-drag'
                onScroll={onScroll}
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection:'row',
                            alignContent:'center',
                            marginTop:270,
                            marginBottom:SIZES.base
                        }}
                    >
                        {/* Result */}
                        <Text style={{
                            flex:1,
                            ...FONTS.body3
                        }}>5,761 Results</Text>
                        {/* Button */}
                        <IconButton
                            icon={icons.filter}
                            iconStyle={{
                                width:20,
                                height:20
                            }}
                            containerStyle={{
                                width:40,
                                height:40,
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:10,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={()=>{
                                filterModalSharedValue1.value = withTiming(0,{
                                    duration:100
                                })
                                filterModalSharedValue2.value=withDelay(100,
                                    withTiming(0,{
                                        duration:500
                                    }))
                            }}
                        />
                    </View>
                }
                renderItem={({item,index})=>(
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop:index==0?SIZES.radius:SIZES.padding
                        }}
                    />
                )}
                ItemSeparatorComponent={()=>(
                    <LineDivider
                        lineStyle={{
                            backgroundColor:COLORS.gray20
                        }}
                    />
                )}
            />
        )
    }
    return(
        <View
            style={{
                flex:1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Results */}
            {renderResults()}
            {/* Header */}
            {renderHeader()}
            {/* Filter Modal */}
          <FilterModal
            filterModalSharedValue1={filterModalSharedValue1}
            filterModalSharedValue2={filterModalSharedValue2}
          />
        </View>
    )
}


CourseListing.SharedElement = (route,otherRoute,showing)=>{
    const {category,sharedElementPrefix} = route.params;
    return[
        {
            id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`
        },
        {
            id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`
        },
    ]
}
export default CourseListing;