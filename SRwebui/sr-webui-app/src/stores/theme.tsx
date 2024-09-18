type ColorSet = {
  [key: string]: string,
}

type Theme = {
  [key: string]: ColorSet,
}

type ThemeVar = {
  themeName: string,
  varColors: string,
}
const themeColors :Theme = {
  "default": {
    mainThemeColor: "#1f1e33",
    textColor: "#ffffff",
  },
  "light": {
    mainThemeColor: "#33e1f1",
    textColor: "#ffffff",
  },
}
const getTheme = () => {
  const res : ThemeVar[] = [];
  Object.keys(themeColors).forEach((key) => {
    var data : ThemeVar = {
      themeName: `theme-${key}`,
      varColors: ''
    };
    Object.keys(themeColors[key]).forEach((color) => {
      data.varColors += `$${color}: ${themeColors[key][color]};`;
    })
    res.push(data)
  })
  return res;
}
export default getTheme;