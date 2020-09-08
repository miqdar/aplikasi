const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

const sqlite3 = require('sqlite3').verbose()
const dbfile = __dirname + "/db/university.db"
let db = new sqlite3.Database(dbfile, sqlite3.OPEN_READWRITE);


class Opsi {
    addr() {
        return `======================================================
Welcome to Universitas Pendidikan Indonesia
Jl. Setiabudhi  no.255 Bandung
======================================================`
    }
    mainmenu() {
        return `======================================================
Silahkan pilih opsi dibawah ini
[1] Mahasiswa
[2] Jurusan
[3] Dosen
[4] Mata Kuliah
[5] Kontrak
[6] Keluar
======================================================`
    }
    menu(data) {
        return `======================================================
Silahkan pilih opsi dibawah ini
[1] Daftar ${data}
[2] Cari ${data}
[3] Tambah ${data}
[4] Hapus ${data}
[5] Kembali
======================================================`
    }
}


class Mahasiswa {
    read() {
        console.log('======================================================')
        let table = new Table({ head: ['NIM', 'Nama', 'Alamat', 'ID Jurusan', 'Umur'] })
        db.serialize(function () {

            let sql = "SELECT * FROM mahasiswa";
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        table.push([`${row.nim}`, `${row.nama}`, `${row.alamat}`, `${row.id_jurusan}`, `${row.umur}`]);
                    });
                    console.log(table.toString())
                } else {
                    console.log("tidak ada data/hasil");
                }
                subMenu("mahasiswa")
            });
        });
    }

    browse(data) {
        let table = new Table({ head: ['NIM', 'Nama', 'Alamat', 'ID Jurusan', 'Umur'] })
        rl.question('Masukan NIM yg anda cari > ', (answer) => {
            console.log('======================================================')
            db.serialize(function () {
                let sql = "SELECT * FROM mahasiswa WHERE nim=?";
                let nim = answer;
                db.get(sql, [nim], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        table.push([`${row.nim}`, `${row.nama}`, `${row.alamat}`, `${row.id_jurusan}`, `${row.umur}`]);
                        console.log(table.toString())
                    } else {
                        console.log(`Mahasiswa dengan Nim ${data} tidak terdaftar`)
                    }
                    subMenu("mahasiswa")
                });

            })
        })
    }

    add(data) {
        let table = new Table({ head: ['NIM', 'Nama', 'Alamat', 'ID Jurusan', 'Umur'] })
        console.log('Lengkapi data dibawah ini :')
        rl.question('NIM: ', (nim) => {
            rl.question('Nama: ', (nama) => {
                rl.question('Alamat: ', (alamat) => {
                    rl.question('Kode Jurusan: ', (id_jurusan) => {
                        rl.question('Umur: ', (umur) => {
                            console.log('======================================================')
                            db.serialize(function () {
                                let sql = `INSERT INTO mahasiswa (nim,nama,alamat,id_jurusan,umur) values ('${nim}','${nama}','${alamat}','${id_jurusan}','${umur}')`;
                                db.run(sql, (err) => {
                                    if (err) throw err;
                                });
                            })
                            db.serialize(function () {
                                let sql = "SELECT * FROM mahasiswa";
                                db.all(sql, (err, rows) => {
                                    if (err) throw err;
                                    if (rows) {
                                        rows.forEach(row => {
                                            table.push([`${row.nim}`, `${row.nama}`, `${row.alamat}`, `${row.id_jurusan}`, `${row.umur}`]);
                                        });
                                        console.log(table.toString())
                                    } else {
                                        console.log("tidak ada data/hasil");
                                    }
                                    subMenu("mahasiswa")
                                });
                            })
                        })
                    })
                })
            })
        })
    }
    delete(data) {
        let table = new Table({ head: ['NIM', 'Nama', 'Alamat', 'ID Jurusan', 'Umur'] })
        rl.question('Masukan NIM mahasiswa yg akan dihapus: ', (nim) => {
            db.serialize(function () {
                let sql = `DELETE FROM mahasiswa WHERE nim=?`;
                let nim2 = nim;
                db.run(sql, [nim2], (err) => {
                    if (!err) console.log(`Mahasiswa dengan ${nim} telah dihapus.`);
                });
                db.serialize(function () {
                    let sql = "SELECT * FROM mahasiswa";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.nim}`, `${row.nama}`, `${row.alamat}`, `${row.id_jurusan}`, `${row.umur}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil");
                        }
                        subMenu("mahasiswa")
                    });
                })
            });
        })
    }
}

