const fs = require('fs');

if (process.argv[2] == "add") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            let task_content = "";
            let status = "[]";
            for (i = 3; i < process.argv.length; i++) {
                task_content += process.argv[i] + " ";
            }
            obj.daftar.push({ "status": status, "task_content": task_content.trim(), "date": new Date(), "tag": [] });
            fs.writeFileSync('data2.json', JSON.stringify(obj, null, 2), 'utf8');
            console.log(`'${task_content.trim()}' telah ditambahkan.`)
        }
    });
} else if (process.argv[2] == "list") {
    fs.readFile('data2.json', 'utf8', (err, data) => {
        obj = JSON.parse(data);
        i = 1;
        for (let isi of obj.daftar) {
            console.log(i++ + ".", isi.status, isi.task_content)
        }
    });
} else if (process.argv[2] == "delete") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        console.log(obj.daftar[process.argv[3] - 1].task_content + " telah dihapus dari daftar.")
        obj.daftar.splice(process.argv[3] - 1, 1)
        fs.writeFileSync('data2.json', JSON.stringify(obj, null, 2), 'utf8');
    });
} else if (process.argv[2] == "complete") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        obj.daftar[process.argv[3] - 1] = { "status": "[X]", "task_content": obj.daftar[process.argv[3] - 1].task_content, "date": new Date() }
        fs.writeFileSync('data2.json', JSON.stringify(obj, null, 2), 'utf8');
        console.log(`"${obj.daftar[process.argv[3] - 1].task_content}" telah selesai.`)
    });
} else if (process.argv[2] == "uncomplete") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        obj.daftar[process.argv[3] - 1] = { "status": "[]", "task_content": obj.daftar[process.argv[3] - 1].task_content, "date": new Date() }
        fs.writeFileSync('data2.json', JSON.stringify(obj, null, 2), 'utf8');
        console.log(`"${obj.daftar[process.argv[3] - 1].task_content}" status selesai dibatalkan.`)
    });
} else if (process.argv[2] == "list:outstanding") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        if (process.argv[3] == "desc") {
            let newArray = obj.daftar.filter(function (el) { return el.status == "[]" });
            let urut = newArray.sort(function (a, b) { return b.date.localeCompare(a.date) });
            i = 1;
            for (let isi of urut) {
                console.log(i++ + ".", isi.status, isi.task_content)
            }
        } else {
            let newArray = obj.daftar.filter(function (el) { return el.status == "[]" });
            let urut = newArray.sort(function (a, b) { return a.date.localeCompare(b.date) });
            i = 1;
            for (let isi of urut) {
                console.log(i++ + ".", isi.status, isi.task_content)
            }
        }
    });
} else if (process.argv[2] == "list:completed") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        if (process.argv[3] == "desc") {
            let newArray = obj.daftar.filter(function (el) { return el.status == "[X]" });
            let urut = newArray.sort(function (a, b) { return a.date.localeCompare(b.date) });
            i = 1;
            for (let isi of urut) {
                console.log(i++ + ".", isi.status, isi.task_content)
            }
        } else {
            let newArray = obj.daftar.filter(function (el) { return el.status == "[X]" });
            let urut = newArray.sort(function (a, b) { return a.date.localeCompare(b.date) });
            i = 1;
            for (let isi of urut) {
                console.log(i++ + ".", isi.status, isi.task_content)
            }
        }
    });
} else if (process.argv[2].charAt(0) == "f") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        let spli = process.argv[2].substr(7)
        let filterin = obj.daftar.filter(function (item) { return item.tag.indexOf(spli) > -1; })
        i = 1;
        for (let isi of filterin) {
            console.log(i++ + ".", isi.status, isi.task_content)
        }
    });
} else if (process.argv[2] == "tag") {
    fs.readFile('data2.json', 'utf8', function bebas(err, data) {
        obj = JSON.parse(data);
        obj.daftar[process.argv[3] - 1].tag.push(process.argv[4])
        json = JSON.stringify(obj, null, 2);
        fs.writeFileSync('data2.json', json, 'utf8');
        console.log(`Tag '${process.argv[4]}' telah ditambahkan ke daftar '${obj.daftar[process.argv[3] - 1].task_content}'.`)
    });
} else if (process.argv[2] == "help") {
    console.log(">>> JS TODO <<<");
    console.log("node todo.js <commannd>");
    console.log("node todo.js list");
    console.log("node todo.js task <task_id>");
    console.log("node todo.js add <task_content>");
    console.log("node todo.js delete <task_id>");
    console.log("node todo.js uncomplete <task_id>");
    console.log("node todo.js list:outstanding asc|desc");
    console.log("node todo.js list:complete asc|desc");
    console.log("node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>");
    console.log("node todo.js filter:<tag_name>\n");
} else {
    console.log("Silahkan ketikan perintah!\nContoh: help")
}