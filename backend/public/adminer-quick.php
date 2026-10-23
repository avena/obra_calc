<?php
$server = $_GET['server'] ?? 'db';
$username = $_GET['username'] ?? 'lumens';
$db = $_GET['db'] ?? 'obra_calc';
$password = $_GET['password'] ?? 'secret';
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Conectando ao Adminer...</title>
</head>
<body onload="document.forms[0].submit()">
    <form action="http://localhost:8085/" method="post">
        <input type="hidden" name="auth[server]" value="<?php echo htmlspecialchars($server); ?>">
        <input type="hidden" name="auth[username]" value="<?php echo htmlspecialchars($username); ?>">
        <input type="hidden" name="auth[password]" value="<?php echo htmlspecialchars($password); ?>">
        <input type="hidden" name="auth[db]" value="<?php echo htmlspecialchars($db); ?>">
        <input type="hidden" name="auth[driver]" value="server">
    </form>
    <p>Redirecionando...</p>
</body>
</html>
