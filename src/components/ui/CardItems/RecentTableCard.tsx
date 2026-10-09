import React from 'react';
import { motion } from 'framer-motion';

export interface RecentStudent {
  id_pendaftaran?: number;
  nama_lengkap: string;
  jurusan: string;
  status_verifikasi: string;
  tanggal_daftar: string;
}

interface RecentTableCardProps {
  students: RecentStudent[];
}

export const RecentTableCard: React.FC<RecentTableCardProps> = ({ students }) => {
  const getBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'terverifikasi':
      case 'lulus':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      case 'pending':
      case 'proses':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'ditolak':
      case 'tidak_lulus':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800">Pendaftar Terbaru</h3>
          <p className="text-xs text-slate-400">Calon siswa yang baru saja menyelesaikan pendaftaran</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider rounded-lg">
            <tr>
              <th className="px-4 py-3 rounded-l-lg">Nama Siswa</th>
              <th className="px-4 py-3">Jurusan Pilihan</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-slate-400">
                  Belum ada data pendaftar terbaru.
                </td>
              </tr>
            ) : (
              students.map((student, idx) => (
                <tr key={student.id_pendaftaran || idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-slate-800">{student.nama_lengkap}</td>
                  <td className="px-4 py-3">{student.jurusan}</td>
                  <td className="px-4 py-3 text-slate-400">{student.tanggal_daftar}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${getBadgeClass(student.status_verifikasi)}`}>
                      {student.status_verifikasi}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};