class Jurusan {
    read() {
        console.log('======================================================')
        let table = new Table({ head: ['ID_Jurusan', 'Nama'] })
        db.serialize(function () {
            let sql = "SELECT * FROM jurusan";
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        table.push([`${row.id_jurusan}`, `${row.nama}`]);
                    });
                    console.log(table.toString())
                } else {
                    console.log("tidak ada data/hasil");
                }
                subMenu("jurusan")
            });
        });
    }
    browse(data) {
        let table = new Table({ head: ['ID_Jurusan', 'Nama'] })
        rl.question('Masukan ID_Jurusan yg anda cari > ', (answer) => {
            console.log('======================================================')
            db.serialize(function () {
                let sql = "SELECT * FROM jurusan WHERE id_jurusan=?";
                let nim = answer;
                db.get(sql, [nim], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        table.push([`${row.id_jurusan}`, `${row.nama}`]);
                        console.log(table.toString())
                    } else {
                        console.log(`Maaf ID_Jurusan tidak terdaftar`)
                    }
                    subMenu("jurusan")
                });

            })
        })
    }

    add(data) {
        let table = new Table({ head: ['ID_Jurusan', 'Nama'] })
        console.log('Lengkapi data dibawah ini :')
        rl.question('ID_Jurusan: ', (idjurusan) => {
            rl.question('Nama Jurusan: ', (nama) => {
                console.log('======================================================')
                db.serialize(function () {
                    let sql = `INSERT INTO jurusan (id_jurusan,nama) values ('${idjurusan}','${nama}')`;
                    db.run(sql, (err) => {
                        if (err) throw err;
                    });
                })
                db.serialize(function () {
                    let sql = "SELECT * FROM jurusan";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.id_jurusan}`, `${row.nama}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil");
                        }
                        subMenu("jurusan")
                    });
                })
            })
        })
    }
    delete(data) {
        let table = new Table({ head: ['ID_Jurusan', 'Nama'] })
        rl.question('Masukan ID_Jurusan yg akan dihapus: ', (nim) => {
            db.serialize(function () {
                let sql = `DELETE FROM jurusan WHERE id_jurusan=?`;
                let nim2 = nim;
                db.run(sql, [nim2], (err) => {
                    if (!err) console.log(`ID_Jurusan ${nim} telah dihapus.`);
                });
                db.serialize(function () {
                    let sql = "SELECT * FROM jurusan";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.id_jurusan}`, `${row.nama}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil");
                        }
                        subMenu("jurusan")
                    });
                })
            });
        })
    }
}


