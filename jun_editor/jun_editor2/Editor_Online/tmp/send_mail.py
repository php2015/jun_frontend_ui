#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by PJZero on 2016/6/19
import smtplib
from email.mime.text import MIMEText
from email.header import Header

pwd = "jinsjpbpvjzydidc"
server_addr = "smtp.qq.com"
server_port = 465
sender = "1823403153@qq.com"

receivers = ['13006305269@163.com']

context = "来了? 请坐~\n url"

message = MIMEText(context, 'plain', 'utf-8')
message['From'] = Header("PJZero", 'utf-8')
message['To'] = Header(receivers[0], 'utf-8')
# subject = "test"
# message['Subject'] = Header(subject, 'utf-8')

try:
    smtp = smtplib.SMTP_SSL(server_addr, port=server_port)
    smtp.login(sender, password=pwd)
    smtp.sendmail(sender, receivers, message.as_string())
    print("success!")
except Exception as e:
    print("failed!")
