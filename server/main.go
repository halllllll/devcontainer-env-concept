package main

import (
	"fmt"
	"net/http"
)

func main() {

	http.HandleFunc("/", echoHello)
	http.HandleFunc("/hello", hello)
	http.ListenAndServe(":8085", nil)
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello!</h1")
}

func echoHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello World</h1>")
}
