import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../stores/authStore';
import { useUserDataStore } from '../../stores/userDataStore';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useAuthStore();
  const { fetchUserData } = useUserDataStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      await fetchUserData(useAuthStore.getState().user!.id); // Загружаем данные после логина
      navigate('/');
    } catch (err) {
      // Ошибка уже в сторе
    }
  };


  return <div className="flex flex-col min-h-screen bg-[#ECF0F1] p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div className="w-full max-w-md" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <h1 className="text-3xl font-bold text-center text-[#2C3E50] mb-2">
            ChronCare
          </h1>
          <p className="text-center text-[#7F8C8D] mb-8">
            Войдите в свой аккаунт
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-[#2C3E50]" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#95A5A6]" />
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-10 py-3 bg-white rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#3498DB]" placeholder="example@email.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-[#2C3E50]" htmlFor="password">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#95A5A6]" />
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-10 py-3 bg-white rounded-xl border border-[#E2E8F0] focus:outline-none focus:border-[#3498DB]" placeholder="••••••••" required />
              </div>
            </div>
            {error && <motion.p className="text-[#E74C3C] text-sm" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }}>
                {error}
              </motion.p>}
            <motion.button type="submit" className="w-full py-3 bg-[#3498DB] text-white rounded-xl font-medium
                       flex items-center justify-center" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} disabled={isLoading}>
              {isLoading ? <span className="animate-pulse">Вход...</span> : <>
                  Войти
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>}
            </motion.button>
          </form>
          <p className="mt-6 text-center text-[#7F8C8D]">
            Нет аккаунта?{' '}
            <Link to="/register" className="text-[#3498DB] font-medium hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </motion.div>
      </div>
    </div>;
};
export default LoginScreen;