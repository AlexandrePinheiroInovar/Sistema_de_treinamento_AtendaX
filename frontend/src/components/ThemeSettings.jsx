import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSettings = ({ isOpen, onClose }) => {
  const {
    isDarkMode,
    colorblindMode,
    fontSize,
    toggleDarkMode,
    setColorblindPalette,
    setFontSizeMode,
    colorblindPalettes
  } = useTheme();

  const [activeTab, setActiveTab] = useState('appearance');

  if (!isOpen) return null;

  const fontSizeOptions = [
    { value: 'small', label: 'Pequeno', class: 'text-sm' },
    { value: 'normal', label: 'Normal', class: 'text-base' },
    { value: 'large', label: 'Grande', class: 'text-lg' },
    { value: 'extra-large', label: 'Extra Grande', class: 'text-xl' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 dark:bg-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-2xl font-bold">Configurações de Tema</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-blue-700 dark:hover:bg-blue-600 p-2 rounded-lg transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'appearance'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Aparência
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'accessibility'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Acessibilidade
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">

          {/* Aparência Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">

              {/* Modo Escuro */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Modo Escuro</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-600 dark:text-gray-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <span className="text-gray-900 dark:text-white">Ativar modo escuro</span>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preview</h3>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Exemplo de Card</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">Este é um exemplo de como o sistema ficará com as configurações atuais.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                      Botão de Exemplo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Acessibilidade Tab */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">

              {/* Daltonismo */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Adaptação para Daltonismo</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Escolha uma paleta de cores otimizada para diferentes tipos de daltonismo.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {Object.entries(colorblindPalettes).map(([key, palette]) => (
                    <div key={key}>
                      <label className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="colorblind"
                          value={key}
                          checked={colorblindMode === key}
                          onChange={() => setColorblindPalette(key)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {palette.name}
                          </div>
                          <div className="flex space-x-2 mt-1">
                            <div className={`w-4 h-4 rounded-full bg-${palette.primary}-500`}></div>
                            <div className={`w-4 h-4 rounded-full bg-${palette.success}-500`}></div>
                            <div className={`w-4 h-4 rounded-full bg-${palette.warning}-500`}></div>
                            <div className={`w-4 h-4 rounded-full bg-${palette.danger}-500`}></div>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tamanho da Fonte */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tamanho da Fonte</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ajuste o tamanho da fonte para melhor legibilidade.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {fontSizeOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="fontSize"
                        value={option.value}
                        checked={fontSize === option.value}
                        onChange={() => setFontSizeMode(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className={`ml-3 text-gray-900 dark:text-white ${option.class}`}>
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 font-medium transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;