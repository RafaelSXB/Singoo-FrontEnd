// src/app/services/auth.models.ts

// DTO de Entrada (O que enviamos para a API)
export interface AuthRequest {
  email: string;
  password?: string; // Opcional caso no futuro tenha login sem senha (ex: Google)
}

// Sub-entidade do Usuário
export interface UserDto {
  id: string;
  email: string;
  tier: 'FREE' | 'PRO'; // Tipagem estrita para evitar erros de digitação
}

// DTO de Saída (O que a API nos devolve)
export interface AuthResponse {
  token: string;
  user: UserDto;
}