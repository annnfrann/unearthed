package routers

import (
	"database/sql"
	"fmt"
)

// GetEmployeeTasks = fetch all rows for employee ID
func GetEmployeeTasks(employeeID string, db *sql.DB) (taskList []TaskRow, err error) {
	var nextRow = TaskRow{}
	rows, err := db.Query("select a.taskid, b.taskname, b.taskdesc from flrap.employeetask a, flrap.task b where a.taskid = b.taskid and a.employeeid = ?;", employeeID)
	if err != nil {
		err = fmt.Errorf("Error after GetTasks Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRow.TaskID, &nextRow.TaskName, &nextRow.TaskDesc)
		if err != nil {
			err = fmt.Errorf("Error after GetTasks Scan: %s", err.Error())
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
