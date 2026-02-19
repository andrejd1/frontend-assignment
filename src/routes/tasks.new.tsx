import { createFileRoute, Navigate } from '@tanstack/react-router'
import { NewTask } from '../pages/NewTask'
import { useAuth } from '../context/AuthContext'

function NewTaskRouteComponent() {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return null
  if (!isAuthenticated) return <Navigate to="/login" />
  return <NewTask />
}

export const Route = createFileRoute('/tasks/new')({
  component: NewTaskRouteComponent,
})
