import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Набор из 10 целевых слов (связанных с астмой/здоровьем)
const targetWords = [
  'астма',
  'спазм',
  'вдохи',
  'выдох',
  'кашель',
  'пульс',
  'ингал',
  'отдых',
  'силач',
  'лёгки',
];

// Список допустимых слов (для проверки ввода)
const validWords = [
  ...targetWords,
  'книга', 'стол', 'домик', 'река', 'луна', 'звезда', 'поле', 'лесок', 'цвет', 'трава',
  'окно', 'дверь', 'котик', 'собак', 'птица', 'рыба', 'дерево', 'куст', 'песок', 'камень',
  'вода', 'огонь', 'земля', 'небо', 'солн', 'месяц', 'тень', 'свет', 'путь', 'дорог',
  'часы', 'время', 'день', 'ночь', 'утро', 'вечер', 'сон', 'мечта', 'радост', 'грусть',
];

// Интерфейс для попытки
interface Guess {
  word: string;
  colors: string[]; // Цвета для каждой буквы: 'green', 'yellow', 'gray'
}

const FiveWordsGame: React.FC = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState('');
  const maxAttempts = 5;

  // Выбираем случайное слово при загрузке компонента
  useEffect(() => {
    const randomWord = targetWords[Math.floor(Math.random() * targetWords.length)];
    setTargetWord(randomWord);
  }, []);

  // Обработка ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^а-я]/g, ''); // Только русские буквы
    if (value.length <= 5) {
      setCurrentGuess(value);
      setError('');
    }
  };

  // Обработка отправки слова
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameOver) return;

    // Проверки
    if (currentGuess.length !== 5) {
      setError('Слово должно содержать 5 букв');
      return;
    }
    if (!validWords.includes(currentGuess)) {
      setError('Такого слова нет в словаре');
      return;
    }

    // Вычисляем цвета для букв
    const colors = Array(5).fill('gray');
    const targetLetters = targetWord.split('');
    const guessLetters = currentGuess.split('');
    const remainingTargetLetters = [...targetLetters];

    // Сначала проверяем точные совпадения (зелёный)
    for (let i = 0; i < 5; i++) {
      if (guessLetters[i] === targetLetters[i]) {
        colors[i] = 'green';
        remainingTargetLetters[i] = ''; // Удаляем использованную букву
      }
    }

    // Затем проверяем буквы на неправильных позициях (жёлтый)
    for (let i = 0; i < 5; i++) {
      if (colors[i] === 'gray' && remainingTargetLetters.includes(guessLetters[i])) {
        colors[i] = 'yellow';
        remainingTargetLetters[remainingTargetLetters.indexOf(guessLetters[i])] = '';
      }
    }

    // Добавляем попытку
    const newGuess: Guess = { word: currentGuess, colors };
    setGuesses([...guesses, newGuess]);
    setCurrentGuess('');

    // Проверяем конец игры
    if (currentGuess === targetWord) {
      setGameOver(true);
      setError('Поздравляем, вы угадали слово!');
    } else if (guesses.length + 1 >= maxAttempts) {
      setGameOver(true);
      setError(`Игра окончена! Загаданное слово: ${targetWord}`);
    }
  };

  // Перезапуск игры
  const handleRestart = () => {
    setTargetWord(targetWords[Math.floor(Math.random() * targetWords.length)]);
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setError('');
  };

  return (
    <div className="flex flex-col h-full w-full bg-white p-5 pt-12">
      {/* Заголовок и кнопка "Назад" */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/games">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center text-[#3498DB]"
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
            Назад
          </motion.div>
        </Link>
        <h1 className="text-2xl font-bold text-[#2C3E50]">5 Слов</h1>
        <div className="w-6" /> {/* Пустое место для симметрии */}
      </div>

      {/* Сетка попыток */}
      <div className="grid gap-2 mb-6 mx-auto">
        {Array(maxAttempts)
          .fill(null)
          .map((_, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {Array(5)
                .fill(null)
                .map((_, colIndex) => {
                  const guess = guesses[rowIndex];
                  const letter = guess ? guess.word[colIndex] : '';
                  const color = guess
                    ? guess.colors[colIndex] === 'green'
                      ? 'bg-[#4CAF50]'
                      : guess.colors[colIndex] === 'yellow'
                      ? 'bg-[#FFCA28]'
                      : 'bg-[#7F8C8D]'
                    : 'bg-white border-2 border-gray-300';
                  return (
                    <motion.div
                      key={colIndex}
                      className={`w-12 h-12 flex items-center justify-center text-xl font-bold text-white rounded-md ${color}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: rowIndex * 0.1 + colIndex * 0.05 }}
                    >
                      {letter.toUpperCase()}
                    </motion.div>
                  );
                })}
            </div>
          ))}
      </div>

      {/* Поле ввода и кнопка */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-xs mx-auto">
        <input
          type="text"
          value={currentGuess}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-[#3498DB] outline-none"
          placeholder="Введите слово"
          maxLength={5}
          disabled={gameOver}
        />
        <motion.button
          type="submit"
          className={`w-full py-3 bg-[#3498DB] text-white font-semibold rounded-lg ${
            gameOver || currentGuess.length !== 5 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#2980B9]'
          }`}
          whileHover={{ scale: currentGuess.length === 5 && !gameOver ? 1.05 : 1 }}
          whileTap={{ scale: currentGuess.length === 5 && !gameOver ? 0.95 : 1 }}
          disabled={gameOver || currentGuess.length !== 5}
        >
          Отправить
        </motion.button>
      </form>

      {/* Сообщение об ошибке или результате */}
      {error && (
        <motion.p
          className="mt-4 text-[#2C3E50] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.p>
      )}

      {/* Кнопка перезапуска */}
      {gameOver && (
        <motion.button
          className="mt-6 flex items-center gap-2 bg-[#4CAF50] text-white px-4 py-2 rounded-lg mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRestart}
        >
          <RefreshCw className="h-5 w-5" />
          Новая игра
        </motion.button>
      )}
    </div>
  );
};

export default FiveWordsGame;