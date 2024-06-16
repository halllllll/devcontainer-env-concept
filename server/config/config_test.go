package config

import (
	"fmt"
	"testing"
)

func TestXxx(t *testing.T) {
	wantPort := 3333
	// テスト用の環境変数
	t.Setenv("GO_APP_PORT", fmt.Sprint(wantPort))
	got, err := New()
	if err != nil {
		t.Fatalf("cannot create config: %v", err)
	}

	if got.Port != wantPort {
		t.Errorf("want %d, but got %d", got.Port, wantPort)
	}

	wantEnv := "dev"
	if got.Env != wantEnv {
		t.Errorf("want %s, but got %s", got.Env, wantEnv)
	}
}
