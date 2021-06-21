package main

import (
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/operate-first/meteor/pkg/api"
	"github.com/operate-first/meteor/pkg/frontend"
	"k8s.io/klog/v2"
)

func order(w http.ResponseWriter, r *http.Request) {

}

func main() {
	router := mux.NewRouter()

	router.HandleFunc("/api", api.Health)
	router.HandleFunc("/api/health", api.Health)
	router.HandleFunc("/api/v1/health", api.Health)
	router.HandleFunc("/api/v1/order", api.Order)

	spa := frontend.Frontend{StaticPath: "dist", NotFound: "404.html"}
	router.PathPrefix("/").Handler(spa)

	srv := &http.Server{
		Handler: router,
		Addr:    "127.0.0.1:8000",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	klog.Infof("🌠 Meteor Command Center started at localhost:8000")
	klog.Fatal(srv.ListenAndServe())

}
