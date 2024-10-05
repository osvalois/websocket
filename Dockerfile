# Usar la imagen oficial de Bun
FROM oven/bun:1 as base

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json
COPY package.json ./

# Copiar bun.lockb si existe
COPY bun.lockb* ./

# Instalar dependencias
RUN bun install --production

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["bun", "run", "start"]