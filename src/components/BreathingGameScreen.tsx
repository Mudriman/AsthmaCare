import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
const BreathingGameScreen: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [energy, setEnergy] = useState(50);
  const [score, setScore] = useState(0);
  const [obstacles, setObstacles] = useState<number[]>([]);
  const [characterPosition, setCharacterPosition] = useState(50);
  const [isJumping, setIsJumping] = useState(false);
  const [feedback, setFeedback] = useState('');
  // Game logic
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const obstacleInterval = setInterval(() => {
      setObstacles(prev => [...prev, 100]);
      // Random feedback about breathing
      const feedbacks = ['Отличный ритм!', 'Продолжай в том же духе!', 'Дыши глубже!', 'Ровное дыхание!'];
      setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
    }, 3000);
    const gameLoop = setInterval(() => {
      setObstacles(prev => prev.map(pos => pos - 5).filter(pos => pos > -20));
      // Check collisions
      obstacles.forEach(obstaclePos => {
        if (obstaclePos < 20 && obstaclePos > 0 && !isJumping) {
          setEnergy(prev => Math.max(0, prev - 10));
          if (energy <= 10) {
            setGameOver(true);
          }
        }
      });
    }, 100);
    return () => {
      clearInterval(obstacleInterval);
      clearInterval(gameLoop);
    };
  }, [gameStarted, gameOver, obstacles, isJumping, energy]);
  const handleTap = () => {
    if (!gameStarted) {
      setGameStarted(true);
      return;
    }
    if (gameOver) {
      // Reset game
      setGameStarted(false);
      setGameOver(false);
      setEnergy(50);
      setScore(0);
      setObstacles([]);
      setCharacterPosition(50);
      return;
    }
    if (!isJumping) {
      setIsJumping(true);
      setScore(prev => prev + 5);
      setEnergy(prev => Math.min(100, prev + 5));
      // Jump animation
      setTimeout(() => {
        setIsJumping(false);
      }, 500);
    }
  };
  return <div className="flex flex-col h-full w-full bg-[#E8F5E9] p-5 pt-12 relative" onClick={handleTap}>
      {!gameStarted && !gameOver && <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 p-5">
          <h2 className="text-2xl font-bold mb-4">Дыхательный путь</h2>
          <img src="https://img.freepik.com/free-vector/flat-forest-landscape_23-2149155031.jpg" alt="Лесная тропа" className="w-full h-40 object-cover rounded-xl mb-4" />
          <p className="text-center mb-6">
            Тапните по экрану, чтобы прыгать через триггеры астмы. Каждый тап —
            это вдох. Поддерживайте ровный ритм дыхания!
          </p>
          <motion.button className="w-full py-3 bg-gradient-to-r from-[#4FC3F7] to-[#4CAF50] text-white font-semibold rounded-xl" whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
            Начать игру
          </motion.button>
        </div>}
      {gameOver && <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 p-5">
          <h2 className="text-2xl font-bold mb-4">Игра окончена!</h2>
          <motion.div initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20
      }} className="w-24 h-24 rounded-full bg-[#E1BEE7] flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-[#673AB7]">{score}</span>
          </motion.div>
          <p className="text-center mb-6">
            Ваш результат: {score} баллов!
            <br />
            Ритм дыхания: {score > 30 ? 'Отличный!' : 'Нужно тренироваться'}
          </p>
          <div className="flex space-x-4">
            <motion.button className="py-3 px-6 bg-[#E1BEE7] text-[#673AB7] font-semibold rounded-xl" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => handleTap()}>
              Играть снова
            </motion.button>
            <Link to="/games">
              <motion.button className="py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-xl" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
                Выйти
              </motion.button>
            </Link>
          </div>
        </div>}
      {/* Game UI */}
      <div className="flex justify-between items-center mb-4">
        <Link to="/games">
          <motion.div whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} className="bg-white rounded-full p-2 shadow-md">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </motion.div>
        </Link>
        <div className="flex items-center">
          <Heart className="h-5 w-5 text-[#F44336] mr-1" />
          <div className="w-32 h-4 bg-gray-200 rounded-full">
            <motion.div className="h-full rounded-full" style={{
            width: `${energy}%`,
            background: `linear-gradient(to right, #F44336, ${energy > 50 ? '#4CAF50' : '#FFCA28'})`
          }} />
          </div>
        </div>
        <div className="bg-white rounded-full py-1 px-3 shadow-md">
          <span className="font-bold">{score}</span>
        </div>
      </div>
      {/* Game area */}
      <div className="flex-1 bg-[#E8F5E9] rounded-xl relative overflow-hidden border-2 border-[#81C784]">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/flat-forest-landscape_23-2149155031.jpg')] bg-cover bg-center" />
        {/* Character */}
        <motion.div className="absolute bottom-10 left-10" animate={{
        y: isJumping ? -50 : 0
      }} transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15
      }}>
          <img src="https://img.freepik.com/free-vector/cute-boy-with-scarf-cartoon-vector-icon-illustration_138676-5890.jpg" alt="Character" className="w-16 h-16" />
        </motion.div>
        {/* Obstacles */}
        {obstacles.map((pos, index) => <motion.div key={index} className="absolute bottom-10 w-10 h-10 bg-[#FFCA28] rounded-full flex items-center justify-center" style={{
        right: `${pos}%`
      }} animate={{
        opacity: [1, 0.8, 1],
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 1,
        repeat: Infinity
      }}>
            <Wind className="h-6 w-6 text-white" />
          </motion.div>)}
        {/* Feedback */}
        {feedback && gameStarted && !gameOver && <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.5
      }} className="absolute top-5 left-0 right-0 flex justify-center">
            <div className="bg-white px-4 py-2 rounded-full shadow-md">
              <p className="font-medium text-[#4CAF50]">{feedback}</p>
            </div>
          </motion.div>}
      </div>
      {/* Instructions */}
      <div className="mt-4 text-center text-gray-600 text-sm">
        {!gameStarted ? 'Тапните для начала' : 'Тапните для прыжка'}
      </div>
      {/* Astma-bot helper */}
      {gameStarted && !gameOver && <motion.div className="absolute bottom-4 right-4" initial={{
      opacity: 0,
      scale: 0
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: 1,
      duration: 0.5
    }}>
          <div className="bg-white rounded-full p-2 shadow-md">
            <img src="https://img.freepik.com/free-vector/cute-boy-with-scarf-cartoon-vector-icon-illustration_138676-5890.jpg" alt="Astma-bot" className="w-10 h-10" />
          </div>
        </motion.div>}
    </div>;
};
export default BreathingGameScreen;