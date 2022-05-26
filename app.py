from flask import Flask
import os

app = Flask(__name__)

@app.route("/")
def name():
    return "hello world"
@app.route("/health")
def health():
    return "healthy"

@app.route("/books")
def hello():
    return '''{
  "Users": [
    { 
        "name": "harrypotter",
        "author": "J.k rowling",
        "id":1
    },
    {
       "name": "the hobbit",
       "author": "J. R. R. Tolkien",
       "id":2
    },
    {
       "name": "drawn theory",
       "author": "pakistan",
       "id":3
    }
  ]
}'''

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7000))
    app.run(debug=True,host='0.0.0.0',port=port)
