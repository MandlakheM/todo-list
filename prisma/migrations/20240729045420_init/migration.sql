-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskName" TEXT NOT NULL,
    "taskTime" TEXT NOT NULL,
    "taskDate" DATETIME NOT NULL,
    "importance" TEXT NOT NULL,
    "taskCreationTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
