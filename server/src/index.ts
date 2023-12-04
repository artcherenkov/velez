import fastify, { FastifyRequest } from "fastify";
import dotenv from "dotenv";
import cors from "@fastify/cors";

dotenv.config();

const YANDEX_MAPS_API_KEY = process.env.YANDEX_MAPS_API_KEY;

const server = fastify({ logger: true });

server.register(cors, {
  origin: true,
});

server.post(
  "/geocode",
  async (
    request: FastifyRequest<{ Body: { coords: [number, number] } }>,
    reply,
  ) => {
    const coords = request.body.coords.join(",");

    const baseUrl = "https://geocode-maps.yandex.ru/1.x/";
    const response = await fetch(
      baseUrl + `?apikey=${YANDEX_MAPS_API_KEY}&geocode=${coords}&format=json`,
      { headers: { Referer: "http://localhost:3030/" } },
    );

    const data = await response.json();

    return reply.send(data);
  },
);

server.get("/load-ymaps", async (_request, reply) => {
  const response = await fetch(
    `https://api-maps.yandex.ru/v3/?apikey=${YANDEX_MAPS_API_KEY}&lang=ru_RU`,
    {
      headers: { referer: "http://localhost:3030/" },
    },
  );

  const data = await response.text();

  if (response.status > 201) {
    return reply.send('alert("failed to load maps")');
  }

  return reply.send(data);
});

server.listen(3030, "0.0.0.0", (err, address) => {
  if (err) throw err;
  server.log.info(`Server listening on ${address}`);
});
