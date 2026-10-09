
import React from 'react';
import { motion } from 'framer-motion';

export interface QuotaItem {
  id_jurusan: number;
  nama_jurusan: string;
  kode_jurusan: string;
  kuota: number;
  terisi: number;
}

interface QuotaCardProps {
  data: QuotaItem[];
}

export const QuotaCard: React.FC<QuotaCardProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800">Kuota Per Jurusan</h3>
          <p className="text-xs text-slate-400">Persentase keterisian daya tampung SPMB</p>
        </div>
      </div>
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">Belum ada data jurusan.</p>
        ) : (
          data.map((item) => {
            const percentage = item.kuota > 0 ? Math.min(Math.round((item.terisi / item.kuota) * 100), 100) : 0;
            return (
              <div key={item.id_jurusan} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span>{item.nama_jurusan} ({item.kode_jurusan})</span>
                  <span className="text-slate-500">{item.terisi} / {item.kuota} ({percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
};