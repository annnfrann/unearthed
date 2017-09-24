package routers

import (
	"database/sql"
	"fmt"
)

// UpdateRiskIdentified = update all rows for a given column1
func UpdateRiskIdentified(rowUpdate RiskIdentifiedRow, db *sql.DB) (updateResults int64, err error) {

	stmt, err := db.Prepare("update flrap.riskidentified set scoredbysup = ?, approvedbysup = ? where idriskidentified=?;")
	if err != nil {
		err = fmt.Errorf("Error in UpdateRiskIdentified after Prepare of update: %s", err.Error())
		return 0, err
	}
	updated, err := stmt.Exec(rowUpdate.SupervisorScore, rowUpdate.SupervisorApproved, rowUpdate.IDRiskIdentified)
	if err != nil {
		err = fmt.Errorf("Error in UpdateRiskIdentified after Exec of update: %s", err.Error())
		return 0, err
	}
	updateResults, err = updated.RowsAffected()

	return // updateResults, err do not need to be explictly mentioned on the last return
}
