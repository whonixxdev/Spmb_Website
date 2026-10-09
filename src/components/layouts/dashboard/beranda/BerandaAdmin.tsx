import React, { useEffect, useState } from 'react';
import { Users, FileCheck, CreditCard, GraduationCap, RefreshCw } from 'lucide-react';
import { api } from '../../../../services/api';
import { StatCard } from '../../../ui/CardItems/StatCard';
import { QuotaCard } from '../../../ui/CardItems/QuotaCard';
import type { QuotaItem } from '../../../ui/CardItems/QuotaCard';
import { RecentTableCard } from '../../../ui/CardItems/RecentTableCard';
import type { RecentStudent } from '../../../ui/CardItems/RecentTableCard';

interface DashboardSummary {
  total_pendaftar: number;
  perlu_verifikasi: number;
  pembayaran_lunas: number;
  siswa_diterima: number;
  jurusan: QuotaItem[];
  pendaftar_terbaru: RecentStudent[];
}

export default function BerandaAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<DashboardSummary>({
    total_pendaftar: 0,
    perlu_verifikasi: 0,
    pembayaran_lunas: 0,
    siswa_diterima: 0,
    jurusan: [],
    pendaftar_terbaru: [],
  });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/dashboard/stats');
      const data = response.data?.data || response.data;
      setStats({
        total_pendaftar: data.total_pendaftar || 0,
        perlu_verifikasi: data.perlu_verifikasi || 0,
        pembayaran_lunas: data.pembayaran_lunas || 0,
        siswa_diterima: data.siswa_diterima || 0,
        jurusan: data.jurusan || [],
        pendaftar_terbaru: data.pendaftar_terbaru || [],
      });
    } catch (error) {
      try {
        const [resPendaftaran, resJurusan] = await Promise.all([
          api.get('/pendaftaran'),
          api.get('/jurusan'),
        ]);
        const pendaftaranList = resPendaftaran.data?.data || resPendaftaran.data || [];
        const jurusanList = resJurusan.data?.data || resJurusan.data || [];

        const total = pendaftaranList.length;
        const pendingVerif = pendaftaranList.filter((p: any) => p.status_verifikasi === 'pending' || p.status_verifikasi === 'belum_diunggah').length;
        const lunas = pendaftaranList.filter((p: any) => p.status_pembayaran === 'lunas' || p.status_pembayaran === 'terkonfirmasi').length;
        const diterima = pendaftaranList.filter((p: any) => p.status_kelulusan === 'lulus').length;

        const formattedJurusan: QuotaItem[] = jurusanList.map((j: any) => ({
          id_jurusan: j.id_jurusan,
          nama_jurusan: j.nama_jurusan,
          kode_jurusan: j.kode_jurusan,
          kuota: j.kuota || 0,
          terisi: pendaftaranList.filter((p: any) => p.id_jurusan_pilihan1 === j.id_jurusan).length,
        }));

        const recent: RecentStudent[] = pendaftaranList.slice(0, 5).map((p: any) => ({
          id_pendaftaran: p.id_pendaftaran,
          nama_lengkap: p.user?.biodata?.nama_lengkap || p.user?.username || 'Calon Siswa',
          jurusan: p.jurusan_pilihan1?.nama_jurusan || 'Belum Memilih',
          status_verifikasi: p.status_verifikasi || p.status_kelulusan || 'proses',
          tanggal_daftar: p.created_at ? new Date(p.created_at).toLocaleDateString('id-ID') : 'Hari ini',
        }));

        setStats({
          total_pendaftar: total,
          perlu_verifikasi: pendingVerif,
          pembayaran_lunas: lunas,
          siswa_diterima: diterima,
          jurusan: formattedJurusan,
          pendaftar_terbaru: recent,
        });
      } catch (err) {
        console.error('Gagal mengambil data dashboard:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Utama SPMB</h1>
          <p className="text-sm text-slate-500">Ringkasan statistik pendaftaran siswa baru secara real-time.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Segarkan Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Pendaftar"
          value={stats.total_pendaftar}
          subtext="Calon siswa terdaftar"
          icon={Users}
          badgeText="Aktif"
          badgeColor="bg-blue-50 text-blue-700"
          iconBgColor="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Perlu Verifikasi"
          value={stats.perlu_verifikasi}
          subtext="Berkas menunggu tinjauan"
          icon={FileCheck}
          badgeText="Pending"
          badgeColor="bg-amber-50 text-amber-700"
          iconBgColor="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Pembayaran Lunas"
          value={stats.pembayaran_lunas}
          subtext="Transaksi terverifikasi"
          icon={CreditCard}
          badgeText="Lunas"
          badgeColor="bg-emerald-50 text-emerald-700"
          iconBgColor="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Siswa Diterima"
          value={stats.siswa_diterima}
          subtext="Lolos seleksi penerimaan"
          icon={GraduationCap}
          badgeText="Lulus"
          badgeColor="bg-purple-50 text-purple-700"
          iconBgColor="bg-purple-50 text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTableCard students={stats.pendaftar_terbaru} />
        </div>
        <div className="lg:col-span-1">
          <QuotaCard data={stats.jurusan} />
        </div>
      </div>
    </div>
  );
}