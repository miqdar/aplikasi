create table jurusan (id_jurusan varchar(2) primary key not null, nama varchar(50) not null);
insert into jurusan (id_jurusan , nama) values ('TI', 'Teknik Informatika'),('SI', 'Sistem Informasi'), ('TK', 'Teknik Komputer');

create table dosen (id_dosen varchar(5) primary key not null, nama varchar(50) not null);
insert into dosen (id_dosen,nama) VALUES ('D01','Nirwan'), ('D02','Rizqon'),('D03','Bayu');

create table matakuliah (id_matkul varchar(5) primary key not null, nama varchar(50) not null, sks int not null);
insert into matakuliah (id_matkul , nama, sks) VALUES ('KAL','Kalkulus','4'), ('ENG','B.Inggris','3'), ('RDB','Relasi Database','4');

create table mahasiswa (nim varchar(10) primary key not NULL, nama varchar(50) not null, alamat varchar(100) not null, id_jurusan varchar(2) not null, FOREIGN KEY (id_jurusan) REFERENCES jurusan (id_jurusan ));
insert into mahasiswa (nim,nama,alamat, id_jurusan ) VALUES ('M0001','Adam Miqdar','Jl. Kebon Gedang','TI'), ('M0002','Aisyah D','Jl. Tumaritis','SI'),('M0003','Haitsam Miqdar','Jl. Gatsoe','TK');

create table krs (id_krs varchar(5) primary key not null, nim varchar(10) not null, id_matkul varchar(5) not null, id_dosen varchar(5), nilai char, 
FOREIGN KEY (nim) REFERENCES mahasiswa (nim), FOREIGN KEY (id_matkul ) REFERENCES matakuliah (id_matkul ), FOREIGN KEY (id_dosen ) REFERENCES dosen (id_dosen ));
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20001','M0001','KAL','D01','A');
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20002','M0002','KAL','D01','B');
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20003','M0003','KAL','D01','A');
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20004','M0001','ENG','D02','B');
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20005','M0002','ENG','D02','A');
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20006','M0003','RDB','D03','C');
insert into krs (id_krs ,nim,id_matkul,id_dosen,nilai) VALUES ('20009','M0002','DM','D02','D');