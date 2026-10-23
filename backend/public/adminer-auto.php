<?php
?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecionando para Adminer...</title>
</head>
<body>
    <form id="f" action="http://localhost:8085/" method="post">
        <input type="hidden" name="auth[server]" value="db">
        <input type="hidden" name="auth[username]" value="lumens">
        <input type="hidden" name="auth[password]" value="secret">
        <input type="hidden" name="auth[db]" value="obra_calc">
        <input type="hidden" name="auth[driver]" value="server">
    </form>
    <script>document.getElementById('f').submit();</script>
</body>
</html>
