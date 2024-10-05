# Usar la imagen oficial de Bun
FROM oven/bun:1 as base

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y bun.lockb (si existe)
COPY package.json bun.lockb* ./

# Instalar todas las dependencias, incluyendo devDependencies
RUN bun install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir el frontend
RUN bun run build

# Etapa de producción
FROM oven/bun:1 as production

WORKDIR /app

# Copiar los archivos necesarios desde la etapa de base
COPY --from=base /app/package.json /app/bun.lockb* ./
COPY --from=base /app/src ./src
COPY --from=base /app/public ./public
COPY --from=base /app/tsconfig.json ./

# Instalar solo las dependencias de producción
RUN bun install --production

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["bun", "run", "src/server.ts"]