import React, { useReducer, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    ScrollView,
    ImageBackground,
    //FlatList
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {FlatList} from 'react-native-gesture-handler'
import {constants,dummyData,icons,images,theme,COLORS, SIZES,FONTS} from '../../constants'
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import VeticalCourseCard from '../../components/VerticalCourseCard';
import IconLabel from '../../components/IconLabel';
import LineDivider from '../../components/LineDivider';
import CategoryCard from '../../components/CategoryCard';
import HorizontalCourseCard from '../../components/HorizontalCourseCard';
const Section = ({containerStyle,title,onPress,children}) =>{
    return(
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection:'row',
                    paddingHorizontal:SIZES.padding
                }}
            >
                <Text
                    style={{
                        flex:1,
                        ...FONTS.h2
                    }}
                >{title}</Text>
                <TextButton
                    buttonContainerStyle={{
                        width:80,
                        borderRadius:30,
                        backgroundColor:COLORS.primary
                    }}
                    label="See All"
                    onPress={onPress}
                />
            </View>
            {children}
        </View>
    )
}
const Home = () => {
     const navigation = useNavigation();
    function renderHeader(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    marginTop:40,
                    marginBottom:10,
                    paddingHorizontal:SIZES.padding,
                    alignItems:'center'
                }}
            >
                {/* Greeting */}
                <View
                    style={{
                        flex:1
                    }}
                >
                    <Text style={{...FONTS.h2}}>Hello,Huy</Text>
                    <Text
                        style={{
                            color:COLORS.gray50,
                            ...FONTS.body3
                        }}
                    >Thursday, 9th Sept 2021</Text>
                </View>
                {/* Notification */}
                <IconButton
                    icon={icons.notification}
                />       

            </View>
        )
    }
    function renderStartLearning(){
        return(
            <ImageBackground
            source={images.featured_bg_image}
                style={{
                    alignItems:'flex-start',
                    marginTop:SIZES.padding,
                    marginHorizontal:SIZES.padding,
                    padding:15
                }}
                imageStyle={{
                    borderRadius:SIZES.radius
                }}
            >
                {/* Info */}
                <View>
                    <Text style={{
                        color:COLORS.white,
                        ...FONTS.body2
                    }}>
                        HOW TO
                    </Text>
                    <Text style={{
                        color:COLORS.white,
                        ...FONTS.body2
                    }}>
                        Make your brain more visible our checklist
                    </Text>
                    <Text style={{
                        marginTop:SIZES.radius,
                        color:COLORS.white,
                        ...FONTS.body4
                    }}>By Huy</Text>
                </View>
                {/* Image */}
                <Image
                    source={images.start_learning}
                    style={{
                        width:'100%',
                        height:110,
                        marginTop:SIZES.padding
                    }}
                />
                {/* Button */}
                <TextButton
                    label="Start Learning"
                    buttonContainerStyle={{
                        height:40,
                        paddingHorizontal:SIZES.padding,
                        borderRadius:20,
                        backgroundColor:COLORS.white
                    }}
                    labelStyle={{
                        color:COLORS.black
                    }}
                />
            </ImageBackground>
        )
    }
    function renderCourse(){
        return(
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey="Courses"
                keyExtractor={item=>`Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop:SIZES.padding
                }}
                renderItem={({item,index})=>(
                     <VeticalCourseCard
                        containerStyle={{
                            marginLeft: index===0? SIZES.padding:SIZES.radius,
                            marginRight: index===dummyData.courses_list_1.length-1? SIZES.padding : 0
                        }}
                        course={item}
                    />
                )}
            />
        )
    }
    function renderCategory(){
        return(
            <Section
                title="Categories"
            >
                <FlatList
                    horizontal
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={item=>`Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop:SIZES.radius
                    }}
                    renderItem={({item,index})=>(
                        <CategoryCard
                        sharedElementPrefix="Home"
                            category={item}
                            containerStyle={{
                                marginLeft: index==0? SIZES.padding : SIZES.base,
                                marginRight: index==dummyData.categories.length - 1? SIZES.padding : 0
                            }}
                             onPress={()=>navigation.navigate("CourseListing",{category:item,sharedElementPrefix:"Home"})}
                        />
                    )}
                />
            </Section>
        )
    }
    function renderPopular(){
        return(
            <Section
                title="Popular Courses"
                containerStyle={{
                    marginTop:30
                }}
            >
                <FlatList
                    data={dummyData.courses_list_2}
                    listKey="PopularCourses"
                    keyExtractor={item=>`PopularCourses-${item.id}`}
                    scrollEnabled={false}
                    contentContainerStyle={{
                        marginTop:SIZES.radius,
                        paddingHorizontal:SIZES.padding
                    }}
                    ItemSeparatorComponent={()=>(
                        <LineDivider lineStyle={{
                            backgroundColor:COLORS.gray20
                        }} />
                    )}
                renderItem={({item,index})=>(
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical:SIZES.padding,
                            marginTop: index==0? SIZES.radius : SIZES.padding
                        }}
                    />
                )}
                />
            </Section>
        )
    }
    return (
        <View
            style={{
                flex:1,
                backgroundColor:COLORS.white
            }}
        >
           {/* Header  */}
           {renderHeader()}
           {/* Content */}
           <ScrollView
            contentContainerStyle={{
                paddingBottom:150
            }}
            showsVerticalScrollIndicator={false}
           >
               {/* start learning  */}
               {renderStartLearning()}
               {/* course */}
               {renderCourse()}
               <LineDivider
               lineStyle={{
                   marginVertical: SIZES.padding
               }}
               />
               {/* Category section */}
               {renderCategory()}
               {/* Popular section */}
               {renderPopular()}
           </ScrollView>
        </View>
    )
}

export default Home;


