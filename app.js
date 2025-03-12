const contacts = require(`./contacts`);
const yargs = require("yargs");

yargs
    .command({
        command: "tambah",
        describe: "Menambahkan kontak baru",
        builder: {
            nama: { describe: "Nama kontak", demandOption: true, type: "string" },
            nohp: { describe: "Nomor HP", demandOption: true, type: "string" },
            email: { describe: "Email", demandOption: true, type: "string" },
            alamat: { describe: "Alamat", demandOption: true, type: "string" },
        },
        handler(argv) {
            const data = {
                nama: argv.nama,
                nohp: argv.nohp,
                email: argv.email,
                alamat: argv.alamat,
            };
            contacts.simpanContact(argv.nama, argv.nohp, argv.email, argv.alamat);
            console.log(data);
        },
    })
    .help()
    .demandCommand()
    .argv;

yargs
    .command({
        command: `list`,
        describe: `Menampilkan kontak`,
        handler() {
            contacts.listContact();
        }
    })

yargs
    .command({
        command: `detail`,
        describe: `Menampilkan Detail Data`,
        builder: {
            nama: { describe: "Nama kontak", demandOption: true, type: "string" },
        },
        handler(argv) {
            contacts.detailContact(argv.nama)
        },
    })

yargs
    .command({
        command: `hapus`,
        describe: `Menghapus Data`,
        builder: {
            nama: { describe: "Nama kontak", demandOption: true, type: "string" },
        },
        handler(argv) {
            contacts.hapusContact(argv.nama)
        },
    })
yargs
    .command({
        command: "update",
        describe: "Memperbarui kontak",
        builder: {
            nama: { describe: "Nama kontak yang ingin diperbarui", demandOption: true, type: "string" },
            nohp: { describe: "Nomor HP baru", type: "string" },
            email: { describe: "Email baru", type: "string" },
            alamat: { describe: "Alamat baru", type: "string" },
        },
        handler(argv) {
            const newData = {};
            if (argv.nohp) newData.nohp = argv.nohp;
            if (argv.email) newData.email = argv.email;
            if (argv.alamat) newData.alamat = argv.alamat;

            contacts.updateContact(argv.nama, newData);
        },
    });

yargs.parse();

