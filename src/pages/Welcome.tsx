import {Center, Link, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../context/AuthContext';

const API_DOCS_HREF = 'http://localhost:3001/api/docs';

export function Welcome() {
  const {t} = useTranslation();
  const {user, logout} = useAuth();

  return (
    <Center height="100vh" width="100wv" padding="10">
      <VStack gap="10px" width="100%" maxWidth="600px">
        <Text fontSize="2xl" color="blue.900">
          {t('welcome.message')}
        </Text>
        {user && (
          <Text fontSize="text.base" color="text-secondary">
            {t('auth.loggedIn', {username: user.username})}
          </Text>
        )}
        <Link color="blue.400" href={API_DOCS_HREF} target="_blank">
          {t('welcome.link')}
        </Link>
        {user && (
          <Link as="button" type="button" color="fill-brand" onClick={logout}>
            {t('auth.logout')}
          </Link>
        )}
      </VStack>
    </Center>
  );
}
