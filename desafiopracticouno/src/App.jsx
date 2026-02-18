
// App.jsx Componente raíz de la aplicación
// Importa y renderiza el componente principal ContactList
import ContactList from './components/ContactList';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <ContactList />
    </div>
  );
}

export default App;