class Dosen {
    read() {
        console.log('======================================================')
        let table = new Table({ head: ['ID_Dosen', 'Nama'] })
        db.serialize(function () {
            let sql = "SELECT * FROM dosen";
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        table.push([`${row.id_dosen}`, `${row.nama}`]);
                    });
                    console.log(table.toString())
                } else {
                    console.log("tidak ada data/hasil");
                }
                subMenu("dosen")
            });
        });
    }
    browse(data) {
        let table = new Table({ head: ['ID_Dosen', 'Nama'] })
        rl.question('Masukan ID_Dosen yg anda cari > ', (answer) => {
            console.log('======================================================')
            db.serialize(function () {
                let sql = "SELECT * FROM jurusan WHERE id_dosen=?";
                let nim = answer;
                db.get(sql, [nim], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        table.push([`${row.id_dosen}`, `${row.nama}`]);
                        console.log(table.toString())
                    } else {
                        console.log(`Maaf ID_Dosen tidak terdaftar`)
                    }
                    subMenu("dosen")
                });

            })
        })
    }

    add(data) {
        let table = new Table({ head: ['ID_Dosen', 'Nama'] })
        console.log('Lengkapi data dibawah ini :')
        rl.question('ID_Dosen: ', (iddosen) => {
            rl.question('Nama Dosen: ', (nama) => {
                console.log('======================================================')
                db.serialize(function () {
                    let sql = `INSERT INTO jurusan (id_dosen,nama) values ('${iddosen}','${nama}')`;
                    db.run(sql, (err) => {
                        if (err) throw err;
                    });
                })
                db.serialize(function () {
                    let sql = "SELECT * FROM dosen";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.id_dosen}`, `${row.nama}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil");
                        }
                        subMenu("dosen")
                    });
                })
            })
        })
    }
    delete(data) {
        let table = new Table({ head: ['ID_Dosen', 'Nama'] })
        rl.question('Masukan ID_Dosen yg akan dihapus: ', (nim) => {
            db.serialize(function () {
                let sql = `DELETE FROM dosen WHERE id_dosen=?`;
                let nim2 = nim;
                db.run(sql, [nim2], (err) => {
                    if (!err) console.log(`ID_Dosen ${nim} telah dihapus.`);
                });
                db.serialize(function () {
                    let sql = "SELECT * FROM dosen";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.id_dosen}`, `${row.nama}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil")
                        }
                        subMenu("dosen")
                    })
                })
            })
        })
    }
}


class mataKuliah {
    read() {
        console.log('======================================================')
        let table = new Table({ head: ['ID_Matkul', 'Nama', 'Sks'] })
        db.serialize(function () {
            let sql = "SELECT * FROM matakuliah";
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        table.push([`${row.id_matkul}`, `${row.nama}`, `${row.sks}`]);
                    });
                    console.log(table.toString())
                } else {
                    console.log("tidak ada data/hasil");
                }
                subMenu("matakuliah")
            });
        });
    }
    browse(data) {
        let table = new Table({ head: ['ID_Matkul', 'Nama', 'Sks'] })
        rl.question('Masukan ID Mata Kuliah yg anda cari > ', (answer) => {
            console.log('======================================================')
            db.serialize(function () {
                let sql = "SELECT * FROM matakuliah WHERE id_matkul=?";
                let nim = answer;
                db.get(sql, [nim], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        table.push([`${row.nim}`, `${row.id_matkul}`, `${row.nama}`, `${row.sks}`]);
                        console.log(table.toString())
                    } else {
                        console.log(`Mata Kuliah dengan ID ${data} tidak terdaftar`)
                    }
                    subMenu("matakuliah")
                });

            })
        })
    }

    add(data) {
        let table = new Table({ head: ['ID_Matkul', 'Nama', 'Sks'] })
        console.log('Lengkapi data dibawah ini :')
        rl.question('ID Mata Kuliah: ', (nim) => {
            rl.question('Nama: ', (nama) => {
                rl.question('Jumlah Sks: ', (alamat) => {
                    console.log('======================================================')
                    db.serialize(function () {
                        let sql = `INSERT INTO matakuliah (id_matkul,nama,sks) values ('${nim}','${nama}','${alamat}')`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                        });
                    })
                    db.serialize(function () {
                        let sql = "SELECT * FROM matakuliah";
                        db.all(sql, (err, rows) => {
                            if (err) throw err;
                            if (rows) {
                                rows.forEach(row => {
                                    table.push([`${row.nim}`, `${row.id_matkul}`, `${row.nama}`, `${row.sks}`]);
                                });
                                console.log(table.toString())
                            } else {
                                console.log("tidak ada data/hasil");
                            }
                            subMenu("matakuliah")
                        });
                    })
                })
            })
        })
    }
    delete(data) {
        let table = new Table({ head: ['ID_Matkul', 'Nama', 'Sks'] })
        rl.question('Masukan ID Mata Kuliah yg akan dihapus: ', (nim) => {
            db.serialize(function () {
                let sql = `DELETE FROM matakuliah WHERE id_matkul=?`;
                let nim2 = nim;
                db.run(sql, [nim2], (err) => {
                    if (!err) console.log(`ID Mata Kuliah dengan ID ${nim} telah dihapus.`);
                });
                db.serialize(function () {
                    let sql = "SELECT * FROM matakuliah";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.id_matkul}`, `${row.nama}`, `${row.sks}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil");
                        }
                        subMenu("matakuliah")
                    });
                })
            });
        })
    }
}


