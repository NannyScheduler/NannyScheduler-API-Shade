This document provides guidelines and examples for the Nanny Scheduler API endpoints.

**_GENERAL GUIDELINES_**

Restful APIs for Nanny users

- Get a list of all the nannies - GET http://localhost:5500/api/nanny/
  Example of response

```json
[
  {
    "id": 1,
    "email": "sophie@gmail.com",
    "first_name": "Sophie",
    "last_name": "Moore",
    "address": "3 Igone Street, Lagos",
    "hourly_rate": 1000,
    "can_drive": true,
    "phone": "+23137720932",
    "image_url": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "user_id": 4
  },
  {
    "id": 2,
    "email": "grace@gmail.com",
    "first_name": "Grace",
    "last_name": "Adeleke",
    "address": "3 Marla Street, Benin",
    "hourly_rate": 800,
    "can_drive": false,
    "phone": "+23137720911",
    "image_url": "https://images.unsplash.com/photo-1503983469989-e2cbfd3bfeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "user_id": 5
  }
]
```

-Get a single nanny by Id GET http://localhost:5500/api/nanny/{id}
Example of response:

```json
{
  "id": 1,
  "email": "sophie@gmail.com",
  "first_name": "Sophie",
  "last_name": "Moore",
  "address": "3 Igone Street, Lagos",
  "hourly_rate": 1000,
  "can_drive": 1,
  "phone": "+23137720932",
  "image_url": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "user_id": 4
}
```

-To create a new nanny/register or sign up, we need to POST http://localhost:5500/api/nanny/register
Ensure you send these fields in this format when posting:

```json{
    "email": "alison@gmail.com",
    "password": "ali",
    "first_name": "Alison",
    "last_name": "Stur",
    "address": "Italy Road, Lagos",
    "hourly_rate": 1500,
    "can_drive": false,
    "phone": "+2333567984"
}
```

-To login, we need to POST http://localhost:5500/api/nanny/login

Ensure you send the correct email and password

-To edit or update nanny details, PUT http://localhost:5500/api/nanny/${id}

-To delete nanny details, DELETE http://localhost:5500/api/nanny/${id}

Restful APIs for Parent users

- Get a list of all the parents - GET http://localhost:5500/api/parent/
  Example of response

```json
[
  {
    "id": 1,
    "first_name": "Juye",
    "last_name": "Young",
    "email": "juye@gmail.com",
    "phone": "+23138920932",
    "address": "3 Lokoja Street, Lagos",
    "user_id": 2
  },
  {
    "id": 2,
    "first_name": "Tolu",
    "last_name": "Tayo",
    "email": "user@gmail.com",
    "phone": "+2459809243",
    "address": "15 Gill Road, Asaba",
    "user_id": 1
  }
]
```

-Get a single parent by Id GET http://localhost:5500/api/parent/{id}
Example of response:

```json
{
  "id": 1,
  "first_name": "Juye",
  "last_name": "Young",
  "email": "juye@gmail.com",
  "phone": "+23138920932",
  "address": "3 Lokoja Street, Lagos",
  "user_id": 2
}
```

-To create a new parent/register or sign up, we need to POST http://localhost:5500/api/parent/register
Ensure you send these fields in this format when posting:

```json{
  "first_name": "Lala",
  "last_name": "Bana",
  "phone": "+2459820233",
  "address": "Abuja",
  "email": "lala@gmail.com",
  "password": "112233"
}
```

-To login, we need to POST http://localhost:5500/api/parent/login

Ensure you send the correct email and password

-To edit or update parent details, PUT http://localhost:5500/api/parent/${id}

-To delete parent details, DELETE http://localhost:5500/api/parent/${id}
