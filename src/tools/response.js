class ResponseHandler {
    static success(res, data = {}, message = "Success", statusCode = 200) {
        res.status(statusCode).json({
            status: "success",
            message,
            data,
        });
    }

    static successCreated(
        res,
        data = {},
        message = "Success",
        statusCode = 201
    ) {
        res.status(statusCode).json({
            status: "success",
            message,
            data,
        });
    }

    static error(res, error = "An error occurred", statusCode = 500) {
        res.status(statusCode).json({
            status: "error",
            message: error.message || error,
            data: {},
        });
    }

    static badRequest(res, message = "Bad Request") {
        this.error(res, message, 404);
    }

    static unauthorized(res, message = "Unauthorized") {
        this.error(res, message, 401);
    }

    static forbidden(res, message = "Forbidden") {
        this.error(res, message, 403);
    }

    static notFound(res, message = "Not Found") {
        this.error(res, message, 404);
    }

    static conflict(res, message = "Conflict") {
        this.error(res, message, 409);
    }

    static unprocessableEntity(res, message = "Unprocessable Entity") {
        this.error(res, message, 422);
    }

    static internalError(res, message = "Internal error") {
        this.error(res, message, 500);
    }
}

module.exports = ResponseHandler;
