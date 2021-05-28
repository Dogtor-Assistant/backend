declare namespace Express {
   export interface Request {
        authenticated: {
            id: string
        } | null
   }
}
