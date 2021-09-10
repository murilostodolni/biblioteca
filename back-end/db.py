import psycopg2

host = "localhost"
dbname = ""
user = "postgres"
password = "example"
sslmode = "require"

conn_string = "host={0} user={1} password={2}".format(host, user, password)
connection = psycopg2.connect(conn_string)