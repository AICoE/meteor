package metrics

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var OrdersTotal = promauto.NewCounter(prometheus.CounterOpts{
	Name: "meteor_orders_total",
	Help: "The total number of processed orders",
})
