import dns from 'dns';
import mongoose from 'mongoose';

// Some ISP DNS resolvers fail MongoDB SRV lookups (querySrv ECONNREFUSED).
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gokula_portfolio';
  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
};
