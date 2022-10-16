import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    
    palette:{
        mode:'dark',
        background:{
            default:'#060708',
            paper:'#121417'
        },
        primary:{
            main:"#D72323"
        },
        secondary:{
            main:"#F56217"
        }
    },
})

export default darkTheme