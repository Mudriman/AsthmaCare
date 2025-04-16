interface User {
  id: string;
  email: string;
  name: string;
  avatar: number;
  level: number;
  xp: number;
  lastAttack: Date | null;
  completedTips: string[];
  settings: {
    notifications: boolean;
    darkMode: boolean;
    sound: boolean;
  };
}
interface StoredUser extends User {
  password: string;
}
class AuthService {
  private getUsers(): StoredUser[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
  private saveUsers(users: StoredUser[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  async login(email: string, password: string): Promise<User> {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Неверный email или пароль');
    }
    // Возвращаем пользователя без пароля
    const {
      password: _,
      ...userWithoutPassword
    } = user;
    return userWithoutPassword;
  }
  async register(email: string, password: string, name: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = this.getUsers();
    if (users.some(u => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    const newUser: StoredUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      avatar: 0,
      level: 1,
      xp: 0,
      lastAttack: null,
      completedTips: [],
      settings: {
        notifications: true,
        darkMode: false,
        sound: true
      }
    };
    this.saveUsers([...users, newUser]);
    const {
      password: _,
      ...userWithoutPassword
    } = newUser;
    return userWithoutPassword;
  }
}
export const authService = new AuthService();