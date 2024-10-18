<?php
include 'DbConnector.php';
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
        private $db;
        private $conn;

        public function __construct()
        {
            $this->db = new DbConnector();
            $this->conn = $this->db->getConnection();
        }

        public function check_user($email, $password, $table) {
            $query = "SELECT * FROM $table WHERE email = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(1, $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $user = $stmt->fetch();

                // echo json_encode(['debug' => 'Email from DB', 'email' => $user['email']]);
                // echo json_encode(['debug' => 'Password from DB', 'password' => $user['password']]);
                // echo json_encode(['debug' => 'Plain password from input', 'passwordInput' => $password]);
                
                if ($password === $user['password']) {
                    // echo json_encode(['debug' => 'Password matches!']);
                    return $user;
                } else {
                    //echo json_encode(['debug' => 'Password did not match']);
                    return false;
                }
            }
            return false;
        }  
    }

    // Create a new Login object and check the user
    $User = new Login();  // Pass the connection to the constructor
    $user = null;
    $userType = null;

    if ($user = $User->check_user($email, $password, 'admin')) {
        $userType = 'admin';
    } elseif ($user = $User->check_user($email, $password, 'user')) {  // Fixed elseif condition
        $userType = 'user';
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;  // Prevent further code execution
    }

    // If the userType is determined, return success response
    if ($userType) {
        echo json_encode(['success' => true, 'message' => 'Login Successful', 'userType' => $userType]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Please make sure that email and password are correct.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
