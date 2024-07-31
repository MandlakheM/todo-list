-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskName" TEXT NOT NULL,
    "taskTime" TEXT NOT NULL,
    "taskDate" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "taskCreationTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Task" ("id", "importance", "taskCreationTime", "taskDate", "taskName", "taskTime") SELECT "id", "importance", "taskCreationTime", "taskDate", "taskName", "taskTime" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
