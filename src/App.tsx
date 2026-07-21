import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './screens/LoginScreen';
import { Dashboard } from './screens/Dashboard';

function AppShell() {
  const { user } = useApp();
  return user ? <Dashboard /> : <LoginScreen />;
}

function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
