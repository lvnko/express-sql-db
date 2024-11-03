# Week #005 + Week #006
## 在 express 上實作 sequelize 與 MySQL 的串接
### 專案啟動步驟
1. 下載並安裝 MySQL 伺服器在本地電腦，建議版本為 v8.0
2. 啟動本地 MySQL 伺服器
3. 運用 MySQL Client (e.g. MySQL Workbench) 在 MySQL 伺服器上創建數據庫 ``TodoList``：
	```sql
	CREATE DATABASE `TodoList`;
	```
4. 下載本專案 repo 至本地，若你使用的 MySQL 伺服器設定與以下預設值不同，請在專案根目錄創建一個 ``.env`` 檔案，並換上正確的設定值：
	```env
	PORT=3000
	DB_HOST=localhost
	DB_USER=root
	DB_PASSWORD=password
	DB_NAME=TodoList
	```
5. 以 Node 介面，安裝專案裡的模組：
	```node
	npm install
	```
6. 啟動 Node 伺服器：
	```node
	npm run dev
	```
7. 啟動成功後便可以 API Client 訪問 API，相關功能可參考 [ [功能目錄](./NOTES.md#2-在-express-上實作-sequelize-與-mysql-的串接) ]
### 開發環境依賴
- MySQL v8.0
- Node.js v14.21.1
***
## 專案筆記
1. 課程學習筆記 [ [Week #005](./NOTES.md) ] [ [Week #006](./NOTES.md#week-006) ]
2. 課堂習作
	- 2.1. 電商網站 Schema 設計 [ [<img width="18" hieght="18" style="vertical-align: middle;" src="https://cdn-icons-png.flaticon.com/512/282/282100.png"/> 連結](./NOTES.md#課堂習作) ]
	- 2.2. 在 express 上實作 sequelize 與 MySQL 的串接 (本專案) [ [<img width="18" hieght="18" style="vertical-align: middle;" src="https://cdn-icons-png.flaticon.com/512/282/282100.png"/> API 設計](./NOTES.md#2-在-express-上實作-sequelize-與-mysql-的串接) ]
3. 課外有用資源 [ [<img width="18" hieght="18" style="vertical-align: middle;" src="https://cdn-icons-png.flaticon.com/512/282/282100.png"/> 連結](./NOTES.md#課外有用資源) ]