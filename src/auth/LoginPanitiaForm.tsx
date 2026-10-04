import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPanitiaForm: React.FC = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          login: loginInput,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal login.');
      }

      // Validasi khusus: hanya role panitia atau admin yang diizinkan masuk
      if (data.data.role !== 'panitia' && data.data.role !== 'admin') {
        setErrorMsg('Akses ditolak. Akun Anda bukan akun Panitia.');
        setLoading(false);
        return;
      }

      // Simpan session & token
      localStorage.setItem('auth_token', data.access_token);
      localStorage.setItem('user_role', data.data.role);
      localStorage.setItem('user_data', JSON.stringify(data.data));

      // Redirect ke dashboard panitia
      navigate('/panitia/dashboard');
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-wide text-blue-400">Portal Panitia SPMB</h2>
          <p className="text-sm text-slate-400 mt-1">SMK TI Bali Global Badung</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Username / ID Panitia / Email
            </label>
            <input
              type="text"
              required
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              placeholder="Masukkan ID Panitia atau Username"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 font-semibold rounded-lg shadow-md transition-all duration-200 text-sm"
          >
            {loading ? 'Memverifikasi...' : 'Masuk Khusus Panitia'}
          </button>
        </form>
      </div>
    </div>
  );
};