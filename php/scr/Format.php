<?php

namespace crud;

use mysqli;

class Format{

    //Experiment
    public static function lower($value){

        return strtolower($value);
    }

    public static function conexDB(){

        $host = "127.0.0.1";
        // Uncomment this variable, to enter the port 
        #$port = "";
        $dbname = "chichilo";
        $user='root';
        $password="";
        $conextion = new mysqli($host, $user, $password, $dbname);
        if(isset($conextion)){
            return $conextion;
        }

    }
    
    public static function confirm($conextion, $email){
        /**
         * This function verify the given email
         */
        $query = "SELECT * FROM usuario WHERE email = '{$email}'";

        
        $count = mysqli_num_rows( mysqli_query($conextion, $query));
        
        if($count > 0){
            return false;
        }
        else{
            return true;
        }
    }

    public static function fetchAll($conextion){
        $query = "SELECT * FROM usuario";

        ## Complicated error
        $result = mysqli_query($conextion,$query);

        return $result;
    }

    public static function deleteRow($conextion, $id){
        $query = "DELETE FROM `usuario` WHERE `usuario`.`id` = '{$id}'";
        $result = mysqli_query($conextion, $query);
        return $result;
    }

    public static function changeRow($conextion, $id){
        return 0;

    }
}