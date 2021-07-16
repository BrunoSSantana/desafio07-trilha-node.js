import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      // caso o NODE_ENV seja igual a "test" host recebe "localhost", caso contrário host recebe host
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      // caso o NODE_ENV seja igual a "test", database receberá rentals_test, se não, utilize o padrão
      database:
        process.env.NODE_ENV === "test"
          ? "fin_api_test"
          : defaultOptions.database,
    })
  );
};
