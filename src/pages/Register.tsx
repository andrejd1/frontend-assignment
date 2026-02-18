import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useState} from 'react';
import {Link} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';
import logoUrl from '../assets/logo.svg';
import {useAuth} from '../context/AuthContext';

export function Register() {
  const {t} = useTranslation();
  const {register: doRegister, authError, clearAuthError} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    if (!username.trim() || !password) return;
    setIsSubmitting(true);
    try {
      await doRegister({username: username.trim(), password});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="fill-gray"
      padding="6"
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        width="100%"
        maxWidth="400px"
        backgroundColor="fill-white"
        borderRadius="8px"
        padding="8"
        boxShadow="sm"
      >
        <VStack gap="6" align="stretch">
          <Box display="flex" justifyContent="center">
            <Image src={logoUrl} alt="Zentask" width="77px" height="67px" />
          </Box>
          <Heading size="lg" textAlign="center" color="text-primary" fontWeight="heading.2">
            {t('auth.register.title')}
          </Heading>

          {authError && (
            <Text color="text-danger" fontSize="text.small" role="alert">
              {authError}
            </Text>
          )}

          <Box>
            <label htmlFor="register-username" style={{display: 'block', fontSize: '14px', color: '#001141', marginBottom: 4}}>
              {t('auth.username')}
            </label>
            <Input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('auth.usernamePlaceholder')}
              autoComplete="username"
              backgroundColor="fill-white"
              borderColor="border-gray"
              _focus={{borderColor: 'border-brand', boxShadow: '0 0 0 1px var(--chakra-colors-border-brand)'}}
            />
          </Box>

          <Box>
            <label htmlFor="register-password" style={{display: 'block', fontSize: '14px', color: '#001141', marginBottom: 4}}>
              {t('auth.password')}
            </label>
            <Input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.passwordPlaceholder')}
              autoComplete="new-password"
              backgroundColor="fill-white"
              borderColor="border-gray"
              _focus={{borderColor: 'border-brand', boxShadow: '0 0 0 1px var(--chakra-colors-border-brand)'}}
            />
          </Box>

          <Button
            type="submit"
            disabled={isSubmitting}
            backgroundColor="fill-brand"
            color="text-white"
            borderRadius="100px"
            _hover={{backgroundColor: 'fill-brand-hover'}}
          >
            {isSubmitting ? t('auth.loading') : t('auth.register.submit')}
          </Button>

          <Text textAlign="center" fontSize="text.small" color="text-secondary">
            {t('auth.register.hasAccount')}{' '}
            <Link to="/login">
              <Box as="span" color="fill-brand" fontWeight="text.alternative" _hover={{textDecoration: 'underline'}}>
                {t('auth.login.link')}
              </Box>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
