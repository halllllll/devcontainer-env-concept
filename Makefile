include .env
# build image for production
# docker compose -f {compose.yaml} build --no-cache --force-rm {service name}
# TODO: 環境変数の設定 `--build-arg` or secrets
build:
	docker compose -f ./compose.prod.yml  build --no-cache --force-rm app

# save production image tar.tz
# docker save {imagename:tag} -o {filename}.tar
save:
	docker save ${IMAGE_NAME}:latest -o app.tar