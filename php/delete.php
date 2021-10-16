
<?php
//Stablish the conextion
require __DIR__ . '.\vendor\autoload.php';

session_start();
$conextion = conex();

if(isset($_GET["id"])){

    $id = $_GET["id"];
    if(delete_user($conextion, $id)){
        $_SESSION["message"] = 'User deleted succesfully';
        header("Location: main.php");
    }
}

?>

<?php 
mysqli_close($conextion);
session_unset();
