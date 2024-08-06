import initSqlJs from 'sql.js';

let db;

const initDB = async () => {
    const SQL = await initSqlJs({
      locateFile: (file) => `/sql-wasm.wasm`
    });
    db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskName TEXT,
      taskTime TEXT,
      taskDate TEXT,
      importance TEXT,
      taskID TEXT
    );
  `);
};

const getTasks = (userId) => {
  const stmt = db.prepare('SELECT * FROM tasks WHERE taskID = ?');
  const result = [];
  stmt.bind([userId]);
  while (stmt.step()) {
    result.push(stmt.getAsObject());
  }
  stmt.free();
  return result;
};

const addTask = (task) => {
  const { taskName, taskTime, taskDate, importance, taskID } = task;
  db.run(
    'INSERT INTO tasks (taskName, taskTime, taskDate, importance, taskID) VALUES (?, ?, ?, ?, ?)',
    [taskName, taskTime, taskDate, importance, taskID]
  );
};

const deleteTask = (id) => {
  db.run('DELETE FROM tasks WHERE id = ?', [id]);
};

export { initDB, getTasks, addTask, deleteTask };
