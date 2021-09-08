from flask import Flask, jsonify
from db import connection
from marshmallow import ValidationError
from server.instance import server

api = server.api
app = server.app

@app.before_first_request
def create_tables():
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS livros (id serial PRIMARY KEY, nome VARCHAR(64), autor VARCHAR(64), edicao INTEGER, unidades INTEGER);")
    cursor.execute("CREATE TABLE IF NOT EXISTS usuarios (cpf VARCHAR(11) PRIMARY KEY, nome VARCHAR(64), matricula VARCHAR(64));")
    cursor.execute("CREATE TABLE IF NOT EXISTS emprestimo (" +
                    "id serial PRIMARY KEY, " +
                    "cpf_usuario VARCHAR(11), " +
                    "CONSTRAINT fk_cpf_usuario FOREIGN KEY (cpf_usuario) REFERENCES usuarios (cpf), " +
                    "id_livro INTEGER, "+
                    "CONSTRAINT fk_id_livro FOREIGN KEY (id_livro) REFERENCES livros (id), " +
                    "data_emprestimo date, " +
                    "data_vencimento date);")
    connection.commit()
    cursor.close()
    connection.close()


@api.errorhandler(ValidationError)
def handle_validation_error(error):
    return jsonify(error.messages), 400

if __name__ == '__main__':
    server.run()