<?php

$file_url = 'https://result2.cdn.magisto.com/5/f/NlgYKghWAm89ARFgCzE_/high.mp4';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"itay" . basename($file_url) . "\"");
readfile($file_url);
