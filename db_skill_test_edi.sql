-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2024 at 02:52 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_skill_test_edi`
--

-- --------------------------------------------------------

--
-- Table structure for table `biodata`
--

CREATE TABLE `biodata` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `posisi_dilamar` varchar(20) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `no_ktp` int(11) NOT NULL,
  `tempat_lahir` varchar(30) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `jenis_kelamin` char(1) NOT NULL,
  `agama` varchar(20) NOT NULL,
  `golongan_darah` char(2) NOT NULL,
  `status` int(11) NOT NULL,
  `alamat_ktp` varchar(255) NOT NULL,
  `alamat_tinggal` varchar(255) NOT NULL,
  `no_telp` varchar(12) NOT NULL,
  `orang_terdekat` varchar(12) NOT NULL,
  `bersedia_ditempatkan` int(1) NOT NULL,
  `penghasilan_diharapkan` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `biodata`
--

INSERT INTO `biodata` (`id`, `id_user`, `posisi_dilamar`, `nama`, `no_ktp`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `agama`, `golongan_darah`, `status`, `alamat_ktp`, `alamat_tinggal`, `no_telp`, `orang_terdekat`, `bersedia_ditempatkan`, `penghasilan_diharapkan`) VALUES
(28, 12, 'Backend Developer', 'Dewangga Bayu', 11, 'ternate', '2024-08-25', 'L', 'Islam', 'A', 0, 'jalan sama sama', 'jalan sama sama', '08211560782', '082115607864', 1, 9300000),
(31, 48, 'Backend Developer No', 'Dewangga Bayu Putra', 112223, 'ternate', '2024-08-25', 'L', 'Islam', 'A', 0, 'jalan sama sama', 'jalan sama sama', '08211560782', '082115607864', 1, 9300000),
(32, 48, 'Backend Developer No', 'Dewangga Bayu Putra', 112223, 'ternate', '2024-08-25', 'L', 'Islam', 'A', 0, 'jalan sama sama', 'jalan sama sama', '08211560782', '082115607864', 1, 9300000),
(33, 48, 'Backend Developer No', 'Dewangga Bayu Putra', 112223, 'ternate', '2024-08-25', 'L', 'Islam', 'A', 0, 'jalan sama sama', 'jalan sama sama', '08211560782', '082115607864', 1, 9300000);

-- --------------------------------------------------------

--
-- Table structure for table `pekerjaan`
--

CREATE TABLE `pekerjaan` (
  `id` int(11) NOT NULL,
  `id_biodata` int(11) NOT NULL,
  `nama_perusahaan` varchar(30) NOT NULL,
  `posisi` varchar(20) NOT NULL,
  `pendapatan` int(20) NOT NULL,
  `tahun` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pekerjaan`
--

INSERT INTO `pekerjaan` (`id`, `id_biodata`, `nama_perusahaan`, `posisi`, `pendapatan`, `tahun`) VALUES
(27, 28, 'ILCS', 'Developer', 7200000, 2021),
(28, 28, 'Metrocom', 'Developer', 7800000, 2022),
(33, 31, 'ILCS', 'Developer', 7200000, 2021),
(34, 31, 'Metrocom', 'Developer', 7800000, 2022),
(35, 32, 'ILCS', 'Developer', 7200000, 2021),
(36, 32, 'Metrocom', 'Developer', 7800000, 2022),
(37, 33, 'ILCS', 'Developer', 7200000, 2021),
(38, 33, 'Metrocom', 'Developer', 7800000, 2022);

-- --------------------------------------------------------

--
-- Table structure for table `pelatihan`
--

