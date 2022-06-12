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
from flask import Blueprint, json, jsonify, request, abort
from flask.helpers import url_for
from sqlalchemy.sql.elements import and_
from werkzeug.utils import redirect

from backend.scheduling.models import Schedule
from backend.authentication import token_required

LOG = Logger("SCHEDULING", 50)
schedules = Blueprint("schedules", __name__, url_prefix="/v1/schedules")

@schedules.route("/createSchedule", methods=["POST"])
@token_required
def create_schedule(current_user):
    if current_user.role == "doctor":
        
        if len(current_user.access_keys) > 0:
            private_key = current_user.access_keys[0].private_key
            data = json.loads(request.data)
            count = data.__len__()
            schedules = [
                Schedule(
                    year=schedule["year"],
                    weeks=schedule["weeks"],
                    month=schedule["month"],
                    doctor_nif=private_key,
                ).save()
                for schedule in data
                if schedule is not None
            ]

            if not None in schedules and len(schedules) == count:
                return jsonify({"message": "Schedule created successfully."})
        return jsonify({"Error": "Create a practitioner profile to be able of adding schedules"}), 401
    abort(403, jsonify({"Error":"Not authorized to add schedules"}))

@schedules.route("/updateSchedule", methods=["PUT"])
@token_required
def update_schedule(current_user):
    data = json.loads(request.data)
    old = None
    for schedule in data:
        private_key = current_user.access_keys[0].private_key
        if schedule is not None:
            old = Schedule.query.filter(
                and_(
                    Schedule.month.like(schedule["month"]),
                    Schedule.year == schedule["year"],
                ),
                Schedule.doctor_nif == private_key,
            ).one_or_none()
            if old is None:
                redirect(url_for(".create", schedule=schedule))
            old.weeks.update(schedule["weeks"])

    return jsonify(old.weeks)

# @schedules.errorhandler(401)
# def create_error(code):
#     return "Not Allowed"

@schedules.errorhandler(403)
def wrong_schedule_data(code):
    return jsonify({"Error": "Provided data is not supported"})

@schedules.route("/all")
def get_all():
    return jsonify({""})

@schedules.route("/<date>", methods=["GET"])
def getby_date():
    return jsonify({""})

@schedules.route("/weeks/<number>/<year>")
def getby_week():
    return jsonify({""})