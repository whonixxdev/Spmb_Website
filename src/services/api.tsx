import axios from 'axios';

export const BASE_URL: string = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor: Pastikan mengambil 'auth_token' atau 'token'
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  role?: "siswa" | "panitia" | "admin";
  no_hp?: string;
}

export interface RegisterVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  data: User;
}

export interface ForgotPasswordResetPayload {
  email: string;
  otp: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateProfilePayload {
  username?: string;
  nama_depan?: string;
  nama_belakang?: string;
  nama_lengkap?: string;
  email?: string;
  no_hp?: string;
  foto_profile?: File | string;
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

export const registerSendOtp = async (payload: RegisterPayload) => {
  const response = await api.post('/register/send-otp', payload);
  return response.data;
};

export const registerVerifyOtp = async (payload: RegisterVerifyOtpPayload | { email: string; otp: string; [key: string]: any }): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/register/verify-otp', payload);
  const data = response.data;
  if (data.access_token) {
    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("user_data", JSON.stringify(data.data));
  }
  return data;
};

export const sendOtp = registerSendOtp;
export const verifyOtp = registerVerifyOtp;
export const registerVerify = registerVerifyOtp;

// Menyimpan token secara otomatis ke localStorage setelah Login berhasil
export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', payload);
  const data = response.data;
  if (data.access_token) {
    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("user_data", JSON.stringify(data.data));
    if (data.data?.role) {
      localStorage.setItem("user_role", data.data.role);
    }
  }
  return data;
};

export const forgotPasswordSendOtp = async (email: string) => {
  const response = await api.post('/forgot-password/send-otp', { email });
  return response.data;
};

export const forgotPasswordVerifyOtp = async (email: string, otp: string) => {
  const response = await api.post('/forgot-password/verify-otp', { email, otp });
  return response.data;
};

export const forgotPasswordReset = async (payload: ForgotPasswordResetPayload) => {
  const response = await api.post('/forgot-password/reset', payload);
  return response.data;
};

export const getMyProfile = async (): Promise<User> => {
  const response = await api.get('/me');
  // Penanganan aman jika response berupa { data: User } atau langsung User
  return (response.data.data || response.data.user || response.data) as User;
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post('/logout');
  } finally {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
  }
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const formData = new FormData();
  if (data.username) formData.append("username", data.username);
  if (data.nama_depan) formData.append("nama_depan", data.nama_depan);
  if (data.nama_belakang) formData.append("nama_belakang", data.nama_belakang);
  if (data.nama_lengkap) formData.append("nama_lengkap", data.nama_lengkap);
  if (data.email) formData.append("email", data.email);
  if (data.no_hp) formData.append("no_hp", data.no_hp);
  if (data.foto_profile instanceof File) {
    formData.append("foto_profile", data.foto_profile);
  }

  const response = await api.post("/me/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export default api;