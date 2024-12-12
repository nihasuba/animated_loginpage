<?php

class DbConnector {
    private $host = "localhost";
    private $user = "root";
    private $pwd = "";
    private $dbname = "animate_page";
    private $pdo;

    public function __construct() {
        // Initialize the PDO connection in the constructor
        try {
            $this->pdo = new PDO("mysql:host={$this->host};dbname={$this->dbname}", $this->user, $this->pwd);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
            exit;
        }
    }

    public function getConnection() {
        // Return the PDO connection object
        return $this->pdo;
    }
}
?>
