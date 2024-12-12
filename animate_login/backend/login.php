<?php
session_start();
include 'DbConnector.php';  // Include the unified connection class
header('Content-Type: application/json');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $userInput = json_decode($input, true);
    $email = $userInput['email'];
    $password = $userInput['password'];

    // Define the login class with the check_user function
    class Login {
        private $conn;

        public function __construct()
        {
            // Create a new instance of DbConnector and get the connection
            $db = new DbConnector();
            $this->conn = $db->getConnection();
        }

        public function check_user($email, $password, $table) {
            $query = "SELECT * FROM $table WHERE email = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $user = $stmt->fetch();
                
                if ($password === $user['password']) {
                    return $user;
                } else {
                    return false;
                }
            }
            return false;
        }
    }

    // Create a new Login object and check the user
    $User = new Login();
    $userType = null;

    if ($user = $User->check_user($email, $password, 'admin')) {
        $userType = 'admin';
    } elseif ($user = $User->check_user($email, $password, 'user')) {
        $userType = 'user';
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    if($userType){
        $_SESSION['user']=[
            'email'=>$user['email'],
            'type'=>$userType
        ];
    }

    // Return the success response with userType
    echo json_encode(['success' => true, 'message' => 'Login Successful', 'userType' => $userType]);

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
