import ErrorHandler from "../utils/errorHandler.js";

class Middleware {
    static checkParams = (schema, property) => {
        return (req, res, next) => {
            const { error, value } = schema.validate(req[property]);
            const valid = error == null;
            if (valid) {
                req.query = value;
                next();
            } else {
                const { details } = error;
                res
                    .status(400)
                    .json({ error: `${details[0].message.replace(/['"]+/g, "")}` });
            }
        };
    };

    static errorHandler = (err, req, res, next) => {
        let error = { ...err };
        error.message = err.message; // this statement is imp

        if (err.name == "CastError") {
            error = new ErrorHandler(`Not found at id ${err.value}`, 400);
        }

        if (err.code == 11000) {
            error = new ErrorHandler("Duplicate Fields", 400);
        }

        if (err.name == "ValidationError") {
            const message = Object.values(err.errors).map((val) => val.message);
            error = new ErrorHandler(`${message}`, 400);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error",
        });
    };

}

export default Middleware;