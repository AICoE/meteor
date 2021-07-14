package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/AICoE/meteor/pkg/api"
	"github.com/AICoE/meteor/pkg/frontend"
	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"k8s.io/klog/v2"
)

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})
	router.Handle("/metrics", promhttp.Handler())
	router.HandleFunc("/api/v1/order", api.OrderEndpoint)

	spa := frontend.Frontend{StaticPath: "dist", NotFound: "404.html"}
	router.PathPrefix("/").Handler(spa)

	srv := &http.Server{
		Handler: router,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	klog.Infof("🌠 Meteor Command Center started at http://localhost:8000")
	klog.Fatal(srv.ListenAndServe())

}
