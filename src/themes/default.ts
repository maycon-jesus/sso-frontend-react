import {
  extendTheme,
  Theme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "dark"
  },
  colors:{
    "primary":{
      main:'#42E2B8',
      100: '#60e6c2',
      200: '#42E2B8',
      300: '#3de1b5',
      400: '#2bdeae',
      500: '#21d4a4',
      600: '#1ec296',
      700: '#1cb089',
      800: '#199f7b',
      900: '#168d6d'
    }
  },
  components:{
    Input:{
      defaultProps:{
        focusBorderColor:"primary.main",
      }
    },
    Button:{
      variants:{
        solid(props:any) {
          if(['blackAlpha','whiteAlpha'].includes(props.colorScheme)){
            return {
              color: 'chakra-body-text'
            }
          }
        },
      }
    },
    Checkbox:{
      defaultProps:{
        borderColor: 'red'
      }
    }
  },
  semanticTokens:{
    colors:{
      "chakra-body-bg":{
        _light:'#ecf0f1',
        _dark:'#1A202C'
      },
      primary:{
        _dark:'primary.200',
        _light:'primary.500'
      },
      "card-background":{
        default:'#fff',
        _dark:'#262F40'
      },
      // "background":{
      //   _dark:"#121417",
      //   _light:"#ddd"
      // },
      // "background2":{
      //   _dark:"#060708",
      //   _light:"#fff"
      // },
    }
  }
};

export default extendTheme(
  theme,
  withDefaultColorScheme({
    colorScheme:'primary'
  })
);