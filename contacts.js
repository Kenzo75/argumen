const fs = require("fs");
const chalk = require("chalk");

const simpanContact = (nama, nohp, email, alamat) => {
    let kontak = [];

    if (fs.existsSync("data.json")) {
        kontak = JSON.parse(fs.readFileSync("data.json", "utf-8"));
    }

    const duplikat = kontak.find((kontak) => kontak.nohp === nohp);
    if (duplikat) {
        console.log(chalk.red("❌ Nomor HP sudah digunakan!!"));
        return false;
    }

    const data = { nama, nohp, email, alamat };
    kontak.push(data);
    fs.writeFileSync("data.json", JSON.stringify(kontak, null, 2));

    console.log(chalk.green("✅ Kontak berhasil disimpan!"));
    return true;
};

module.exports = { simpanContact };