class Kontrak {
    read() {
        console.log('======================================================')
        let table = new Table({ head: ['ID_Krs', 'Nim', 'ID_Matkul', 'Nilai'] })
        db.serialize(function () {
            let sql = "SELECT * FROM krs";
            db.all(sql, (err, rows) => {
                if (err) throw err;
                if (rows) {
                    rows.forEach(row => {
                        table.push([`${row.id_krs}`, `${row.nim}`, `${row.id_matkul}`, `${row.nilai}`]);
                    });
                    console.log(table.toString())
                } else {
                    console.log("tidak ada data/hasil");
                }
                subMenu("kontrak")
            });
        });
    }
    browse(data) {
        let table = new Table({ head: ['ID_Krs', 'Nim', 'ID_Matkul', 'Nilai'] })
        rl.question('Masukan ID Krs yg anda cari > ', (answer) => {
            console.log('======================================================')
            db.serialize(function () {
                let sql = "SELECT * FROM krs WHERE id_krs=?";
                let nim = answer;
                db.get(sql, [nim], (err, row) => {
                    if (err) throw err;
                    if (row) {
                        table.push([`${row.id_krs}`, `${row.nim}`, `${row.id_matkul}`, `${row.nilai}`]);
                        console.log(table.toString())
                    } else {
                        console.log(`ID Krs tidak terdaftar`)
                    }
                    subMenu("kontrak")
                });

            })
        })
    }

    add(data) {
        let table = new Table({ head: ['ID_Krs', 'Nim', 'ID_Matkul', 'ID_Dosen', 'Nilai'] })
        console.log('Lengkapi data dibawah ini :')
        rl.question('ID Krs: ', (nim) => {
            rl.question('NIM: ', (nama) => {
                rl.question('ID Mata Kuliah: ', (alamat) => {
                    rl.question('ID Dosen: ', (id_jurusan) => {
                        rl.question('Nilai: ', (umur) => {
                            console.log('======================================================')
                            db.serialize(function () {
                                let sql = `INSERT INTO krs (id_krs,nim,id_matkul,id_dosen,nilai) values ('${nim}','${nama}','${alamat}','${id_jurusan}','${umur}')`;
                                db.run(sql, (err) => {
                                    if (err) throw err;
                                });
                            })
                            db.serialize(function () {
                                let sql = "SELECT * FROM krs";
                                db.all(sql, (err, rows) => {
                                    if (err) throw err;
                                    if (rows) {
                                        rows.forEach(row => {
                                            table.push([`${row.id_krs}`, `${row.nim}`, `${row.id_matkul}`, `${row.id_dosen}`, `${row.nilai}`]);
                                        });
                                        console.log(table.toString())
                                    } else {
                                        console.log("tidak ada data/hasil");
                                    }
                                    subMenu("kontrak")
                                });
                            })
                        })
                    })
                })
            })
        })
    }
    delete(data) {
        let table = new Table({ head: ['ID_Krs', 'Nim', 'ID_Matkul', 'Nilai'] })
        rl.question('Masukan ID Krs yg akan dihapus: ', (nim) => {
            db.serialize(function () {
                let sql = `DELETE FROM krs WHERE id_krs=?`;
                let nim2 = nim;
                db.run(sql, [nim2], (err) => {
                    if (!err) console.log(`ID Krs ${nim} telah dihapus.`);
                });
                db.serialize(function () {
                    let sql = "SELECT * FROM krs";
                    db.all(sql, (err, rows) => {
                        if (err) throw err;
                        if (rows) {
                            rows.forEach(row => {
                                table.push([`${row.id_krs}`, `${row.nim}`, `${row.id_matkul}`, `${row.nilai}`]);
                            });
                            console.log(table.toString())
                        } else {
                            console.log("tidak ada data/hasil");
                        }
                        subMenu("kontrak")
                    });
                })
            });
        })
    }
}


