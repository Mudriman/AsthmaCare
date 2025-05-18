import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client'; // Новый импорт
import { App } from './App';

const root = createRoot(document.getElementById('root')!); // Создаём root
root.render(<App />); // Рендерим через root