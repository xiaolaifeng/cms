##会员模型增加组id
alert table group_table add colume group_table varchar(30);

DROP TABLE IF EXISTS `dede_member_model_auth`;
CREATE TABLE `dede_member_model_auth` (
  `id` mediumint(30) NOT NULL,
  `model_type` varchar(10) NOT NULL,
  `mid` mediumint(30) NOT NULL,
  `openid` varchar(64) DEFAULT NULL,
  `accesstoken` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
