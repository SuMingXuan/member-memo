FROM ccr.ccs.tencentyun.com/tsf_100020325872/member-memo:bundled

ADD . /app

RUN rm config/application.yml
RUN rm log/*.log
RUN bundle exec rails assets:precompile