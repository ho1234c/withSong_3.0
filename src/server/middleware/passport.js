const passport = require('koa-passport');
const LocalStrategy = require('passport-local');
// const FacebookStrategy = require('passport-facebook');
const db = require('../models');
// const { API } = require('../config');

function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const user = await db.User.findOne({
        where: { email },
        include: [
          { model: db.Album, as: 'albumFavor', attributes: ['id', 'name'] },
          { model: db.Comment, as: 'commentFavor', attributes: ['id'] }
        ]
      });
      if (!user) {
        return done(null, false, { message: '이메일을 찾을 수 없습니다' });
      }

      try {
        const isAuth = await user.authenticate(password);
        if (isAuth) {
          return done(null, user);
        }
        return done(null, false, { message: '비밀번호가 틀립니다' });
      } catch (err) {
        return done(err);
      }
    }
  ));
  // passport.use(new FacebookStrategy({
  //   clientID: API.FACEBOOK.CLIENT_ID,
  //   clientSecret: API.FACEBOOK.CLIENT_SECRET,
  //   callbackURL: '/user/login/facebook/callback',
  //   profileFields: ['email']
  // }, (accessToken, refreshToken, profile, done) => {
  //   const email = profile.emails[0].value;

  //   db.User.findOne({
  //     where: { email },
  //     include: [
  //       { model: db.Album, as: 'albumFavor', attributes: ['id', 'name'] },
  //       { model: db.Comment, as: 'commentFavor', attributes: ['id'] }
  //     ]
  //   })
  //     .then(user => {
  //       if(!user) {
  //         db.User.create({ email, nickname: email.split('@')[0] })
  //           .then(user => {
  //             done(null, user);
  //           });
  //       }else {
  //         done(null, user);
  //       }
  //     });
  // })
  // );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

module.exports = passportConfig;
