CREATE TABLE `district`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` VARCHAR(255) NOT NULL,
    `county_city_id` INT NOT NULL
);
CREATE TABLE `country`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` BIGINT NOT NULL
);
CREATE TABLE `attribute`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` VARCHAR(255) NOT NULL
);
CREATE TABLE `shipment`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_item_id` INT NOT NULL,
    `address_id` INT NOT NULL,
    `status_id` INT NOT NULL
);
CREATE TABLE `product`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `description` VARCHAR(255) NOT NULL
);
CREATE TABLE `sku`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stock` INT NOT NULL,
    `product_id` INT NOT NULL
);
CREATE TABLE `shipment_status`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` VARCHAR(255) NOT NULL
);
CREATE TABLE `address_type`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` VARCHAR(255) NOT NULL
);
CREATE TABLE `order`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL
);
CREATE TABLE `county_city`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `label` VARCHAR(255) NOT NULL,
    `country_id` INT NOT NULL
);
CREATE TABLE `attribute_value`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sku_id` BIGINT NOT NULL,
    `product_attribute_id` INT NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    `label` VARCHAR(255) NOT NULL
);
CREATE TABLE `address`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `unit` VARCHAR(255) NOT NULL,
    `street_number` VARCHAR(255) NOT NULL,
    `district_id` INT NOT NULL,
    `county_city_id` INT NOT NULL,
    `country_id` INT NOT NULL,
    `type_id` INT NOT NULL,
    `is_default` BINARY(16) NOT NULL,
    `has_delivery_history` BINARY(16) NOT NULL,
    `archived` BINARY(16) NOT NULL
);
CREATE TABLE `customer`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `given_name` VARCHAR(255) NOT NULL,
    `family_name` VARCHAR(255) NOT NULL,
    `gender` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `address_id` INT NOT NULL
);
CREATE TABLE `order_item`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `sku_id` INT NOT NULL,
    `amount` INT NOT NULL,
    `total_price` INT NOT NULL
);
CREATE TABLE `product_attribute`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT NOT NULL,
    `attribute_id` INT NOT NULL
);
ALTER TABLE
    `product_attribute` ADD CONSTRAINT `product_attribute_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `product`(`id`);
ALTER TABLE
    `product_attribute` ADD CONSTRAINT `product_attribute_attribute_id_foreign` FOREIGN KEY(`attribute_id`) REFERENCES `attribute`(`id`);
ALTER TABLE
    `district` ADD CONSTRAINT `district_county_city_id_foreign` FOREIGN KEY(`county_city_id`) REFERENCES `county_city`(`id`);
ALTER TABLE
    `order_item` ADD CONSTRAINT `order_item_sku_id_foreign` FOREIGN KEY(`sku_id`) REFERENCES `sku`(`id`);
ALTER TABLE
    `county_city` ADD CONSTRAINT `county_city_country_id_foreign` FOREIGN KEY(`country_id`) REFERENCES `country`(`id`);
ALTER TABLE
    `address` ADD CONSTRAINT `address_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customer`(`id`);
ALTER TABLE
    `shipment` ADD CONSTRAINT `shipment_address_id_foreign` FOREIGN KEY(`address_id`) REFERENCES `address`(`id`);
ALTER TABLE
    `address` ADD CONSTRAINT `address_type_id_foreign` FOREIGN KEY(`type_id`) REFERENCES `address_type`(`id`);
ALTER TABLE
    `shipment` ADD CONSTRAINT `shipment_status_id_foreign` FOREIGN KEY(`status_id`) REFERENCES `shipment_status`(`id`);
ALTER TABLE
    `attribute_value` ADD CONSTRAINT `attribute_value_sku_id_foreign` FOREIGN KEY(`sku_id`) REFERENCES `sku`(`id`);
ALTER TABLE
    `order_item` ADD CONSTRAINT `order_item_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `product`(`id`);
ALTER TABLE
    `address` ADD CONSTRAINT `address_country_id_foreign` FOREIGN KEY(`country_id`) REFERENCES `country`(`id`);
ALTER TABLE
    `address` ADD CONSTRAINT `address_district_id_foreign` FOREIGN KEY(`district_id`) REFERENCES `district`(`id`);
ALTER TABLE
    `attribute_value` ADD CONSTRAINT `attribute_value_product_attribute_id_foreign` FOREIGN KEY(`product_attribute_id`) REFERENCES `product_attribute`(`id`);
ALTER TABLE
    `order` ADD CONSTRAINT `order_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customer`(`id`);
ALTER TABLE
    `customer` ADD CONSTRAINT `customer_address_id_foreign` FOREIGN KEY(`address_id`) REFERENCES `address`(`id`);
ALTER TABLE
    `order_item` ADD CONSTRAINT `order_item_order_id_foreign` FOREIGN KEY(`order_id`) REFERENCES `order`(`id`);
ALTER TABLE
    `address` ADD CONSTRAINT `address_county_city_id_foreign` FOREIGN KEY(`county_city_id`) REFERENCES `county_city`(`id`);
ALTER TABLE
    `sku` ADD CONSTRAINT `sku_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `product`(`id`);
ALTER TABLE
    `shipment` ADD CONSTRAINT `shipment_order_item_id_foreign` FOREIGN KEY(`order_item_id`) REFERENCES `order_item`(`id`);