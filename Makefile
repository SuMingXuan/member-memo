DATE := `date +%Y%m%d`

build\:push:
	docker build -t member-memo-project:$(DATE) .
	docker tag member-memo-project:$(DATE) registry.cn-chengdu.aliyuncs.com/member-memo/project:$(DATE)
	docker push registry.cn-chengdu.aliyuncs.com/member-memo/project:$(DATE)