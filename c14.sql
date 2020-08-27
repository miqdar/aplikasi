CREATE table dosen (id_dosen varchar(5) primary key not null, nama varchar(50) not null);
insert into dosen (id_dosen, nama) values ('M01','Bayu');
insert into dosen (id_dosen, nama) values ('M02','Rizqon');
insert into dosen (id_dosen, nama) values ('M03','Nirwan');

CREATE table jurusan (kode_jur varchar(5) primary key not null, nama varchar(50) not null);
insert into jurusan (kode_jur,nama) values ('ti','Teknik Informatika'), ('si','Sistem Informasi'),('tk','Teknik Komputer');

CREATE table matakuliah (id_matkul varchar(5) primary key not null, nama varchar(50) not null, sks int not null);
insert into matakuliah (id_matkul,nama,sks) values ('01','Kalkulus','4'),('02','RDBMS','3'),('03','B.Inggris','2');

CREATE table mahasiswa (nim varchar(10) primary key not null, nama varchar(50) not null, alamat text not null, kode_jur varchar(5) not null, foreign key (kode_jur) REFERENCES jurusan (kode_jur ));
insert into mahasiswa (nim,nama,alamat,kode_jur) values ('S001','Adam Miqdar','Jl. Kebon Gedang','ti');
insert into mahasiswa (nim,nama,alamat,kode_jur) values ('S002','Aisyah','Jl. Gatsu','si');
insert into mahasiswa (nim,nama,alamat,kode_jur) values ('S003','Haitsam','Jl. Kircon','tk');

CREATE table nilai (nim varchar(10) not null, id_matkul varchar(5) not null, nilai char(2) not null, FOREIGN KEY (nim) REFERENCES mahasiswa (nim ), FOREIGN KEY (id_matkul ) REFERENCES matakuliah (id_matkul ));
insert into nilai (nim,id_matkul,nilai) values ('S001','02','A');
insert into nilai (nim,id_matkul,nilai) values ('S002','01','A');
insert into nilai (nim,id_matkul,nilai) values ('S002','02','B');
insert into nilai (nim,id_matkul,nilai) values ('S003','03','C');