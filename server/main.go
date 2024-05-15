package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func corsHandler(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    if r.Method == "OPTIONS" {
      return
    }
    next.ServeHTTP(w, r)
  })
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/api/hello", hello).Methods("GET")

	router.Use(mux.CORSMethodMiddleware(router))
	router.Use(corsHandler)
	
	http.ListenAndServe(":8085", router)
}

type Ping struct {
	Status int 
	Rssult string
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello!!!")
	p := Ping{http.StatusOK, "hello!"}
	res, err := json.Marshal(p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}

func echoHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello World</h1>")
}
