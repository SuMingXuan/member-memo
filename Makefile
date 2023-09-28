DATE := `date +%Y%m%d`

build\:push:
	docker build -t member-memo:project .
	docker tag member-memo:project ccr.ccs.tencentyun.com/tsf_100020325872/member-memo:project
	docker push ccr.ccs.tencentyun.com/tsf_100020325872/member-memo:project
	

build\:bundle:
	docker build -t member-memo:bundled -f member-memo.bundled .
	docker tag member-memo:bundled ccr.ccs.tencentyun.com/tsf_100020325872/member-memo:bundled
	docker push ccr.ccs.tencentyun.com/tsf_100020325872/member-memo:bundled
