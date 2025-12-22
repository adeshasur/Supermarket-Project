# Database Backup & Restore Guide

## Quick Backup

**Just double-click:** `backup_all_databases.bat`

This will automatically backup all 5 databases:
- supermarket_products_db
- supermarket_inventory_db
- supermarket_order_db
- supermarket_users_db
- supermarket_payment_db

Backups are saved in `backups/` folder with date stamps.

---

## Quick Restore

**Just double-click:** `restore_database.bat`

Follow the prompts to select which backup file to restore.

---

## Manual Commands

### Backup Single Database
```bash
cd e:\Project\Supermarket-Project\databases
mysqldump -u root -p1234 supermarket_products_db > backups\my_backup.sql
```

### Restore Single Database
```bash
cd e:\Project\Supermarket-Project\databases
mysql -u root -p1234 supermarket_products_db < backups\my_backup.sql
```

### View Database in MySQL
```bash
mysql -u root -p1234

# Then run:
USE supermarket_products_db;
SHOW TABLES;
SELECT * FROM product LIMIT 10;
EXIT;
```

---

## Important Notes

⚠️ **Always backup before making changes!**

✅ **Backup files include:**
- Complete database schema
- All table data
- Indexes and constraints

📅 **Backup file naming:**
- Format: `databasename_YYYYMMDD.sql`
- Example: `supermarket_products_db_20251222.sql`

---

## Troubleshooting

**Error: 'mysqldump' is not recognized**
- Add MySQL bin folder to your PATH environment variable
- Or use full path: `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe`

**Error: Access denied**
- Check your MySQL password (currently: 1234)
- Update password in .bat files if different

**Database not found**
- Make sure all microservices have created their databases
- Run each Spring Boot service once to auto-create databases
