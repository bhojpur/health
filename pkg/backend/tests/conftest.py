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

import json
# import subprocess as subpro
import os
import logging
from flask.helpers import url_for

# from sqlalchemy.orm.query import Query
from sqlalchemy.sql.expression import and_

import pytest
from backend import dbase, session

from backend.app import make_app
from backend import settings

# session = Session(bind="__all__", expire_on_commit=False, autocommit=True)
@pytest.fixture(scope='session')
def app():
    app = make_app(settings.TestingConfig)
    # app.config["TESTING"] = True
    yield app
    session.remove()

@pytest.fixture
def runner(app):
    return app.test_cli_runner()

@pytest.fixture(scope='session')
def client(app):
    with app.test_request_context():
                
        yield app.test_client()

        
@pytest.fixture()
def doctor(speciality, address, license):
    doctor = dict(
        role="doctor",
        fullname="Dr. Shashi Bhushan Rai",
        gender="MALE",
        taxid="XSDSDSMM4x",
        phone="911920400949",
        photo="/media/profiles/doctors/foto.png",
        specialities=speciality,
        addresses=address,
        licences=license,
        mode="video",
        birthdate="2000-02-01",
    )
    yield doctor

@pytest.fixture
def address():
    return [dict(
        streetname="Nirbhaya Dihra",
        doornumber="63 RC-RAI",
        zipcode="803207",
        state="Bihar",
        city="Arrah",
        country="India",
    )]

@pytest.fixture
def speciality():
    speciality = [
        dict(
            title="Nutritionist",
            description="""
            Help people to adopt better eating habit for an enhanced lifestyle
            """,
        ),
        dict(title="Dentist", description="Help people to improve their dental health"),
    ]
    yield speciality

@pytest.fixture
def license():
    license = [
        dict(
            code="XMSNDUASLKDASK",
            issuedate="20/02/2018",
            enddate="20/02/23",
            issuingorg="Medical Council of India",
            issuingcountry="India",
            certificate="/media/profiles/licenses/certificate.pdf",
        ),
        dict(
            code="XMSNDCDHSJASK",
            issuedate="20/02/2020",
            enddate="20/02/25",
            issuingorg="Medical Council of India",
            issuingcountry="India",
            certificate="/media/profiles/licenses/certificate.pdf",
        ),
    ]

    yield license

@pytest.fixture()
def beneficiary(address):
    beneficiary = dict(
        role="beneficiary",
        fullname="Pramila Kumari",
        birthdate="2000-01-02",
        gender="FEMALE",
        photo="/media/profiles/beneficiaries/foto.jpg",
        phone="+91 920 450 673",
        taxid="CSDXDCNSAMMX",
        addresses=address,
    )

    yield beneficiary

# Scheduling configurations
@pytest.fixture
def schedules(processor):
    schedules = [
        dict(
            # doctorId=processor.get_publicid(),
            year=2021,
            month="aug",
            weeks={
                "week31": dict(
                    timeslots={
                        "mon": ["12:00", "13:00", "15:00"],
                        "tue": ["14:00", "16:00"],
                        "wed": ["8:00", "10:00", "15:00"],
                        "sat": ["10:00", "13:00", "16:00", "18:00"],
                    }
                )
            },
        )
    ]
    yield schedules

@pytest.fixture
def subscriber():
    subscriber = [ dict(
        username="+911930400399",
        password="sacadcadffadadadadas",
        role="doctor",
        birthdate="2012/03/26",
        phone="+911930400399",
        fullname="Shashi Bhushan Rai",
        country="India",
        gender="Male",
    ),
    dict(
        username="+911930400391",
        password="sacadcadffadadadadas",
        role="beneficiary",
        birthdate="2012/03/26",
        phone="+911930400391",
        fullname="Charley de Melo",
        country="India",
        gender="Female",
    )]
    yield subscriber

class AuthActions(object):
    def __init__(self, client) -> None:
        self.client = client 

    def create(self, user):
        url = url_for("auth.create_credencials")
        return self.client.post(url, data=json.dumps(user), \
            content_type="application/josn", \
                follow_redirects=True
        )

    def authenticate(self, user):
        url = url_for("auth.authenticate")
        return self.client.post(url, data=json.dumps(user), \
            content_type="application/josn", \
                follow_redirects=True
        )

    def deauthenticate(self):
        url = url_for("auth.deauthenticate")
        return self.client.get(url, 
                follow_redirects=True)

@pytest.fixture
def credencials(client):
    actions = AuthActions(client)
    yield actions

@pytest.fixture
def appointment():
    appointment = dict(
        date = "2018-03-26", 
        time = "12:30",
        doctor_name = "Shashi Bhushan Rai",
        doctor_speciality = "Nutritionist",
        doctor_id = "mnjkkngvbnnhogivucvghbjnobvhihbjnb hvjhjp-ascasaertrytu74453-35",
        beneficiary_phone = "+1 (628) 200-4199",
        beneficiary_name = "Bimla Pandey",
        beneficiary_id = "fguhiojlbjhjvygifjcvkhj76576789y8gfyctugvhbjo98t90pik-nbgft",
        remarks = "Remarks"
    )
    yield appointment

class ResponseProcessor(object):

    def __init__(self) -> None:
        super().__init__()
        self.public_id = ''
    
    # @app.after_request
    def set_publicid(self, id):
        os.environ['PUBLIC_ID'] = id
    
    def get_publicid(self):
        return os.getenv("PUBLIC_ID", '')
        # return self.public_id
        
@pytest.fixture
def processor():
    processor = ResponseProcessor()
    yield processor

class UrlCaller(object):

    def __init__(self) -> None:
        super().__init__()

    def get_url(self, operation, **kwargs):
        # try:
        return url_for(operation, **kwargs)
        # except RuntimeError as error:
        #     logging.exception(error)

@pytest.fixture
def url_caller():
    url_caller = UrlCaller()

    yield url_caller