const express = require("express");
const cors = require("cors"); // Import CORS
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const app = express();

// Gunakan CORS agar frontend bisa mengakses backend
app.use(cors());
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth() // Menyimpan sesi login
});

client.on("qr", (qr) => {
    console.log("Scan QR Code ini di WhatsApp Web:");
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("WhatsApp bot siap digunakan!");
});

client.initialize();

// Endpoint untuk mengirim pesan WhatsApp
app.post("/send-message", async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: "Nomor dan pesan wajib diisi!" });
    }

    try {
        await client.sendMessage(`${phone}@c.us`, message);
        res.json({ success: true, message: "Pesan berhasil dikirim!" });
    } catch (error) {
        res.status(500).json({ error: "Gagal mengirim pesan", details: error });
    }
});

// Jalankan server di port 3001
app.listen(3001, () => {
    console.log("Server berjalan di http://localhost:3001");
});