const Table = require('cli-table3');
const mhs = new Mahasiswa()
const jurusan = new Jurusan()
const dosen = new Dosen()
const matakuliah = new mataKuliah()
const kontrak = new Kontrak()
const opsi = new Opsi()
console.log(opsi.addr())


rl.question("Username : ", function (name) {
    console.log('======================================================')
    rl.question("Password : ", function (pass) {
        db.serialize(function () {
            let sql = "SELECT * FROM user WHERE user=? AND password =?";
            db.get(sql, [name, pass], (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`======================================================`)
                    console.log(`Welcome, ${row.user} Your Access Level is : ${row.level}`)
                    getMenu()
                } else {
                    console.log("Maaf, username atau password yang anda masukkan salah, silahkan ulangi!")
                    process.exit(0)
                }
            })
        })
    });
});


function getMenu() {
    console.log(opsi.mainmenu())
    rl.question('Masukan pilihan anda > ', (answer) => {
        switch (answer) {
            case '1':
                var selected = "mahasiswa";
                subMenu(selected)
                break;
            case '2':
                selected = "jurusan";
                subMenu(selected)   // pilih jurusan
                break;
            case '3':
                selected = "dosen";
                subMenu(selected)
                break;
            case '4':
                selected = "matakuliah";
                subMenu(selected)
                break;
            case '5':
                selected = "kontrak";
                subMenu(selected)
                break;
            case '6':
                console.log("kamu telah keluar.")
                console.log(opsi.addr())
                process.exit(0)
            default:
                console.log("maaf pilihan anda tidak dikenal. Silahkan ulangi lagi!")
                process.exit(0)
        }
    })
}

function subMenu(selected) {
    console.log(opsi.menu(selected))

    rl.question('Masukan pilihan anda > ', (answer) => {
        switch (answer.trim()) {
            case '1':
                if (selected == "mahasiswa") {
                    mhs.read()
                } else if (selected == "jurusan") {
                    jurusan.read()
                } else if (selected == "dosen") {
                    dosen.read()
                } else if (selected == "matakuliah") {
                    matakuliah.read()
                } else if (selected == "kontrak") {
                    kontrak.read()
                }
                break;
            case '2':
                console.log('======================================================')
                if (selected == "mahasiswa") {
                    mhs.browse()
                } else if (selected == "jurusan") {
                    jurusan.browse()
                } else if (selected == "dosen") {
                    dosen.browse()
                } else if (selected == "matakuliah") {
                    matakuliah.browse()
                } else if (selected == "kontrak") {
                    kontrak.browse()
                }
                break;
            case '3':
                console.log('======================================================')
                if (selected == "mahasiswa") {
                    mhs.add()
                } else if (selected == "jurusan") {
                    jurusan.add()
                } else if (selected == "dosen") {
                    dosen.add()
                } else if (selected == "matakuliah") {
                    matakuliah.add()
                } else if (selected == "kontrak") {
                    kontrak.add()
                }
                break;
            case '4':
                console.log('======================================================')
                if (selected == "mahasiswa") {
                    mhs.delete()
                } else if (selected == "jurusan") {
                    jurusan.delete()
                } else if (selected == "dosen") {
                    dosen.delete()
                } else if (selected == "matakuliah") {
                    matakuliah.delete()
                } else if (selected == "kontrak") {
                    kontrak.delete()
                }
                break;
            case '5':
                return getMenu()
            default:
                console.log("maaf pilihan anda tidak dikenal. Silahkan ulangi lagi!")
                process.exit(0)
        }
    })
}




