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
    },
    "normal-light":{
      500: '#f5f5f5',
      600: "#EBEBEB"
    },
    "normal-dark":{
      200: "#262F40",
      300: "#1F2633"
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
          if(props.colorScheme === 'normal'){
            return {
              bgColor: props.colorMode === 'light'? 'normal-light.500':'normal-dark.300',
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
      "chakra-header-divider":{
        _light:'#1A202C33',
        _dark:'#ecf0f133',
      },
      "text-secondary":{
        _light: "#333",
        _dark:"#ccc",
      },
      primary:{
        _dark:'primary.200',
        _light:'primary.500'
      },
      "card-background":{
        default:'#fff',
        _dark:'#262F40'
      },
    }
  }
};

export default extendTheme(
  theme,
  withDefaultColorScheme({
    colorScheme:'primary'
  })
);