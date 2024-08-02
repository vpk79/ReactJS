function updateUser(userId, body) {
    // Проверка за липсващи полета
    if (body.hasOwnProperty(identity) === false || body[identity].length == 0) {
        throw new RequestError$2('Missing fields');
    }

    // Проверка дали потребителят съществува
    const existingUser = context.protectedStorage.query('users', { _id: userId });
    if (existingUser.length === 0) {
        throw new NotFoundError(`User with id ${userId} not found`);
    }

    // Проверка дали съществува друг потребител със същата идентичност
    if (context.protectedStorage.query('users', { [identity]: body[identity], _id: { $ne: userId } }).length !== 0) {
        throw new ConflictError$1(`A user with the same ${identity} already exists`);
    }

    // Обновяване на потребителските данни
    const updatedUser = Object.assign({}, existingUser[0], body, {
        [identity]: body[identity],
        hashedPassword: body.password ? hash(body.password) : existingUser[0].hashedPassword
    });

    const result = context.protectedStorage.update('users', userId, updatedUser);
    delete result.hashedPassword;

    return result;
}
