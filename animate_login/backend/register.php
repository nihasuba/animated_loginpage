<?php
session_start();
include 'Connection.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $input = file_get_contents('php://input');
    $user = json_decode($input, true);

    if($user){
        $errors = [];

        $sanitizedemail = filter_var($user['email'], FILTER_SANITIZE_EMAIL);
        $Validatedemail = filter_var($sanitizedemail, FILTER_VALIDATE_EMAIL);
         if($Validatedemail){
            $email = $Validatedemail;
         } else {
            $errors[] = "Invalid Email";
         }

         if (empty($user['name'])) {
            $errors[] = "username is required";
        } else {
            $username = htmlspecialchars($user['name']);
        }

        if (empty($user['password'])) {
            $errors[] = "Password is required";
        } elseif (strlen($user['password']) > 8) {
            $errors[] = "Password must have a maximum of 8 characters";
        } else {
            $password = $user['password'];
            // $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        }

        if(!empty($errors)){
            echo json_encode(['success'=>false, 'message'=>'validations Errors','errors'=>$errors]);
            exit;
        }else{
            try {
                $sql = "INSERT INTO user(name, email, password) VALUES(?, ?,?)";
                $pstmt = $conn->prepare($sql);
                $pstmt->bindParam(1,$username);
                $pstmt->bindParam(2, $email);
                $pstmt ->bindParam(3, $password);
                $r = $pstmt->execute();
                if($r > 0){
                    echo json_encode(['success'=>true, 'message'=>'Successfully Registered']);
                }else{
                    echo json_encode(['success'=>true, 'message'=>'Error in Register']);
                }
            } catch (Exception $ex) {
                echo json_encode(['success'=>false , 'message' => $ex->getMessage()]);
            }
            
        }
    }else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
}else{
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

?>