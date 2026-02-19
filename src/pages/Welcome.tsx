import { Center, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Button } from '../components'
import { spacing } from '../design-system/spacing'
import { useAuth } from '../context/AuthContext'


export function Welcome() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()

  return (
    <Center height="100vh" width="100wv" padding={spacing.card}>
      <VStack gap={spacing.stack} width="100%" maxWidth="600px">
        <Text fontSize="2xl" color="blue.900">
          {t('welcome.message')}
        </Text>
        {user && (
          <Text fontSize="text.base" color="text-secondary">
            {t('auth.loggedIn', { username: user.username })}
          </Text>
        )}
        {user && (
          <Button variant="ghost" type="button" onClick={logout}>
            {t('auth.logout')}
          </Button>
        )}
      </VStack>
    </Center>
  )
}
