export interface Colors {
    [key: string]: [string, string]
  }
  
  export interface ColorsFinal {
    [key: string]: string
  }
  
  export const themeColors = (isDark?: boolean): ColorsFinal => {
    const colors: Colors = {
      primary: ['#28A095', '#28A095'],
      secondary: ['#00303a', '#004f60'],
      warning: ['#fffb48', '#f2ed4b'],
      error: ['#f44336', '#ff6262'],
      white: ['#fff', '#fff'],
      yellow: ['#ffd800', '#ffd800'],
      opaquePrimary: ['#d4ece9', '#186059'],
      paper: ['#fff', '#424242'],
      background: ['#fafafa', '#303030'],
      border: ['#e0e0e0', '#757575'],
      fieldOutlined: ['#757575', '#c2c2c2']
    }
  
    const finalColors: any = {}
  
    Object.entries(colors).forEach((color) => {
      finalColors[color[0]] = !isDark ? color[1][0] : color[1][1]
    })
  
    return finalColors
  }
  