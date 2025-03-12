const fs = require("fs");
const chalk = require("chalk");

const dataPath = "data.json";

const loadContact = () => {
    try {
        if (!fs.existsSync(dataPath)) {
            return [];
        }
        const file = fs.readFileSync(dataPath, "utf-8");
        return JSON.parse(file);
    } catch (error) {
        console.log(chalk.red("Gagal membaca data, kemungkinan file rusak!"));
        return [];
    }
};

const detailContact = (nama) => {
    const kontaks = loadContact();
    const kontak = kontaks.find(
        (kontak) => kontak.nama.toLowerCase() === nama.toLowerCase()
    );
    if (!kontak) {
        console.log(chalk.red(`Kontak dengan nama "${nama}" tidak ditemukan.`));
        return false;
    }
    console.log(kontak.nama);
    console.log(kontak.email);
    console.log(kontak.nohp);
    console.log(kontak.alamat);
}

const hapusContact = (nama) => {
    const kontaks = loadContact();
    const newKontak = kontaks.filter(
        (kontak) => kontak.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (kontaks.length === newKontak.length) {
        console.log(`${nama} tidak ditemukan`);
        return false;
    }

    fs.writeFileSync(`contact.json`, JSON.stringify(newKontak));
    console.log(`${nama} berhasil di hapus`)
}

const updateContact = (nama, newData) => {
    const kontaks = loadContact();
    let kontakIndex = kontaks.findIndex((kontak) => kontak.nama.toLowerCase() === nama.toLowerCase());

    if (kontakIndex === -1) {
        console.log(chalk.red(`Kontak dengan nama "${nama}" tidak ditemukan.`));
        return false;
    }

    kontaks[kontakIndex] = { ...kontaks[kontakIndex], ...newData };

    fs.writeFileSync(`data.json`, JSON.stringify(kontaks, null, 2));

    console.log(chalk.green(`Kontak "${nama}" berhasil diperbarui.`));

}

const listContact = () => {
    const kontaks = loadContact();
    if (kontaks.length === 0) {
        console.log(chalk.yellow("Tidak ada kontak yang tersimpan."));
        return;
    }
    console.log(chalk.blue("📜 Daftar Kontak:"));
    kontaks.forEach((kontak, i) => {
        console.log(`${i + 1}. ${chalk.green(kontak.nama)} - ${chalk.cyan(kontak.nohp)}`);
    });
};

const simpanContact = (nama, nohp, email, alamat) => {
    let kontak = loadContact();

    const duplikat = kontak.find((kontak) => kontak.nohp === nohp);
    if (duplikat) {
        console.log(chalk.red("Nomor HP sudah digunakan!!"));
        return false;
    }

    const data = { nama, nohp, email, alamat };
    kontak.push(data);

    fs.writeFileSync(dataPath, JSON.stringify(kontak, null, 2));

    console.log(chalk.green("Kontak berhasil disimpan!"));
    return true;
};

module.exports = { simpanContact, loadContact, listContact, detailContact, hapusContact, updateContact };
