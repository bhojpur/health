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

import os
import sys

sys.path.append('..')

from dotenv import get_key, set_key

__here__ = os.path.abspath(os.path.dirname(__file__))

class VARIABLES(object):
    def __init__(self) -> None:
        super().__init__()

        self.PSQL_CONNECT_TO = os.environ.get('PSQL_CONNECT_TOUT', 10)
        self.PSQL_SERVER_PO = os.environ.get('POSL_SERVER_PORT', 5432)

        self.BOOKING = {
                'PSQL_USERNAME': os.environ.get('PSQL_USERNAME', 'postgres'),
                'PSQL_PASSWORD': os.environ.get('PSQL_PASSWORD', 'password'),
                'PSQL_SVR_PORT': self.PSQL_SERVER_PO,
                'PSQL_HOSTNAME': os.environ.get('PSQL_HOSTNAME', 'localhost'),
                'PSQL_DATABASE': os.environ.get('PSQL_DB_BOOKING', 'health'),
                'PSQL_CON_TOUT': self.PSQL_CONNECT_TO
            }

        self.PROFILES = self.BOOKING.copy()
        self.PROFILES['PSQL_DATABASE'] = os.environ.get('PSQL_DB_PROFILES', 'health')

        self.SCHEDULES = self.BOOKING.copy()
        self.SCHEDULES['PSQL_DATABASE'] = os.environ.get('PSQL_DB_SCHEDULES', 'health')

        self.SUBSCRIBERS = self.BOOKING.copy() 
        self.SUBSCRIBERS['PSQL_DATABASE'] = os.environ.get('PSQL_DB_SUBSCRIBERS', 'health')
    
def setup_environ():
    environ = get_key('./.env', 'FLASK_ENV').__eq__('production')
    secret = get_key('./.env', 'SECRET_KEY').__eq__('')
    if secret:
        SECRET_KEY = os.urandom(128).hex('-')
        os.environ['SECRET_KEY'] = SECRET_KEY
        
        if environ:
            # if environ is in production
            set_key('./.env','SECRET_KEY', SECRET_KEY)
            
    # print(os.environ.get('FLASK_PORT'))
    pass

class Config:
    """
    Base configuration class. Contains default configuration settings +
     configuration settings applicable to all environments.
    """
    setup_environ()
    VARIABLES = VARIABLES()

    # Default settings
    ENV = "development"
    DEBUG = False
    TESTING = False
    WTF_CSRF_ENABLED = True

    # Settings applicable to all environments
    SECRET_KEY = os.environ.get('SECRET_KEY')

    MAIL_SERVER = "smtp.googlemail.com"
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME", default="")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD", default="")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_USERNAME", default="")
    MAIL_SUPPRESS_SEND = False
    
    JSONIFY_PRETTYPRINT_REGULAR = True

    # PSQL_CONNECT_TO = os.environ.get('PSQL_CONNECT_TOUT', 10)
    # PSQL_SERVER_PO = os.environ.get('POSL_SERVER_PORT', 5432)
    
    BOOKING = VARIABLES.BOOKING

    PROFILES = VARIABLES.PROFILES
    # PROFILES['PSQL_DATABASE'] = os.environ.get('PSQL_DB_PROFILES', 'health')

    SCHEDULES = VARIABLES.SCHEDULES
    # SCHEDULES['PSQL_DATABASE'] = os.environ.get('PSQL_DB_SCHEDULES', 'health')

    SUBSCRIBERS = VARIABLES.SUBSCRIBERS 
    # SUBSCRIBERS['PSQL_DATABASE'] = os.environ.get('PSQL_DB_SUBSCRIBERS', 'health')

    PSQL_CONNECT_URL = "postgres://%(PSQL_USERNAME)s:%(PSQL_PASSWORD)s@%(PSQL_HOSTNAME)s:%(PSQL_SVR_PORT)s/%(PSQL_DATABASE)s?connect_timeout=%(PSQL_CON_TOUT)s&application_name=HEALTH"
    
    SQLALCHEMY_BINDS = {
        'booking': f'{PSQL_CONNECT_URL}' % BOOKING,
        'profiles': f'{PSQL_CONNECT_URL}' % PROFILES,
        'schedules': f'{PSQL_CONNECT_URL}' % SCHEDULES,
        'subscribers': f'{PSQL_CONNECT_URL}' % SUBSCRIBERS,
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    DEBUG = True

    SESSION_REFRESH_EACH_REQUEST = True

    SESSION_COOKIE_NAME = "bhealth"

    JSONIFY_PRETTYPRINT_REGULAR = True
    # SERVER_NAME = "backend.localhost"

class TestingConfig(Config):

    SECRET_KEY = "ncamcajdansdkasaiskdaslfaljfoanjoakpmsdpadnaojfoamfanfo"

    ENV = "development"

    TESTING = True

    DEBUG = True

    WTF_CSRF_ENABLED = False
    MAIL_SUPPRESS_SEND = True

    SESSION_REFRESH_EACH_REQUEST = True

    SESSION_COOKIE_NAME = "bhealth"

    JSONIFY_PRETTYPRINT_REGULAR = True

    # SQLALCHEMY_BINDS = {
    #     "booking": "sqlite:///databases/booking.db",
    #     "profiles": "sqlite:///databases/profiles.db",
    #     "schedules": "sqlite:///databases/schedules.db",
    #     "subscribers": "sqlite:///databases/subscribers.db",
    # }
    # SERVER_NAME = "backend.localhost"

class ProductionConfig(Config):
    ENV = "production"
    DEBUG = False
    WTF_CSRF_ENABLED = True
    MAIL_SUPPRESS_SEND = True

    SESSION_REFRESH_EACH_REQUEST = True

    