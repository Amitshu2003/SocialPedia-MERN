import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        // checks token is our's or google's
        const isCustomAuth = token.length < 500

        let decodedData;
        if (token && isCustomAuth) {
            //for our token
            decodedData = await jwt.verify(token, 'secret')
            console.log("decodedData", decodedData);
            req.userId = decodedData?.id
        } else {
            // for google token
            decodedData = await jwt.decode(token)
            console.log("google decodedData", decodedData);
            req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error);
    }
}

export default auth