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
from flask.globals import session

from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.sql.schema import UniqueConstraint
from sqlalchemy.sql.sqltypes import Date, Time

from backend import dbase, initializer

session = dbase.session

class Appointment(dbase.Model):
    __tablename__ = "appointments"
    __table_args__ = {"extend_existing": True}
    __bind_key__ = "booking"

    id = Column(Integer, primary_key=True)
    date = Column(Date)
    time = Column(Time)
    doctor_name = Column(String(55))
    doctor_speciality = Column(String(55))
    doctor_identity = Column(Text)
    beneficiary_name = Column(String(55))
    beneficiary_phone = Column(String(55))
    beneficiary_identity = Column(Text)
    remarks = Column(Text)

    UniqueConstraint('beneficiary_id','date','time', name='unique_appointmt')

    def __init__(self, **kwargs):
        self.date = initializer("date", kwargs)
        self.time = initializer("time", kwargs)
        self.doctor_name = initializer("doctor_name", kwargs)
        self.doctor_speciality = initializer("doctor_speciality", kwargs)
        self.doctor_identity = initializer("doctor_id", kwargs)
        self.beneficiary_name = initializer("beneficiary_name", kwargs)
        self.beneficiary_phone = initializer("beneficiary_phone", kwargs)
        self.beneficiary_identity = initializer("beneficiary_id", kwargs)
        self.remarks = initializer("remarks", kwargs)

    def save(self):
        
        try:
            session.add(self)
            session.commit()
            return self
        except RuntimeError as error:
            logging.exception(error)
        
    def getby_beneficiaryId(self, identity: int = None):
        if identity is not None:
            beneficiary = self.query.filter(Appointment.beneficiary_id.ilike(identity))
            return beneficiary
        return None

    def getby_beneficiaryName(self, name: str = None):
        if name is not None:
           beneficiary = self.query.filter(Appointment.beneficiary_name.ilike(name))
           return beneficiary
        return None
