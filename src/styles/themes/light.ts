import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    
    palette:{
        mode:'light',
        background:{
            default:'#ecf0f1',
            paper:'#fff'
        },
        primary:{
            main:"#D72323"
        },
        secondary:{
            main:"#F56217"
        }
    },
})

export default lightTheme