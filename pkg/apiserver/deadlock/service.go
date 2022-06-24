// Copyright 2022 PingCAP, Inc. Licensed under Apache-2.0.

package deadlock

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/fx"

	"github.com/pingcap/tidb-dashboard/pkg/apiserver/user"
	"github.com/pingcap/tidb-dashboard/pkg/apiserver/utils"
	"github.com/pingcap/tidb-dashboard/pkg/tidb"
	commonUtils "github.com/pingcap/tidb-dashboard/pkg/utils"
	"github.com/pingcap/tidb-dashboard/util/rest"
)

type ServiceParams struct {
	fx.In
	TiDBClient *tidb.Client
	SysSchema  *commonUtils.SysSchema
}

type Service struct {
	params ServiceParams
}

func newService(p ServiceParams) *Service {
	return &Service{params: p}
}

func registerRouter(r *gin.RouterGroup, auth *user.AuthService, s *Service) {
	endpoint := r.Group("/deadlock")
	endpoint.Use(
		auth.MWAuthRequired(),
		utils.MWConnectTiDB(s.params.TiDBClient),
	)
	{
		endpoint.GET("/list", s.getList)
	}
}

type Model struct {
	ID             int64  `json:"id" gorm:"column:DEADLOCK_ID"`
	Key            string `json:"key" gorm:"column:KEY"`
	KeyInfo        string `json:"key_info" gorm:"column:KEY_INFO"`
	SQL            string `json:"sql" gorm:"column:CURRENT_SQL_DIGEST_TEXT"`
	TryLockTrx     int64  `json:"try_lock_trx" gorm:"column:TRY_LOCK_TRX_ID"`
	HoldingLockTrx int64  `json:"holding_lock_trx" gorm:"column:TRX_HOLDING_LOCK"`
}

// @Summary List all deadlocks
// @Success 200 {array} Model
// @Router /deadlock/list [get]
// @Security JwtAuth
// @Failure 400 {object} rest.ErrorResponse
// @Failure 401 {object} rest.ErrorResponse
func (s *Service) getList(c *gin.Context) {
	db := utils.GetTiDBConnection(c)
	var results []Model
	result := db.Table("information_schema.CLUSTER_DEADLOCKS").Find(&results)
	if result.Error != nil {
		rest.Error(c, rest.ErrBadRequest.NewWithNoMessage())
		return
	}
	c.JSON(http.StatusOK, results)
}
