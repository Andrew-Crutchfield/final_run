import { createPool } from 'mysql2/promise';
import config from '../config/config';

const pool = createPool(config.mysql);

export const query = async (query: string, values?: any[]) => {
  const connection = await pool.getConnection();
  try {
    const results = await connection.query(query, values);
    return results[0];
  } finally {
    connection.release();
  }
};
