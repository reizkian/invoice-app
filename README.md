# Invoice App

An invoice is a document given to the buyer by the seller to collect payment. It includes the cost of the products purchased or services rendered to the buyer. Invoices can also serve as legal records, if they contain the names of the seller and client, description and price of goods or services, and the terms of payment.

| Technology Stack                    |
| ----------------------------------- |
| [VueJS](https://vuejs.org/)         |
| [NodeJS](https://nodejs.org/en/)    |
| [MongoDB](https://www.mongodb.com/) |

## Project Setup & installation

```
$ git clone https://github.com/reizkian/invoice-app.git
$ cd ./invoice-app

# setup client dependencies
$ cd ./client
$ npm install

# setup server dependencies
$ cd .. && cd ./server
$ npm install
```

## Database Setup and Configuration

```
# install mongodb
$ sudo apt-update
$ sudo apt install mongodb

# create root database folder
$ cd /
$ mkdir -p data/db

# set permissions
$ sudo chown <USERNAME> /data/db

# check installation
$ mongo --version
```

## Run Developmet Server

open in separate teminal instance

```
# terminal 1 - client
$ cd ./client
$ npm run serve

# terminal 2 - server
$ cd ./server
$ nodemon index

# terminal 3 - mongodb service
$ mongod

# terminal 4 - mongodb shell
$ mongo
$ use INVOICE_DATABASE
```
