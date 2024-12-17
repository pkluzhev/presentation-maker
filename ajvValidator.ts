import Ajv from "ajv"
import schema from "./PresentationSchema.json"

const ajv = new Ajv({allErrors: true})

export const validate = ajv.compile(schema)