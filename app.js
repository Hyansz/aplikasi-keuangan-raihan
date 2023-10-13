const express = require("express");

const { connectionDB } = require("./mongodbGateway");

const uri =
    "mongodb+srv://raihanregitappqita:R4ihanregita@ppqitadb.ebdkl0n.mongodb.net/";

let myCollection, myClient;

const initDB = async () => {
    try {
        const { collection, client } = await connectionDB(
            uri,
            "keuangan",
            "users"
        );

        myCollection = collection;
        myClient = client;
        console.log("server db berjalan");
    } catch (error) {
        console.log(error);
    }
};

initDB();

const app = express();

app.use(express.json());
app.use(express.static('./public'))

app.post("/tambah_barang", async (req, res) => {
    try {
        console.log(req.body);
    
        let { nama_barang, harga, tanggal_pembelian } = req.body;
        const insertManyResult = await myCollection.insertOne(req.body);
    
        console.log(` document successfully inserted.\n`, insertManyResult);
        res.send(`
            Berhasil Menambahkan:
            - ${nama_barang}
            - Rp ${harga}
            - ${tanggal_pembelian}
        `);
    } catch (err) {
        if (err) {
            res.status(500).send("Terjadi kesalahan saat menyimpan data");
        } else {
            res.status(200).send("Data berhasil disimpan");
        }
    }
});

app.listen(3000, () => {
    console.log("server jalan di http://localhost:3000");
});
