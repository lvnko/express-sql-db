# Week #005
## Basic SQL Commands
以 ``CREATE DATABASE`` 指令創建 database。
```sql
CREATE DATABASE db_name;
```
``CREATE TABLE`` 則是在 database 裡創建不同 table 時使用的指令，除了要定義 table 的名稱外，更在要後面的括號中定義出 table 內不同的 column 及它們的資料格式。
```sql
CREATE TABLE table_name (
	column1 int PRIMARY KEY,
	column2 varchar(255),
	column3 varchar(255)
);
```
***
以 ``INSERT INTO`` 指令輸入新一行的資料進指定的 table
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2,  value3, ...);
```
若你熟悉 table 內所有 column 的順序與資料格式，並把要輸入的 ``VALUES`` 照序排列，你便能如下省略 column 的宣告。
```sql
INSERT INTO table_name
VALUES (value1, value2,  value3, ...);
```
***
以 ``DELETE FROM`` 指令移除資料，並以 ``WHERE`` 後的條件去約束哪些 row 的資料將被移除。
```sql
DELETE FROM table_name WHERE condition;
```
***
以 ``UPDATE`` 指令去更新資料，並以 ``WHERE`` 後的條件去指定哪一行 (row) 的資料將被更新。
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
***
```sql
SELECT column1, column2, ... FROM table_name;
```
```sql
SELECT * FROM table_name;
```
```sql
SELECT * FROM table_name
INNER JOIN table_to_join_name
ON table_name.field = table_to_join_name.field;
```
***
```sql
USE db_name;
```
```sql
ALTER TABLE table_name ...;
```

## Requiremed information for database connection
- IP 位置 (或可以解析出 IP 位置的域名)
- Port 端口號 (e.g. :3306)
- 用戶名
- 密碼
## Common Cloud Databse 雲端資料庫
- GCP - Cloud SQL
- Amazon RDS
- Azure SQL
# Week #006
## Schema Design 理論 - Normal Forms 正規式
### 1st Normal Form
1. 一個 Column 只保存一個值
2. 任兩條 Row 的內容不可以完全相同
### 2nd Normal Form
1. 符合 1st Normal Form
2. Primary Key 必須只能在一個 Column
### 3rd Normal Form
1. 符合 2nd Normal Form
2. Column 之間不能存在傳遞關係
### Boyce-Codd Normal Form (BCNF)
1. 符合 3rd Normal Form
2.「可以當 Primary Key」的 Column 之間不能存在傳遞關係
### 4th Normal Form
1. 符合 BCNF
2. 不可以在 Row 裡面有一對多關係

### <span style="color:purple">有用資源</span>
- MySQL Databse Server (https://dev.mysql.com/downloads/mysql)
- MySQL WorkBench (https://dev.mysql.com/downloads/workbench)