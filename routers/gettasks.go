package routers

import (
	"database/sql"
	"fmt"
)

// GetAllTasks = fetch all tasks
func GetAllTasks(db *sql.DB) (taskList []TaskRow, err error) {
	var nextRow = TaskRow{}
	rows, err := db.Query("select b.taskid, b.taskname, b.taskdesc from flrap.task b;")
	if err != nil {
		err = fmt.Errorf("Error after GetAllTasks Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRow.TaskID, &nextRow.TaskName, &nextRow.TaskDesc)
		if err != nil {
			err = fmt.Errorf("Error after GetAllTasks Scan: %s", err.Error())
			return nil, err
		}

		// Get all risks and mitigations for a given task
		nextRow.Risks, err = GetRisks(nextRow.TaskID, db)
		if err != nil {
			err = fmt.Errorf("Error from GetRisks: %s", err.Error())
			return nil, err
		}

		// add this task record to the list of tasks
		taskList = append(taskList, nextRow)
	}
	return
}
