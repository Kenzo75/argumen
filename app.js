// const fs = require("fs");

// const args = process.argv.slice(2);
// const action = args[0];

// if (action === "tambah") {
//     if (args.length < 5) {
//         console.log("Format salah! Gunakan: node app tambah <nama> <nohp> <email> <alamat>");
//         process.exit(1);
//     }

//     const nama = args[1];
//     const nohp = args[2];
//     const email = args[3];
//     const alamat = args[4];

//     const newData = { nama, nohp, email, alamat };

//     let data = [];
//     if (fs.existsSync("data.json")) {
//         const fileContent = fs.readFileSync("data.json", "utf-8");
//         data = JSON.parse(fileContent);
//     }

//     // Tambahkan data baru
//     data.push(newData);

//     fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

//     console.log("Data berhasil ditambahkan!");
// } else {
//     console.log("Perintah tidak dikenali! Gunakan: node app tambah <nama> <nohp> <email> <alamat>");
// }

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
    .argv;

yargs.parse();
