import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI in .env.local')
}

let isConnected = null

export async function connectDB() {
  if (isConnected) return
  try {
    const db = await mongoose.connect(MONGODB_URI)
    isConnected = db.connections[0].readyState
    console.log('MongoDB Connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}