CREATE TABLE `pelatihan` (
  `id` int(11) NOT NULL,
  `id_biodata` int(11) NOT NULL,
  `nama_kursus` varchar(30) NOT NULL,
  `sertifikat` tinyint(1) NOT NULL,
  `tahun_pelatihan` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pelatihan`
--

INSERT INTO `pelatihan` (`id`, `id_biodata`, `nama_kursus`, `sertifikat`, `tahun_pelatihan`) VALUES
(28, 28, 'EPT', 1, 2022),
(29, 28, 'Mandarin', 1, 2023),
(34, 31, 'EPT', 1, 2022),
(35, 31, 'Mandarin', 1, 2023),
(36, 32, 'EPT', 1, 2022),
(37, 32, 'Mandarin', 1, 2023),
(38, 33, 'EPT', 1, 2022),
(39, 33, 'Mandarin', 1, 2023);

-- --------------------------------------------------------

--
-- Table structure for table `pendidikan`
--

CREATE TABLE `pendidikan` (
  `id` int(11) NOT NULL,
  `id_biodata` int(11) NOT NULL,
  `jenjang_pendidikan` varchar(10) NOT NULL,
  `nama_institusi` varchar(30) NOT NULL,
  `jurusan` varchar(20) NOT NULL,
  `tahun_lulus` int(4) NOT NULL,
  `ipk` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pendidikan`
--

INSERT INTO `pendidikan` (`id`, `id_biodata`, `jenjang_pendidikan`, `nama_institusi`, `jurusan`, `tahun_lulus`, `ipk`) VALUES
(29, 28, 'S1', 'Widyatama', 'Informatika', 2019, 3.04),
(30, 28, 'S2', 'Likmi', 'Informasi', 2021, 3.2),
(35, 31, 'S1', 'Widyatama', 'Informatika', 2019, 3.04),
(36, 31, 'S2', 'Likmi', 'Informasi', 2021, 3.2),
(37, 32, 'S1', 'Widyatama', 'Informatika', 2019, 3.04),
(38, 32, 'S2', 'Likmi', 'Informasi', 2021, 3.2),
(39, 33, 'S1', 'Widyatama', 'Informatika', 2019, 3.04),
(40, 33, 'S2', 'Likmi', 'Informasi', 2021, 3.2);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `id` int(11) NOT NULL,
  `id_biodata` int(11) NOT NULL,
  `nama_skill` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`id`, `id_biodata`, `nama_skill`) VALUES
(38, 28, 'Angular'),
(39, 28, 'CSS'),
(48, 31, 'Angular'),
(49, 31, 'CSS'),
(50, 32, 'Angular'),
(51, 32, 'CSS'),
(52, 33, 'Angular'),
(53, 33, 'CSS');

-- --------------------------------------------------------

--
-- Table structure for table `table_user`
--

CREATE TABLE `table_user` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_user`
--

INSERT INTO `table_user` (`user_id`, `user_name`, `user_email`, `user_password`) VALUES
(24, 'Zeldianto Eka Putra', 'dazelpro@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `user_email` varchar(50) DEFAULT NULL,
  `user_password` text DEFAULT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_email`, `user_password`, `role`) VALUES
(27, 'admin@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 1),
(46, 'test1@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2),
(47, 'test2@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2),
(48, 'test3@gmail.com', '3c9909afec25354d551dae21590bb26e38d53f2173b8d3dc3eee4c047e7ab1c1eb8b85103e3be7ba613b31bb5c9c36214dc9f14a42fd7a2fdb84856bca5c44c2', 2),
(49, 'admin@gmail.com', 'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `biodata`
--
ALTER TABLE `biodata`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pekerjaan`
--
ALTER TABLE `pekerjaan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelatihan`
--
ALTER TABLE `pelatihan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pendidikan`
--
ALTER TABLE `pendidikan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_user`
--
ALTER TABLE `table_user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `biodata`
--
ALTER TABLE `biodata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `pekerjaan`
--
ALTER TABLE `pekerjaan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `pelatihan`
--
ALTER TABLE `pelatihan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `pendidikan`
--
ALTER TABLE `pendidikan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `table_user`
--
ALTER TABLE `table_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
