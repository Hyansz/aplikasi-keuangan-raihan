document
    .getElementById("form_barang")
    .addEventListener("submit", async (event) => {
        event.preventDefault();

        const nama_barang = document.getElementById("nama_barang").value;
        const harga = document.getElementById("harga").value;
        const tanggal_pembelian =
            document.getElementById("tanggal_pembelian").value;

        const response = await fetch("/tambah_barang", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nama_barang, harga, tanggal_pembelian }),
        });

        const result = await response.text();
        alert(result);
    });
