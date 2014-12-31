<?php

require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$qc->qq_login_callback("qqlogin_callback.php");
