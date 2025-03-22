-- Create the database
CREATE DATABASE IF NOT EXISTS rental_db;
USE rental_db;

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample listings data
INSERT INTO listings (title, description, price, image) VALUES
('Modern Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with amazing city views. Features include hardwood floors, stainless steel appliances, and a spacious balcony.', 1500.00, 'image/1.jpeg');