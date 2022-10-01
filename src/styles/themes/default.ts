import {
  extendTheme,
  Theme,
  theme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const customTheme = {
  ...theme,
  config: {
    ...theme.config,
    initialColorMode: "dark"
  },
  colors:{
    ...theme.colors,
    "primary":{
      main:'#D72323',
      100: '#e03e3e',
      200: '#D72323',
      300: '#d32222',
      400: '#c11f1f',
      500: '#af1d1d',
      600: '#9e1a1a',
      700: '#8c1717',
      800: '#7b1414',
      900: '#691111'
    },
    "secondary":{
      main: "#F56217"
    }
  },
  components:{
    ...theme.components,
    Input:{
      defaultProps:{
        focusBorderColor:"primary.main",
      },
      baseStyle(){
        return {
          field:{
            _autofill:{
            border: "1px solid var(--chakra-colors-chakra-body-bg)",
            boxShadow: "0 0 0px 1000px var(--chakra-colors-chakra-body-bg) inset",
          }
          }
        }
      }
    },
    Checkbox:{
      defaultProps:{
        borderColor: 'inherit'
      }
    },
    Menu:{
      baseStyle(){
        return {
          list:{
            backgroundColor:'card-background'
          },
          // item:{
          //   backgroundColor:'red'
          // }
        }
      }
    },
    Modal:{
      baseStyle(){
        return {
          dialog:{
            backgroundColor:'card-background'
          }
        }
      }
    },
  },
  shadows:{
   outline: '0 0 0 2px var(--chakra-colors-secondary-main)'
  },
  semanticTokens:{
    ...theme.semanticTokens,
    colors:{
      "chakra-body-bg":{
        _light:'#ecf0f1',
        _dark:'#060708'
      },
      // "chakra-header-divider":{
      //   _light:'#1A202C33',
      //   _dark:'#ecf0f133',
      // },
      "text-secondary":{
        _light: "#333",
        _dark:"#ccc",
      },
      primary:{
        _dark:'primary.200',
        _light:'primary.500'
      },
      "primary-text":{
        _light: "white",
        _dark: "white"
      },
      "card-background":{
        default:'#fff',
        _dark:'#121417'
      },
    }
  }
};

export default extendTheme(
  customTheme
);