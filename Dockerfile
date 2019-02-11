FROM node
ADD . /src
WORKDIR /src
RUN npm install
RUN ls -al
EXPOSE 3000
CMD ["npm", "start"]