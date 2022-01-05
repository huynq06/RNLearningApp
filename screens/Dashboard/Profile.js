import React,{useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import {constants,dummyData,icons,images,theme,COLORS, SIZES,FONTS} from '../../constants'
import IconButton from '../../components/IconButton'
import TextButton from '../../components/TextButton'
import ProgressBar from '../../components/ProgressBar';
import ProfileValue from '../../components/ProfileValue';
import LineDivider from '../../components/LineDivider'
import ProfileRadioButton from '../../components/ProfileRadioButton';
import {connect} from 'react-redux'
import { toggleTheme } from '../../stores/themeActions';
const Profile = ({appTheme,toggleTheme}) => {
    const [newCourseNotification,setNewCourseNotification] = useState(false)
    const [studyReminder,setStudyRemider] = useState(false)
    //handler
    function toggleThemeHandler(){
        //console.log('toggleThemeHandler')
        if(appTheme?.name=="light"){
            toggleTheme('dark')
        }else{
            toggleTheme('light')
        }
    }
    //render
    function renderHeader(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    marginTop:50,
                    paddingHorizontal: SIZES.padding,
                    justifyContent:'space-between'
                }}
            >
               <Text
                style={{
                    color: appTheme?.textColor,
                    ...FONTS.h1
                }}
               >Profile</Text> 
               <IconButton
                icon={icons.sun}
                iconStyle={{
                    tintColor: COLORS.black
                }}
                onPress={()=>toggleThemeHandler()}
               />
            </View>
        )
    }
    function renderProfileCard(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    marginTop:SIZES.padding,
                    paddingHorizontal:SIZES.radius,
                    paddingVertical:20,
                    borderRadius:SIZES.radius,
                    backgroundColor:appTheme?.backgroundColor2
                }}
            >
                {/* profile Image */}
                <TouchableOpacity
                    style={{
                        width:80,
                        height:80
                    }}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width:'100%',
                            height:'100%',
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: COLORS.white
                        }}
                    />
                    <View
                        style={{
                            position:'absolute',
                            width:'100%',
                            height:'100%',
                            alignItems:'center',
                            justifyContent:'flex-end'
                        }}
                    >
                        <View
                            style={{
                                width:30,
                                height:30,
                                marginBottom:-15,
                                alignItems:'center',
                                justifyContent:'center',
                                borderRadius:15,
                                backgroundColor:COLORS.primary
                            }}
                        >
                            <Image
                                source={icons.camera}
                                resizeMode='contain'
                                style={{
                                    width:17,
                                    height:17
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* Detail */}
                <View
                    style={{
                        flex:1,
                        marginLeft:SIZES.radius,
                        alignItems:'flex-start'
                    }}
                >
                    <Text style={{
                        color:COLORS.white,
                        ...FONTS.h2
                    }}>By Huy</Text>
                          <Text style={{
                        color:COLORS.white,
                        ...FONTS.body4
                    }}>Full Stack Developer</Text>
                    {/* progress */}
                    <ProgressBar
                        progess='58%'
                        containerStyle={{
                            marginTop:SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            flexDirection:'row',

                        }}
                    >
                        <Text style={{
                            flex:1,
                            color:COLORS.white,
                            ...FONTS.body4

                        }}>Overal Progress</Text>
                        <Text  style={{
                            color:COLORS.white,
                            ...FONTS.body4

                        }}>58%</Text>
                    </View>
                    {/* Member */}
                    <TextButton
                        label="+ Become Member"
                        buttonContainerStyle={{
                            height:35,
                            marginTop:SIZES.padding,
                            paddingHorizontal:SIZES.radius,
                            borderRadius:20,
                            backgroundColor:appTheme?.backgroundColor4
                        }}
                        labelStyle={{
                            color: appTheme?.textColor2
                        }}
                    />
                </View>
            </View>
        )
    }
    function renderProfileSection1(){
        return(
            <View
                style={style.profileSectionContainer}
            >
                <ProfileValue
                    icon={icons.profile}
                    label="Name"
                    value="By Huy"
                
                />
                <LineDivider />
                <ProfileValue
                    icon={icons.email}
                    label="Email"
                    value="huy.nguyen.quang@als.com.vn"
                
                />
                <LineDivider />
                <ProfileValue
                    icon={icons.password}
                    label="Password"
                    value="Updated two week ago"
                
                />
                <LineDivider />
                <ProfileValue
                    icon={icons.call}
                    label="Contact Number"
                    value="0983833193"
                
                />
            </View>
        )
    }
    function renderProfileSection2(){
        return(
            <View
                style={style.profileSectionContainer}
            >
                 <ProfileValue
                    icon={icons.star_1}
                    value="Pages"
                />
                  <LineDivider />
                  <ProfileRadioButton
                    icon={icons.new_icon}
                    label="New Course Notifications"
                    isSelected={newCourseNotification}
                    onPress={()=>{setNewCourseNotification(!newCourseNotification)}}
                  />
                   <LineDivider />
                  <ProfileRadioButton
                    icon={icons.reminder}
                    label="Study Reminder"
                    isSelected={studyReminder}
                    onPress={()=>{setStudyRemider(!studyReminder)}}
                  />
            </View>
        )
    }
    return (
        <View
            style={{
                flex:1,
                backgroundColor:appTheme?.backgroundColor1
            }}
        >
            {renderHeader()}
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal:SIZES.padding,
                    paddingBottom:150
                }}
            >
                {/* Profile Card */}
                {renderProfileCard()}
                {/* profile section 1 */}
                {renderProfileSection1()}
                {/* profile section 2 */}
                {renderProfileSection2()}
            </ScrollView>
        </View>
    )
}
const style = StyleSheet.create({
    profileSectionContainer:{
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius:SIZES.radius,
        borderColor: COLORS.gray20
    }
})

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
export default connect(mapStateToProps,mapDispatchToProps)(Profile);