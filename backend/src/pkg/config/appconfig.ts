import dotenv from "dotenv"
dotenv.config()

const value = (value: any): string  => {
    if(!value) throw new Error('Invalid env property: ' + value)
    return value as string
}

export default {
    PORT: Number(value(process.env.PORT)),
    DATABASE_URL: value(process.env.DATABASE_URL)
}
