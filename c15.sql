-- 1. select mahasiswa serta jurusannya --
select mahasiswa.nim, mahasiswa.nama, mahasiswa.alamat, jurusan.nama
from mahasiswa INNER JOIN jurusan on jurusan.id_jurusan = mahasiswa.id_jurusan;

-- 2. select mahasiswa yg umur < 20 thn
alter table mahasiswa add COLUMN umur int;
update mahasiswa set umur=20 WHERE nim = 'M0001';
update mahasiswa set umur=22 WHERE nim = 'M0002';
update mahasiswa set umur=19 WHERE nim = 'M0003';
SELECT * FROM mahasiswa WHERE umur < 20;

-- 3. select mahasiswa yg nilai nya B keatas --
SELECT mahasiswa.nim, mahasiswa.nama, krs.id_matkul, krs.nilai 
from mahasiswa INNER JOIN krs ON krs.nim = mahasiswa.nim WHERE nilai <= 'B';

-- 4. select mahasiswa yg punya sks > 10
select mahasiswa.nim, mahasiswa.nama, sum(matakuliah.sks) jumlah_sks 
from mahasiswa 
LEFT JOIN krs on mahasiswa.nim = krs.nim 
LEFT JOIN matakuliah on krs.id_matkul = matakuliah.id_matkul 
group by mahasiswa.nim HAVING sum(matakuliah.sks) > 10;


-- 5. select mahassiswa yg ambil "Data Mining"
select mahasiswa.nim, mahasiswa.nama, matakuliah.nama, matakuliah.sks, krs.nilai 
FROM mahasiswa JOIN krs USING (nim) JOIN matakuliah USING (id_matkul) where matakuliah.id_matkul = 'DM' ;

-- 6. jumlah mahasiswa utk setiap dosen
select dosen.nama, count(krs.nim) jumlah_mahasiswa 
from dosen LEFT JOIN krs on dosen.id_dosen = krs.id_dosen 
group by dosen.id_dosen;


-- 7. urutkan mahasiswa berdasarkan umur
SELECT * from mahasiswa order by umur;


-- 8. select matkul yg harus diulang (D dan E), serta tampilkan data mhs, dosen, jur lengkap
SELECT mahasiswa.nim, mahasiswa.nama, jurusan.nama, matakuliah.nama, krs.nilai, dosen.nama 
from mahasiswa LEFT JOIN krs on mahasiswa.nim = krs.nim 
LEFT JOIN dosen on krs.id_dosen = dosen.id_dosen 
LEFT JOIN matakuliah ON krs.id_matkul = matakuliah.id_matkul 
LEFT JOIN jurusan on mahasiswa.id_jurusan = jurusan.id_jurusan 
where nilai >= 'D';

