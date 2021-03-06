from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from db import connection
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)

CORS(app)

class Livro(Resource):
    def get(self):
        conn = connection.cursor()
        conn.execute("SELECT * FROM livros")
        query = conn.fetchall()
        
        return jsonify(query)

    def post(self):
        cursor = connection.cursor()
        nome = request.json['nome']
        edicao = request.json['edicao']
        autor = request.json['autor']
        unidades = request.json['unidades']

        try:
            cursor.execute("INSERT INTO livros (nome, autor, edicao, unidades) VALUES (%s, %s, %s, %s);", (nome, autor, edicao, unidades))
            connection.commit()
        except  Exception as err:
            return "ERRO: {0}".format(err), 404
        return "OK"

class Usuario(Resource):
    def get(self):
        conn = connection.cursor()
        conn.execute("SELECT * FROM usuarios")
        query = conn.fetchall()
        return jsonify(query)

    def post(self):
        cursor = connection.cursor()
        cpf = request.json['cpf']
        nome = request.json['nome']
        matricula = request.json['matricula']

        try:
            cursor.execute("INSERT INTO usuarios (cpf, nome, matricula) VALUES (%s, %s, %s);", (cpf, nome, matricula))
            connection.commit()
        except  Exception as err:
            return "ERRO: {0}".format(err), 404
        return "OK"

class Emprestimo(Resource):
    def get(self):
        conn = connection.cursor()
        conn.execute("SELECT * FROM emprestimo")
        query = conn.fetchall()
        return jsonify(query)

    def post(self):
        cursor = connection.cursor()
        cpfUsuario = request.json['cpf_usuario']
        idLivro = request.json['id_livro']
        dataEmprestimo = request.json['data_emprestimo']
        dataVencimento = request.json['data_vencimento']

        try:
            cursor.execute("INSERT INTO emprestimo (cpf_usuario, id_livro, data_emprestimo, data_vencimento) VALUES (%s, %s, %s, %s);", (cpfUsuario, idLivro, dataEmprestimo, dataVencimento))
            connection.commit()
        except  Exception as err:
            return "ERRO: {0}".format(err), 404
        return "OK"

api.add_resource(Emprestimo, '/emprestimo')
api.add_resource(Usuario, '/usuario')
api.add_resource(Livro, '/livro')

if __name__ == '__main__':
    app.run()