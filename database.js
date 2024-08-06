// database.js
import initSqlJs from "sql.js";
import { useEffect, useState } from "react";

const useDatabase = () => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDatabase = async () => {
      const SQL = await initSqlJs({ locateFile: (file) => `https://sql.js.org/dist/${file}`});
      const db = new SQL.Database();
      setDb(db);

      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        taskName TEXT,

        importance TEXT,
        taskID INTEGER
      )`);
    };

    initDatabase();
  }, []);

  return db;
};

export default useDatabase;
