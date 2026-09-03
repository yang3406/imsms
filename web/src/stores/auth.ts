import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { http } from '../api/http';
import type { User } from '../types';

export const useAuthStore = defineStore('auth', () => {
  const raw = localStorage.getItem('meeting-user');
  const user = ref<User | null>(raw ? JSON.parse(raw) : null);
  const isAdmin = computed(() => user.value?.role === 'ADMIN');
  async function login(username: string, password: string) {
    const { data } = await http.post('/auth/login', { username, password });
    localStorage.setItem('meeting-token', data.token);
    localStorage.setItem('meeting-user', JSON.stringify(data.user));
    user.value = data.user;
  }
  function logout() {
    localStorage.removeItem('meeting-token');
    localStorage.removeItem('meeting-user');
    user.value = null;
  }
  return { user, isAdmin, login, logout };
});
