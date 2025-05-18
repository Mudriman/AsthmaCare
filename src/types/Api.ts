import { User } from "@/types/User";

export interface RegistrationData {
  email: string;
  password: string;
  name: string;
}

export interface UserWithPassword extends User {
  password: string;
}