import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};

// Paletas de cores para daltonismo
export const colorblindPalettes = {
  normal: {
    name: 'Normal',
    primary: 'blue',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    info: 'cyan'
  },
  protanopia: {
    name: 'Protanopia (Vermelho-Verde)',
    primary: 'blue',
    success: 'blue',
    warning: 'orange',
    danger: 'orange',
    info: 'purple'
  },
  deuteranopia: {
    name: 'Deuteranopia (Verde-Vermelho)',
    primary: 'blue',
    success: 'blue',
    warning: 'orange',
    danger: 'orange',
    info: 'purple'
  },
  tritanopia: {
    name: 'Tritanopia (Azul-Amarelo)',
    primary: 'pink',
    success: 'green',
    warning: 'pink',
    danger: 'red',
    info: 'green'
  },
  highContrast: {
    name: 'Alto Contraste',
    primary: 'purple',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    info: 'cyan'
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('atendax-dark-mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [colorblindMode, setColorblindMode] = useState(() => {
    const saved = localStorage.getItem('atendax-colorblind-mode');
    return saved || 'normal';
  });

  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('atendax-font-size');
    return saved || 'normal';
  });

  // Aplicar tema escuro
  useEffect(() => {
    localStorage.setItem('atendax-dark-mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Aplicar modo de daltonismo
  useEffect(() => {
    localStorage.setItem('atendax-colorblind-mode', colorblindMode);
    document.documentElement.setAttribute('data-colorblind', colorblindMode);
  }, [colorblindMode]);

  // Aplicar tamanho da fonte
  useEffect(() => {
    localStorage.setItem('atendax-font-size', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const setColorblindPalette = (palette) => {
    setColorblindMode(palette);
  };

  const setFontSizeMode = (size) => {
    setFontSize(size);
  };

  // Função para obter cores baseadas no modo de daltonismo
  const getColor = (colorType) => {
    const palette = colorblindPalettes[colorblindMode] || colorblindPalettes.normal;
    return palette[colorType] || palette.primary;
  };

  // Classes CSS baseadas no tema atual
  const getThemeClasses = () => {
    const base = isDarkMode ? 'dark' : '';
    const colorblind = `colorblind-${colorblindMode}`;
    const font = `font-${fontSize}`;
    return `${base} ${colorblind} ${font}`.trim();
  };

  const value = {
    isDarkMode,
    colorblindMode,
    fontSize,
    toggleDarkMode,
    setColorblindPalette,
    setFontSizeMode,
    getColor,
    getThemeClasses,
    colorblindPalettes
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={getThemeClasses()}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};