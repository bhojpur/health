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
from logging import Logger

from sqlalchemy import Column, String, Integer, Text
from sqlalchemy.orm import relationship
from sqlalchemy.orm.session import Session
from sqlalchemy.sql.expression import and_
from sqlalchemy.sql.schema import ForeignKeyConstraint, UniqueConstraint
from sqlalchemy.sql.sqltypes import PickleType

from backend import dbase, initializer

session = dbase.session

class Schedule(dbase.Model):
    __table_args__ = {"extend_existing": True}
    __tablename__ = "schedule"
    __bind_key__ = "schedules"

    id = Column(Integer, primary_key=True)
    weeks = Column(PickleType, nullable=False)
    month = Column(String(12), nullable=False)
    year = Column(Integer, nullable=False)
    doctor_nif = Column(Text, nullable=False)
    # indexes = ForeignKeyConstraint(["month", "doctor_nif", "year"], \
    #         ["schedule.month", "schedule.doctor_nif", "schedule.year"])
    
    UniqueConstraint("month", "doctor_nif", "year", name="unique_schedule")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.year = initializer("year", kwargs)
        self.weeks = initializer("weeks", kwargs)
        self.month = initializer("month", kwargs)
        self.doctor_nif = initializer("doctor_nif", kwargs)

    def save(self):

        schedule = self.getby_unique_keys(self.month, self.year, self.doctor_nif)
        try:
            if schedule is not None:
                schedule.weeks.update(self.weeks)
                return self
            session.add(self)
            session.commit()
            return self
        except RuntimeError as error:
            Logger("SCHEDULE").debug(msg=error.args, stack_info=True)
            return None

    def getby_date(self, date):
        return Schedule.query.filter(date == date)

    def getby_date_time(self, date, time):
        return Schedule.query.filter(
            and_(Schedule.date.like(date), Schedule.time.like(time))
        )

    def getby_unique_keys(self, month, year, doctor_nif=None):
        if doctor_nif:
            return Schedule.query.filter(
                and_(Schedule.month.like(month), Schedule.year <= year),
                Schedule.doctor_nif == doctor_nif,
            ).one_or_none()
        return Schedule.query.filter(
            and_(Schedule.month.like(month), Schedule.year <= year)
        )

# class TimeSlot(Base):
#     __tablename__ = "timeslots"
#     __bind_key__ = "schedules"
#     __table_args__ = {"extend_existing": True}

#     id = Column(Integer, primary_key=True)
#     slots = Column(PickleType, nullable=True)
#     schedule = relationship("Schedule", back_populates="timeslots")