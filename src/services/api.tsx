import axios from 'axios';
export const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface User {
  id_user: number;
  username: string;
  email: string;
  role: "siswa" | "panitia" | "admin";
  id_panitia?: string | null;
  created_at?: string;
  updated_at?: string;
  biodata?: Biodata;
  berkas?: Berkas;
  pendaftaran?: PendaftaranSpmb;
}

export interface Biodata {
  id_biodata?: number;
  id_user: number;
  nama_lengkap: string;
  nisn?: string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  jenis_kelamin?: 'L' | 'P';
  alamat?: string;
  no_hp?: string;
}

export interface Berkas {
  id_berkas?: number;
  id_user: number;
  foto_ijazah?: string | null;
  foto_kk?: string | null;
  foto_pas?: string | null;
  status_verifikasi: 'belum_diunggah' | 'pending' | 'terverifikasi' | 'ditolak';
}

export interface Jurusan {
  id_jurusan: number;
  nama_jurusan: string;
  kode_jurusan: string;
  kuota: number;
}

export interface PendaftaranSpmb {
  id_pendaftaran?: number;
  id_user: number;
  id_jurusan_pilihan1?: number;
  id_jurusan_pilihan2?: number;
  status_kelulusan: 'proses' | 'lulus' | 'tidak_lulus';
  jurusan_pilihan1?: Jurusan;
  jurusan_pilihan2?: Jurusan;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface RegisterPayload {
  nama_lengkap: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  data: User;
}

export const getStorageUrl = (filePath?: string | null): string | null => {
  if (!filePath || filePath.trim() === '' || String(filePath).toUpperCase() === 'NULL') {
    return null;
  }
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath;
  }
  return `http://127.0.0.1:8000/storage/${filePath.startsWith('/') ? filePath.substring(1) : filePath}`;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login gagal');
  }
};

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const response = await api.post('/register', payload);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Register gagal');
  }
};

export const sendOtp = async (email: string) => {
  try {
    const response = await api.post('/send-otp', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Gagal mengirim OTP');
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await api.post('/verify-otp', { email, otp });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Verifikasi OTP gagal');
  }
};

export const getMyProfile = async (): Promise<User> => {
  try {
    const response = await api.get('/me');
    return response.data.data as User;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil data profil');
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Logout gagal');
  }
};

export default api;