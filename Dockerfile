FROM registry.cn-chengdu.aliyuncs.com/member-memo/bundled:20230909

ADD . /app

RUN rm config/application.yml