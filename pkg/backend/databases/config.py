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

import click
from flask.cli import with_appcontext
from flask.globals import current_app
from flask_sqlalchemy import SQLAlchemy, declarative_base
from sqlalchemy.orm.scoping import scoped_session
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.sql.schema import MetaData
from flask_migrate import Migrate

dbase = SQLAlchemy()
engine = None
migrate = Migrate()

Base = declarative_base()
session = scoped_session(sessionmaker(autocommit=False, autoflush=False))
# session = scoped_sess(dbase)

def initializer(key, kwargs):
    if kwargs.keys().__contains__(key):
        return kwargs[key]
    return None

@click.command("populate")
@click.option("--tables", default="all")
@with_appcontext
def populate_tables(tables):
    click.echo("Populating tables: {}".format(tables))
    initialize_dbase(current_app)

@click.command("delete")
@click.option("--tables", default="all")
@with_appcontext
def erase_tables(tables):
    click.echo("Deleting tables: {}".format(tables))
    delete()

def initialize_dbase(app):
    # dbase.init_app(app)
    engine = dbase.get_engine(app)
    session.configure(bind=engine)
    migrate.init_app(app, dbase)
    dbase.create_all(bind="__all__", app=app)
    app.cli.add_command(populate_tables)
    app.cli.add_command(erase_tables)

def delete():
    dbase.drop_all()
    click.echo("Done!")