// Define the user interface
interface CustomUser {
  id: string;
  email: string;
  name: string;
}

// Add the user to the request object
declare namespace Express {
  export interface Request {
    user?: CustomUser;
  }
}
