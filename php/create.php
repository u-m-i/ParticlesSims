<?php 
    require __DIR__ . '.\vendor\autoload.php';

        #Initialize all the conextion and session    
        session_start();
        $conextion = conex();#Create the DB conextion
        verify($conextion);

        if(isset($_POST['create_user'])){

            //All values
            $name = $_POST["name"];
            $lastname = $_POST["lastname"];
            $email = $_POST["email"];
            $username = $_POST["username"];
            $password = hash(
                'sha512',
                '73b0c0eeb6e3b347a4c32822293c71c72dafa8f5b08961c1811ab4025fdf06a5dbf27b3b3200a7731b65ca36ff80a743',
                $_POST["password"]
            );

            if(confirm($conextion, $email)){

                $query = "INSERT INTO usuario(name,last_name,username,email,password) VALUES ('$name', '$lastname','$username', '$email', '$password')";
                $result = mysqli_query($conextion, $query);
                if(!$result){
                    die("Something went wrong!");
                    header("location: main.php");
                }

                $_SESSION['message'] = 'successfully signed user';
                header("Location: main.php");
            }
            else{
                $_SESSION['message'] = true;
                header("location: main.php");
            }
        }

mysqli_close($conextion);
session_unset();







