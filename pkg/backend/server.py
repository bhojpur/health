#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Copyright (c) 2018 Bhojpur Consulting Private Limited, India. All rights reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

from __future__ import absolute_import

import sys
from waitress import serve

from app import make_app
from settings import ProductionConfig
import logging
from logging.handlers import RotatingFileHandler

from flask import request

log = logging.getLogger("werkzeug")
logging.basicConfig(
    level=logging.INFO,
)
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler = RotatingFileHandler("./.logs/app.log", maxBytes=1000000, backupCount=1)
handler.setLevel(logging.DEBUG)
handler.setFormatter(formatter)

logger = logging.Logger("werkzeug", logging.DEBUG)

app = make_app(ProductionConfig, handler)

@app.before_first_request
def setup_logging():
    if app.debug:
        log.addHandler(logging.StreamHandler(stream=sys.stdout))
    else:
        log.addHandler(handler)

@app.after_request
def log_request(response):
    app.logger.log(
                logging.DEBUG, 
                msg="REQ: {} {} {}".format(request.method, 
                request.path, 
                response.status_code ))
    return response

serve(app, port=80)