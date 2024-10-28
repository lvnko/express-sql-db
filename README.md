# Week #005
## Basic SQL Commands
### CREATE 
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
### INSERT
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
### DELETE
以 ``DELETE FROM`` 指令移除資料，並以 ``WHERE`` 後的條件去約束哪些 row 的資料將被移除。
```sql
DELETE FROM table_name WHERE condition;
```
***
### UPDATE
以 ``UPDATE`` 指令去更新資料，並以 ``WHERE`` 後的條件去指定哪一行 (row) 的資料將被更新。
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
***
### SELECT & JOIN
以 ``SELECT`` 指令來查看 table 的資料，你可以指定只看哪幾個欄 (column) 的資料。
```sql
SELECT column1, column2, ... FROM table_name;
```
你也可輸入 ``*`` 符號以默認查看該 table 所有的欄位的資料。
```sql
SELECT * FROM table_name;
```
``JOIN`` 指令可以用來把不同的 table 資料根據 ``ON`` 之後所寫的條件配合再一起顯示。
```sql
SELECT * FROM table_name
INNER JOIN table_to_join_name
ON table_name.field = table_to_join_name.field;
```
***
### USE & ALTER
要記住，每當你運行 sql 的時候，都需要指名動作是要執行在哪個 schema 上，方法是用 ``USE`` 再加上 schema 名稱。
```sql
USE db_name;
```
以 ``ALTER TABLE`` 指令來增刪改 table 裡的欄位或其設定。
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

# <span style="color:purple">課外有用資源</span>
- MySQL Databse Server (https://dev.mysql.com/downloads/mysql)
- MySQL WorkBench (https://dev.mysql.com/downloads/workbench)
- SQL: Naming Conventions [SQLShack](https://www.sqlshack.com/learn-sql-naming-conventions/), [Github repo](https://github.com/RootSoft/Database-Naming-Convention)
- Database diagrams tool - [drawSQL](https://drawsql.app/)
- Markdown Syntax [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- Schema 設計學習例子
    - eCommerce App [YouTube](https://www.youtube.com/watch?v=1HamqOuv2Cw), [Diagram](https://dbshostedfiles.s3.us-west-2.amazonaws.com/dsa/erd_ecommerce_database.png)
    - Food Delivery App [YouTube](https://www.youtube.com/watch?v=vf_9sUqhjwM&t=333s), [Diagram](https://dbshostedfiles.s3.us-west-2.amazonaws.com/dbs/erd_food_delivery.png)