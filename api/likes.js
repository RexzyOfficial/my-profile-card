import Redis from "ioredis";

// koneksi ke Redis Upstash pakai URL dari .env
const redis = new Redis(process.env.KV_REDIS_URL);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Ambil jumlah like
      const likes = (await redis.get("likes")) || 0;
      return res.status(200).json({ likes: Number(likes) });
    }

    if (req.method === "POST") {
      // Tambah like
      const likes = await redis.incr("likes");
      return res.status(200).json({ likes });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Redis error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}