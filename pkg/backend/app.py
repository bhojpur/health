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

import logging
import sys, os

sys.path.append("..")

from flask import Flask, jsonify, json
from flask_lambda import FlaskLambda
from flasgger import Swagger

from backend import initialize_dbase, dbase, settings
from backend.registration.microservice import profiles
from backend.booking.microservice import bookings
from backend.scheduling.microservice import schedules
from backend.authentication.microservice import auth

def api_configurations(app: Flask, template):
    template['servers'][0]['variables']['port']['default'] = os.environ.get('FLASK_RUN_PORT')
    app.config["SWAGGER"] = {"title": "Health API", "uiversion": 3, "openapi": "3.0.1", "basePath":"/v1" }
    swagger = Swagger(app, template=template)
    # print(swagger.template['servers'][0]['variables'])
    pass

def make_app(environment=None, log_handler=None):
    app = FlaskLambda(__name__, instance_relative_config=True)

    if environment:
        app.config.from_object(environment)
    else:
        app.config.from_object(settings.DevelopmentConfig)

    try:
        if not os.path.exists(app.instance_path):
            os.makedirs(app.instance_path)
    except OSError as error:
        logging.exception(error, stack_info=True)

    with open("../swagger/openapi.json") as file:
        template = json.loads(file.read())
        api_configurations(app, template)
        file.close()

    # initialize databases
    dbase.init_app(app)

    with app.app_context():
        initialize_dbase(app)
        app.register_blueprint(profiles)
        app.register_blueprint(bookings)
        app.register_blueprint(schedules)
        app.register_blueprint(auth)
    
    @app.route("/")
    def index():
        return jsonify({"status" : "ok", "apiversion":"1.0.0"})

    return app

if __name__ == "__main__":
    make_app()