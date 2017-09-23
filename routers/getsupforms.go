package routers

import (
	"database/sql"
	"fmt"
)

// GetSupervisorForms = fetch all rows for employee ID
func GetSupervisorForms(supervisorID string, db *sql.DB) (formList []FormRow, err error) {
	var nextRIRow = RiskIdentifiedRow{}
	rows, err := db.Query("select a.employeeid, a.formid, a.taskid, a.riskid, a.mitigationid, a.heatindex, a.scoredbysup, a.approvedbysup from flrap.riskidentified a, flrap.employee b where a.employeeid = b.employeeid and b.supervisorid = ?;", supervisorID)
	if err != nil {
		err = fmt.Errorf("Error after GetSupervisorForms Query: %s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&nextRIRow.EmployeeID, &nextRIRow.FormID, &nextRIRow.TaskID, &nextRIRow.RiskID, &nextRIRow.MitigationID, &nextRIRow.HeatIndex, &nextRIRow.SupervisorScore, &nextRIRow.SupervisorApproved)
		if err != nil {
			err = fmt.Errorf("Error after GetSupervisorForms Scan: %s", err.Error())
			return nil, err
		}
		// add this task record to the list of tasks
		newForm := FormRow{}
		newForm.SupervisorID = supervisorID
		newForm.RiskIdentified = nextRIRow

		// Get given task infomation
		taskRow := db.QueryRow("select a.taskname, a.taskdesc from flrap.task a where a.taskid = ?;", nextRIRow.TaskID)
		err = taskRow.Scan(&newForm.TaskName, &newForm.TaskDesc)
		if err != nil && err != sql.ErrNoRows {
			err = fmt.Errorf("Error in GetSupervisorForms after task QueryRow and Scan: %s", err.Error())
		}

		// Get given risk infomation
		riskRow := db.QueryRow("select a.riskname, a.riskdesc from flrap.risk a where a.riskid = ?;", nextRIRow.RiskID)
		err = riskRow.Scan(&newForm.RiskName, &newForm.RiskDesc)
		if err != nil && err != sql.ErrNoRows {
			err = fmt.Errorf("Error in GetSupervisorForms after risk QueryRow and Scan: %s", err.Error())
		}

		// Get given mitigation infomation
		mitigationRow := db.QueryRow("select a.mitigationname, a.mitigationdesc from flrap.mitigation a where a.mitigationid = ?;", nextRIRow.MitigationID)
		err = mitigationRow.Scan(&newForm.MitigationName, &newForm.MitigationDesc)
		if err != nil && err != sql.ErrNoRows {
			err = fmt.Errorf("Error in GetSupervisorForms after mitigation QueryRow and Scan: %s", err.Error())
		}

		// Get given form infomation
		formRow := db.QueryRow("select a.formname from flrap.form a where a.formid = ?;", nextRIRow.FormID)
		err = formRow.Scan(&newForm.FormName)
		if err != nil && err != sql.ErrNoRows {
			err = fmt.Errorf("Error in GetSupervisorForms after form QueryRow and Scan: %s", err.Error())
		}

		formList = append(formList, newForm)
	}
	return
}
