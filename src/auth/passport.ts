
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';

import {UserMysqlRepository} from "../repositories/user.repository";
import {UserMapperService} from "../mappers/user.mapper";
import {AuthError} from "../utils/handleErrors/auth.error";

const userRepository = new UserMysqlRepository(new UserMapperService());

passport.use(new LocalStrategy( async(email, password, done) => {

     const authError = new AuthError();

     const user = await userRepository.findUserByEmail(email);

     if (!user) {
          return done(null, false, {
               message: JSON.stringify(authError.incorrectCredentials)
          });
     }

     // Comprobamos la contraseña
     const match = bcryptjs.compareSync(password, user.password);
     if (!match) {
          return done(null, false, {
               message: JSON.stringify(authError.incorrectCredentials)
          });
     }

     return done(null, user);
}));

// {id: 1, name: 'Juan'}
// 1. Serialización. Pasar de un objeto a un dato muy particular
passport.serializeUser((user: any, done) => {
     done(null, user.userId);
})

// 1 -> {id: 1, name: 'Julio'}. Deserialización, pasar de un identificador a un objeto
passport.deserializeUser(async (id, done) => {
     const user = await userRepository.findUserById(`${id}`);
     done(null, user);
})

export default passport;
