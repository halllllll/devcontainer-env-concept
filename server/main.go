package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sample/docker-dev-env/config"
	"syscall"
	"time"

	"github.com/go-michi/michi"
	"golang.org/x/sync/errgroup"
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

func NewMux() http.Handler {
	mux := michi.NewRouter()
	mux.Use(corsHandler)
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		_, _ = w.Write([]byte(`{"status": "ok"}`))
	})
	mux.HandleFunc("GET /hello", hello)
	mux.HandleFunc("GET /htmlhello", htmlHello)
	return mux
}

func main() {
	cfg, err := config.New()
	if err != nil {
		log.Fatal(err)
	}
	l, err := net.Listen("tcp", fmt.Sprintf(":%d", cfg.Port))
	mux := NewMux()

	if err != nil {
		log.Fatal(err)
	}
	url := fmt.Sprintf("http://%s", l.Addr().String())
	log.Printf("start with: %v", url)

	server := &http.Server{Handler: mux}

	if err := run(context.Background(), server, l); err != nil {
		fmt.Printf("failed to terminate server: %v\n", err)
	}
}

func run(ctx context.Context, srv *http.Server, l net.Listener) error {
	ctx, stop := signal.NotifyContext(ctx, os.Interrupt, syscall.SIGTERM)
	defer stop()

	eg, ctx := errgroup.WithContext(ctx)
	eg.Go(func() error {
		if err := srv.Serve(l); err != nil && err != http.ErrServerClosed {
			log.Printf("failed to close: %v", err)
			return err
		}
		return nil
	})

	<-ctx.Done()
	if err := srv.Shutdown(context.Background()); err != nil {
		log.Printf("failed to shutdown: %v", err)
	}
	return eg.Wait()
}

type Ping struct {
	Status  int       `json:"status"`
	Cur     time.Time `json:"timestamp"`
	Message string    `json:"message"`
}

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hello")
	p := Ping{Status: http.StatusOK, Cur: time.Now(), Message: "hello!!!"}
	res, err := json.Marshal(p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}

func htmlHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello World!</h1>")
}
