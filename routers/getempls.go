package routers

import (
	"database/sql"
	"fmt"
)

// GetEmployees = fetch all rows for empParm
func GetEmployees(empParm string, db *sql.DB) (employeeList []EmployeeRow, err error) {
	var nextRow = EmployeeRow{}
	rows, err := db.Query("select a.employeeid, a.employeename, e.positionname, a.supervisorid, b.locationname, d.teamname from flrap.employee a, flrap.location b, flrap.employeeteam c, flrap.team d, flrap.position e where a.positionid = e.positionid and a.locationid = b.locationid and a.employeeid = c.employeeid and c.teamid = d.teamid and a.employeeid like ?;", empParm)
	if err != nil {
		err = fmt.Errorf("Error after Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRow.EmployeeID, &nextRow.EmployeeName, &nextRow.PositionName, &nextRow.SupervisorID, &nextRow.LocationName, &nextRow.TeamName)
		if err != nil {
			err = fmt.Errorf("Error after Scan: %s", err.Error())
			return nil, err
		}

		// Get all tasks, risks, and mitigations for a given EmployeeID
		nextRow.Tasks, err = GetEmployeeTasks(nextRow.EmployeeID, db)
		if err != nil {
			err = fmt.Errorf("Error from GetTasks: %s", err.Error())
			return nil, err
		}

		// add this employee record to the list of employees
		employeeList = append(employeeList, nextRow)
	}
	return
}
