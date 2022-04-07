import datetime
from asyncio import constants
from turtle import title
from unittest import result
from venv import create

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
cors = CORS(app)

class Articles(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    time = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __init__(self, title, body):
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'time')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)



@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)


@app.route('/get/<id>/', methods=['GET'])
def get_article(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)

@app.route('/add', methods=['POST'])
def add_articles():
    title = request.json['title']
    body = request.json['body']
    articles = Articles(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)

@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)
    title = request.json['title']
    body = request.json['body']
    article.title = title
    article.body = body
    db.session.commit()
    return article_schema.jsonify(article)

@app.route('/delete/<id>/', methods=['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)

    


if __name__ == '__main__':
    app.run(host='20.20.1.181', port=19000, debug=True)
