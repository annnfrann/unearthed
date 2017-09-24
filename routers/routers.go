package routers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"

	// database of choice
	_ "github.com/go-sql-driver/mysql"
)

// Request = simple struct to pass data
// type Request struct {
// 	RequestID int       `json:"requestid"`
// 	EmployeeRows  []EmployeeRow `json:"employees"`
// }

// EmployeeRow = simple struct for single employee row
type EmployeeRow struct {
	EmployeeID   string    `json:"employeeid"`
	EmployeeName string    `json:"employeename"`
	PositionName string    `json:"positionname"`
	SupervisorID string    `json:"supervisorid"`
	LocationName string    `json:"locationname"`
	TeamName     string    `json:"teamname"`
	Tasks        []TaskRow `json:"tasks"`
}

// TaskRow = simple struct for a task and associated risks and their mitigations
type TaskRow struct {
	TaskID   string    `json:"taskid"`
	TaskName string    `json:"taskname"`
	TaskDesc string    `json:"taskdesc"`
	Risks    []RiskRow `json:"risks"`
}

// RiskRow = simple struct for a risk and associated mitigations
type RiskRow struct {
	RiskID      string          `json:"riskid"`
	RiskName    string          `json:"riskname"`
	RiskDesc    string          `json:"riskdesc"`
	Mitigations []MitigationRow `json:"mitigations"`
}

// MitigationRow = simple struct for a mitigation
type MitigationRow struct {
	MitigationID   string `json:"mitigationid"`
	MitigationName string `json:"mitigationname"`
	MitigationDesc string `json:"mitigationdesc"`
}

// RiskIdentifiedRow = simple struct for single employee identified risk
type RiskIdentifiedRow struct {
	IDRiskIdentified   string  `json:"idriskidentified"`
	EmployeeID         string  `json:"employeeid"`
	FormID             string  `json:"formid"`
	TaskID             string  `json:"taskid"`
	RiskID             string  `json:"riskid"`
	MitigationID       string  `json:"mitigationid"`
	HeatIndex          float64 `json:"heatindex"`
	SupervisorScore    int     `json:"supervisorscore"`
	SupervisorApproved string  `json:"supervisorapproved"`
}

// FormRow = simple struct for a form
type FormRow struct {
	SupervisorID   string            `json:"supervisorid"`
	SupervisorName string            `json:"supervisorname"`
	RiskIdentified RiskIdentifiedRow `json:"riskidentified"`
	EmployeeName   string            `json:"employeename"`
	FormName       string            `json:"formname"`
	TaskName       string            `json:"taskname"`
	TaskDesc       string            `json:"taskdesc"`
	RiskName       string            `json:"riskname"`
	RiskDesc       string            `json:"riskdesc"`
	MitigationName string            `json:"mitigationname"`
	MitigationDesc string            `json:"mitigationdesc"`
}

// RegisterRouters - serve up webpages and APIs
func RegisterRouters() *gin.Engine {
	var db *sql.DB

	// Database Open for AWS
	//	db, err := sql.Open("mysql", "flrapuser:flrappass1$T@tcp(flrap.ctriapk0cnz2.us-west-2.rds.amazonaws.com:3306)/flrap")
	db, err := sql.Open("mysql", "flrapuser:flrappass1$T@tcp(flrap2.ctriapk0cnz2.us-west-2.rds.amazonaws.com:3306)/flrap")

	// Database Open for mysql
	//db, err := sql.Open("mysql", "flrapuser:flrappass1$T@tcp(127.0.0.1:3306)/flrap")

	if err != nil {
		panic(err.Error())
	}

	// always a good idea to ping the database to check for access
	err = db.Ping()
	if err != nil {
		panic(err.Error())
	}

	// base gin structure
	router := gin.Default()

	// load the assets and html pages
	// router.LoadHTMLGlob("templates/*.html")
	// router.Static("/assets", "assets")
	// router.StaticFile("/favicon.ico", "assets/favicon.ico")

	// GETs for webpages
	// router.GET("/", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "index.html", gin.H{
	// 		"title": "Welcome to OpenTable",
	// 	})
	// })
	//
	// router.GET("/column2/create", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "create_column2.html", gin.H{
	// 		"title": "Create Column2",
	// 	})
	// })
	//
	// router.GET("/column2/show/:id", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "column2.html", gin.H{
	// 		"title": "View Column2",
	// 	})
	// })
	//
	// router.GET("/column1/:id", func(c *gin.Context) {
	// 	c.HTML(http.StatusOK, "column1.html", gin.H{
	// 		"title": "Column1 Information",
	// 	})
	// })

	//
	// API section
	//

	// GET details for a given employee ID, all employees, or mask of employee ID
	router.GET("/employee/:id", func(c *gin.Context) {
		empParm := c.Param("id")
		if empParm == "all" {
			empParm = "%" // wildcard the search parameter
		}
		rows, err := GetEmployees(empParm, db)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusNotFound, nil)
		} else {
			c.JSON(http.StatusOK, rows)
		}
	})

	// GET details for a given supervisor by their employee ID, all employees, or mask of employee ID
	router.GET("/supervisor/:id", func(c *gin.Context) {
		supParm := c.Param("id")
		if supParm == "all" {
			supParm = "%" // wildcard the search parameter
		}
		rows, err := GetSupervisorForms(supParm, db)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusNotFound, nil)
		} else {
			c.JSON(http.StatusOK, rows)
		}
	})

	// GET details for all tasks
	router.GET("/tasks", func(c *gin.Context) {
		rows, err := GetAllTasks(db)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusNotFound, nil)
		} else {
			c.JSON(http.StatusOK, rows)
		}
	})

	// GET - Pull all rows based on parameters - all are optional or can be wildcarded
	// router.GET("/api/column1", func(c *gin.Context) {
	// 	column2Parm := c.DefaultQuery("column2", "%")
	// 	column3Parm := c.DefaultQuery("column3", "%")
	//
	// 	requestList, err := RowListInfo(column2Parm, column3Parm, db)
	// 	if err != nil {
	// 		fmt.Println(err.Error()) // could also panic here, but it would be a crash
	// 	}
	// 	c.JSON(http.StatusOK, requestList)
	// })

	//
	// PUT - Create a row
	// router.POST("/api/column1", func(c *gin.Context) {
	// 	var request DataRow
	//
	// 	var x []byte
	// 	x, _ = ioutil.ReadAll(c.Request.Body)
	// 	err := json.Unmarshal(x, &request)
	// 	if err != nil {
	// 		fmt.Println(err.Error())
	// 	}
	//
	// 	requestResponse, err := CreateRow(request, db)
	// 	if err != nil {
	// 		fmt.Println(err.Error()) // could also panic here, but it would be a crash
	// 	}
	// 	c.JSON(http.StatusOK, requestResponse)
	// })

	// PUT - update a RiskIdentified row
	router.PUT("/supervisor/:value", func(c *gin.Context) {
		value := c.Param("value")
		fmt.Println(value)
		var x []byte
		x, _ = ioutil.ReadAll(c.Request.Body)
		var row RiskIdentifiedRow
		err := json.Unmarshal(x, &row)
		fmt.Println(row)
		if err != nil {
			fmt.Println(err.Error())
			c.JSON(http.StatusNotAcceptable, 0)
		} else {
			updateResults, err := UpdateRiskIdentified(row, db)
			if err != nil {
				fmt.Println(err.Error()) // could also panic here, but it would be a crash
				c.JSON(http.StatusNotAcceptable, 0)
			}
			c.JSON(http.StatusOK, updateResults)
		}
	})

	//return to main program
	return router
}
