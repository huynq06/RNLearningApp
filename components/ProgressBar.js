import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native';
import { COLORS } from '../constants/theme'
import { FONTS } from '../constants/theme'
import  {SIZES}  from '../constants/theme'
import constants from "../constants/constants";
import  icons  from '../constants/icons'
import IconLabel from './IconLabel';


const ProgressBar = ({containerStyle,progess})=>{
    return(
        <View
            style={{
                width:'100%',
                height:13,
                borderRadius:10,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
        >
            <View
                style={{
                    position:'absolute',
                    left:0,
                    height:'100%',
                    width:progess,
                    borderRadius:10,
                    backgroundColor:COLORS.primary
                }}
            
            />
        </View>
    )
}
export default ProgressBar;
