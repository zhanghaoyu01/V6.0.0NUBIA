-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-09-05 09:51:27
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nubia`
--

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(6) NOT NULL COMMENT 'id',
  `user_name` varchar(16) NOT NULL COMMENT '用户姓名',
  `password` varchar(16) NOT NULL COMMENT '用户密码',
  `email` varchar(20) NOT NULL COMMENT '用户邮箱',
  `phone` varchar(100) NOT NULL COMMENT 's手机号'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`) VALUES
(3, '', '111111', '', '13333333333'),
(1, 'zhanghaoyu', '123456', '13296840051@163.com', '17561927441'),
(4, '', '1111111', '', '14444444444'),
(5, '', '111111', '', '15555555555'),
(6, '', '111111', '', '17777777777'),
(7, '', '111111', '', '18888888888'),
(8, '', '111111', '', '13444444444'),
(9, '', '111111', '', '13555555555'),
(10, '', '111111', '', '13333333334');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT COMMENT 'id', AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
