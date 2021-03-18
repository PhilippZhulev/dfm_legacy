import colors from './colors';

const LoginTemplate = {
  login: {
    template: {
      root: {
        backgroundColor: colors.colorsTheme.layer,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
      },
      form: {
        background: colors.colorsTheme.layer,
        width: 480,
        maxWidth: 480,
        height: 500,
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        boxShadow: '0px 16px 70px rgba(24, 60, 88, 0.1)',
        padding: '45px 80px',
      },
      logo: {
        marginTop: 35,
        marginBottom: 50,
        textAlign: 'center',
      },
    },
  },
};

export default LoginTemplate;
