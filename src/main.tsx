import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
// Add normalizetion
import 'modern-normalize'
import App from './components/App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as HTMLDivElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</StrictMode>,
)

