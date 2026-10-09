import axios from 'axios';

export const BASE_URL: string = 'http://127.0.0.1:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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
  no_hp?: string | null;
  foto_profile?: string | null;
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
  nisn?: string | null;
  nik?: string | null;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  jenis_kelamin?: 'L' | 'P' | string | null;
  alamat?: string | null;
  no_hp?: string | null;
  no_hp_siswa?: string | null;
  no_hp_ortu?: string | null;
  asal_smp?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Berkas {
  id_berkas?: number;
  id_user: number;
  foto_ijazah?: string | null;
  foto_kk?: string | null;
  foto_pas?: string | null;
  status_verifikasi: 'belum_diunggah' | 'pending' | 'terverifikasi' | 'ditolak';
  created_at?: string;
  updated_at?: string;
}

export interface Jurusan {
  id_jurusan: number;
  nama_jurusan: string;
  kode_jurusan: string;
  kuota: number;
  terisi?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PendaftaranSpmb {
  id_pendaftaran?: number;
  no_pendaftaran?: string;
  id_user: number;
  id_jurusan_pilihan1?: number | null;
  id_jurusan_pilihan2?: number | null;
  id_biodata?: number | null;
  id_berkas?: number | null;
  nilai_tes_masuk?: number | null;
  status_kelulusan: 'proses' | 'lulus' | 'tidak_lulus';
  jurusan_diterima?: number | null;
  created_at?: string;
  updated_at?: string;
  jurusan1?: Jurusan;
  jurusan2?: Jurusan;
  jurusanDiterima?: Jurusan;
  jurusan_pilihan1?: Jurusan;
  jurusan_pilihan2?: Jurusan;
  biodata?: Biodata;
  berkas?: Berkas;
  user?: User;
}

export interface DashboardStats {
  total_pendaftar: number;
  total_lulus: number;
  total_proses: number;
  total_tidak_lulus: number;
  perlu_verifikasi: number;
  pembayaran_lunas: number;
  siswa_diterima: number;
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
  no_hp_siswa?: string;
  no_hp_ortu?: string;
  nisn?: string;
  nik?: string;
  jenis_kelamin?: 'L' | 'P' | 'Laki-laki' | 'Perempuan' | string;
  tempat_lahir?: string;
  tanggal_lahir?: string;
  alamat?: string;
  asal_smp?: string;
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

  const appendIfPresent = (key: string, value?: string) => {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      formData.append(key, value);
    }
  };

  appendIfPresent("username", data.username);
  appendIfPresent("nama_lengkap", data.nama_lengkap);
  appendIfPresent("email", data.email);
  appendIfPresent("no_hp", data.no_hp);
  appendIfPresent("nisn", data.nisn);
  appendIfPresent("nik", data.nik);
  appendIfPresent("tempat_lahir", data.tempat_lahir);
  appendIfPresent("tanggal_lahir", data.tanggal_lahir);
  appendIfPresent("alamat", data.alamat);

  if (data.jenis_kelamin) {
    let jk = data.jenis_kelamin;
    if (jk === 'Laki-laki') jk = 'L';
    if (jk === 'Perempuan') jk = 'P';
    appendIfPresent("jenis_kelamin", jk);
  }

  if (data.foto_profile instanceof File) {
    formData.append("foto_profile", data.foto_profile);
  }

  const response = await api.post("/me/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const pilihJurusan = async (idJurusan1: number, idJurusan2?: number) => {
  const response = await api.post('/pendaftaran/pilih-jurusan', {
    id_jurusan_pilihan1: idJurusan1,
    id_jurusan_pilihan2: idJurusan2 || null,
  });
  return response.data;
};

export const uploadBerkas = async (payload: { foto_ijazah?: File; foto_kk?: File; foto_pas?: File }) => {
  const formData = new FormData();
  if (payload.foto_ijazah) formData.append('foto_ijazah', payload.foto_ijazah);
  if (payload.foto_kk) formData.append('foto_kk', payload.foto_kk);
  if (payload.foto_pas) formData.append('foto_pas', payload.foto_pas);

  const response = await api.post('/berkas/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const konfirmasiPembayaran = async (buktiFile?: File) => {
  const formData = new FormData();
  if (buktiFile) formData.append('bukti_pembayaran', buktiFile);

  const response = await api.post('/pembayaran/konfirmasi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats');
  return (response.data.data || response.data) as DashboardStats;
};

export const getRecentPendaftaran = async (): Promise<PendaftaranSpmb[]> => {
  const response = await api.get('/pendaftaran/recent');
  return (response.data.data || response.data) as PendaftaranSpmb[];
};

export default api;