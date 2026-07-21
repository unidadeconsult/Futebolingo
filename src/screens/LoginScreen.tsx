import { useState } from 'react';
import type { CEFRLevel, NativeLanguage } from '../types';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { TextInput, SelectInput } from '../components/Input';
import './LoginScreen.css';

const LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function LoginScreen() {
  const { login, loginAsGuest } = useApp();
  const [name, setName] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState<NativeLanguage>('pt');
  const [level, setLevel] = useState<CEFRLevel>('A2');
  const [entering, setEntering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEntering(true);
    setTimeout(() => login(name, nativeLanguage, level), 350);
  };

  const handleGuest = () => {
    setEntering(true);
    setTimeout(() => loginAsGuest(), 350);
  };

  return (
    <div className={`login-screen ${entering ? 'entering' : ''}`}>
      <div className="login-bg-particles" aria-hidden="true" />

      <div className="login-content">
        <div className="login-logo">⚽</div>
        <h1 className="login-title">Futbolingo</h1>
        <p className="login-tagline">Aprenda idiomas através da paixão pelo futebol</p>

        <form className="login-card" onSubmit={handleSubmit}>
          <TextInput
            label="Seu nome"
            placeholder="Como quer ser chamado?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <SelectInput
            label="Idioma nativo"
            value={nativeLanguage}
            onChange={(e) => setNativeLanguage(e.target.value as NativeLanguage)}
          >
            <option value="pt">🇧🇷 Português</option>
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Español</option>
          </SelectInput>

          <SelectInput
            label="Nível atual"
            value={level}
            onChange={(e) => setLevel(e.target.value as CEFRLevel)}
          >
            {LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </SelectInput>

          <Button type="submit" fullWidth>
            🚀 Entrar no Campo
          </Button>
          <Button type="button" variant="ghost" fullWidth onClick={handleGuest} className="login-guest-btn">
            👤 Continuar como visitante
          </Button>
        </form>
      </div>
    </div>
  );
}
