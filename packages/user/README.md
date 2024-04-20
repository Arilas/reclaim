# Reclaim User

Reclaim Auth is a module that represents your basic User models. It is designed in a way that:

1. Each user can have multiple emails, but only one is primary email used for authentication an communication.
2. We store old user passwords, so that we can check if the user is reusing the password.
3. User doesn't have any details and are abstract. Please create a User Profile to store user details.
4. We have a email verification system in place.
5. We have a password reset system in place.

## Installation

```bash
yarn add @reclaim/user
```

or

```bash
npm install --save @reclaim/auth
```
