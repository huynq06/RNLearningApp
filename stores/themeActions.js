import { lightTheme,darkTheme } from "../constants";

export const TOGGLE_THEME_BEGIN = 'TOGGLE_THEME_BEGIN'
export const TOGGLE_THEME_SUCCESS = 'TOGGLE_THEME_SUCCESS'
export const TOGGLE_THEME_FAILURE = 'TOGGLE_THEME_FAILURE'


export const toggleThemBegin = () =>({
    type: TOGGLE_THEME_BEGIN
})
export const toggleThemSuccess = (selectedTheme) =>({
    type: TOGGLE_THEME_SUCCESS,
    payload:{selectedTheme}
})
export const toggleThemeFailure = (error) =>({
    type: TOGGLE_THEME_FAILURE,
    payload:{error}
})
export function toggleTheme(themeType){
    return dispatch =>{
        dispatch(toggleThemBegin())
        switch(themeType){
            case 'dark':
                dispatch(toggleThemSuccess(darkTheme))
                break;
            case 'light':
                dispatch(toggleThemSuccess(lightTheme))    
                break;
            default:
                dispatch(toggleThemeFailure({error:"Invalid theme type"}))
        }
    }
}